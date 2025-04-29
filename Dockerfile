# ==========================================
FROM registry.access.redhat.com/ubi9/nodejs-22 AS appbase
# ==========================================

WORKDIR /app

USER root
RUN curl --silent --location https://dl.yarnpkg.com/rpm/yarn.repo | tee /etc/yum.repos.d/yarn.repo
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

# Most files from source tree are needed at runtime
COPY . /app/
RUN chown -R default:root /app

# Install npm dependencies and build the bundle
USER default

RUN yarn
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

RUN yarn build

# =============================
FROM registry.access.redhat.com/ubi9/nginx-120 AS production
# =============================

USER root

RUN chgrp -R 0 /usr/share/nginx/html && \
    chmod -R g=u /usr/share/nginx/html

# Copy static build
COPY --from=staticbuilder /app/build /usr/share/nginx/html

# Copy nginx config
COPY .prod/nginx.conf /etc/nginx/nginx.conf

USER 1001

CMD ["/bin/bash", "-c", "nginx -g \"daemon off;\""]

EXPOSE 8080

