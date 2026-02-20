# ==========================================
FROM registry.access.redhat.com/ubi9/nodejs-22 AS appbase
# ==========================================

WORKDIR /app

USER root
RUN curl --fail --silent --proto '=https' --tlsv1.2 https://dl.yarnpkg.com/rpm/yarn.repo \
    --output /etc/yum.repos.d/yarn.repo
RUN yum -y install yarn

# Offical image has npm log verbosity as info. More info - https://github.com/nodejs/docker-node#verbosity
ENV NPM_CONFIG_LOGLEVEL warn

# set our node environment, either development or production
# defaults to production, compose overrides this to development on build and run
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

# Yarn
ENV YARN_VERSION 1.19.1
RUN yarn policies set-version $YARN_VERSION

# Copy only necessary files for build
COPY package.json yarn.lock /app/
COPY tsconfig.json vite.config.mts eslint.config.mjs /app/
COPY index.html /app/
COPY public/ /app/public/
COPY src/ /app/src/
COPY .prod/ /app/.prod/
RUN chown -R default:root /app

# Install npm dependencies and build the bundle
USER default

RUN yarn install --frozen-lockfile --ignore-scripts
RUN yarn cache clean --force

# ==========================================
FROM appbase AS development
# ==========================================

WORKDIR /app

# Set NODE_ENV to development in the development container
ARG NODE_ENV=development
ENV NODE_ENV $NODE_ENV

ENV PORT 8080

CMD yarn start --port ${PORT}

EXPOSE 8080

# ==========================================
FROM appbase AS staticbuilder
# ==========================================

# Set environmental variables
ARG REACT_APP_API_URL
ARG REACT_APP_OIDC_AUTHORITY
ARG REACT_APP_OIDC_API_TOKENS_URL
ARG REACT_APP_OIDC_CLIENT_ID
ARG REACT_APP_OIDC_API_SCOPE
ARG REACT_APP_GEOCODER_API_URL
ARG REACT_APP_MATOMO_URL_BASE
ARG REACT_APP_MATOMO_SITE_ID
ARG REACT_APP_MATOMO_ENABLED
ARG REACT_APP_SENTRY_ENVIRONMENT
ARG REACT_APP_SENTRY_DSN
ARG REACT_APP_SENTRY_RELEASE

ENV REACT_APP_RELEASE=${REACT_APP_SENTRY_RELEASE:-""}

RUN yarn build

# Process nginx configuration with APP_VERSION substitution
COPY .prod/nginx.conf /app/nginx.conf.template
RUN export APP_VERSION=$(yarn --silent app:version | tr -d '\n') && \
    envsubst '${APP_VERSION},${REACT_APP_RELEASE}' < /app/nginx.conf.template > /app/nginx.conf

# =============================
FROM registry.access.redhat.com/ubi9/nginx-120 AS production
# =============================

USER root

RUN chgrp -R 0 /usr/share/nginx/html && \
    chmod -R g=u /usr/share/nginx/html

# Copy static build
COPY --from=staticbuilder /app/build /usr/share/nginx/html

# Copy nginx config
COPY --from=staticbuilder /app/nginx.conf /etc/nginx/nginx.conf

USER 1001

CMD ["/bin/bash", "-c", "nginx -g \"daemon off;\""]

EXPOSE 8080

