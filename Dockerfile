# ==========================================
FROM registry.access.redhat.com/ubi8/nodejs-16 AS deployable
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

# Set environmental variables
ARG REACT_APP_AUTHENTICATED
ARG REACT_APP_API_URL
ARG REACT_APP_OPENID_CLIENT_ID
ARG REACT_APP_SSO_URL
ARG REACT_APP_OPEN_ID_API_TOKENS_SCOPE
ARG REACT_APP_GEOCODER_API_URL
ARG REACT_APP_MATOMO_URL_BASE
ARG REACT_APP_MATOMO_SITE_ID
ARG REACT_APP_MATOMO_ENABLED
ARG REACT_APP_SENTRY_ENVIRONMENT
ARG REACT_APP_SENTRY_DSN

RUN yarn cache clean --force
RUN yarn
RUN yarn build

# Build application

# =============================
FROM nginx:1.17 as production
# =============================

# Nginx runs with user "nginx" by default
COPY --from=deployable --chown=nginx:nginx /app/build /usr/share/nginx/html

COPY .prod/nginx.conf /etc/nginx/conf.d/default.conf

# Permissions needed for nginx to initialize the cache dirs & write
# out the pid file when running under arbitrary uid and group 0.
# Nginx wants to initialize the cache dirs even if cache is not used
RUN chgrp -Rv 0 /var/cache/nginx && chmod -Rv g+w /var/cache/nginx && chmod -v g+w /var/run

EXPOSE 3000:8080
