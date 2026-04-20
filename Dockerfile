FROM node:22-slim AS builder
WORKDIR /build
COPY package.json package-lock.json ./
RUN npm ci
COPY tsconfig.json ./
COPY src ./src
RUN npm run build

FROM node:22-slim
RUN useradd --create-home --uid 1000 user
WORKDIR /home/user/app

COPY --chown=user package.json package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force

COPY --from=builder --chown=user /build/dist ./dist
COPY --chown=user public ./public
COPY --chown=user CLAUDE.md ./CLAUDE.md
COPY --chown=user .claude-plugin ./.claude-plugin
COPY --chown=user skills ./skills
COPY --chown=user agents ./agents
COPY --chown=user commands ./commands
COPY --chown=user data ./data
COPY --chown=user examples ./examples

USER user
ENV PORT=7860
ENV NODE_ENV=production
EXPOSE 7860
CMD ["node", "dist/server.js"]
