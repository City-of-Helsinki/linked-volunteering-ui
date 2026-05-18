# ============================================================
# STAGE 1: Build the Static Assets
# ============================================================
FROM helsinki.azurecr.io/ubi9/nodejs-22-pnpm-builder-base AS appbase

# 1. Copy only necessary files for build
COPY --chown=default:root package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY --chown=default:root tsconfig.json vite.config.mts eslint.config.mjs ./
COPY --chown=default:root index.html ./
COPY --chown=default:root public/ ./public
COPY --chown=default:root src/ ./src/

# 2. Install dependencies and build the bundle
RUN pnpm install --frozen-lockfile --ignore-scripts && pnpm store prune

# ============================================================
# STAGE 2: Development
# ============================================================
FROM appbase AS development
# ==========================================

WORKDIR /app

# Set NODE_ENV to development in the development container
ARG NODE_ENV=development
ENV NODE_ENV $NODE_ENV

EXPOSE 8080

CMD pnpm exec vite --port 8080

# ============================================================
# STAGE 3: Static builder for production
# ============================================================
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
ARG REACT_APP_SENTRY_TRACE_PROPAGATION_TARGETS
ARG REACT_APP_SENTRY_TRACES_SAMPLE_RATE
ARG REACT_APP_SENTRY_REPLAYS_SESSION_SAMPLE_RATE
ARG REACT_APP_SENTRY_REPLAYS_ON_ERROR_SAMPLE_RATE
ARG REACT_APP_SENTRY_RELEASE

RUN pnpm build

# ============================================================
# STAGE 4: Production Runtime
# ============================================================
FROM helsinki.azurecr.io/ubi9/nginx-126-spa-standard AS production

ARG REACT_APP_SENTRY_RELEASE
ENV APP_RELEASE=${REACT_APP_SENTRY_RELEASE:-""}
# 1. Copy the compiled assets
COPY --from=staticbuilder /app/build /usr/share/nginx/html

# 2. Setup Runtime Env Injection
# env.sh is provided by the base image
WORKDIR /usr/share/nginx/html

# 3. Inject Versioning for the /readiness endpoint from package.json using base image
COPY package.json .

# - env.sh      (Inherited from base image at /usr/share/nginx/html/env.sh)
# - USER 1001   (Inherited from base image)
# - EXPOSE 8080 (Inherited from base image)
# - ENTRYPOINT/CMD (Inherited from base image)
