# To use this Dockerfile, you have to set `output: 'standalone'` in your next.config.js file.
# From https://github.com/vercel/next.js/blob/canary/examples/with-docker/Dockerfile

FROM node:22.17.0-alpine AS base

# Set registry BEFORE enabling corepack so it doesn't hit npmjs.org
ENV NPM_CONFIG_REGISTRY=https://registry.npmmirror.com
ENV COREPACK_NPM_REGISTRY=https://registry.npmmirror.com

RUN npm install -g pnpm && \
    pnpm config set registry https://registry.npmmirror.com

# ─────────────────────────────────────────────
# Install dependencies only when needed
# ─────────────────────────────────────────────
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# ─────────────────────────────────────────────
# Development stage
# ─────────────────────────────────────────────
FROM base AS dev
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=development
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
EXPOSE 3000

CMD ["pnpm", "dev"]

# ─────────────────────────────────────────────
# Build stage
# ─────────────────────────────────────────────
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# ENV NEXT_TELEMETRY_DISABLED=1

RUN pnpm run build

# ─────────────────────────────────────────────
# Production image
# ─────────────────────────────────────────────
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
# ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

RUN mkdir .next && chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000

CMD HOSTNAME="0.0.0.0" node server.js