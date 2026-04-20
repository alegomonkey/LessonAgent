FROM node:22-slim AS builder
WORKDIR /build
COPY package.json package-lock.json ./
RUN npm ci
COPY tsconfig.json ./
COPY src ./src
RUN npm run build

FROM node:22-slim
WORKDIR /home/node/app

COPY --chown=node:node package.json package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force

COPY --from=builder --chown=node:node /build/dist ./dist
COPY --chown=node:node public ./public
COPY --chown=node:node CLAUDE.md ./CLAUDE.md
COPY --chown=node:node .claude-plugin ./.claude-plugin
COPY --chown=node:node skills ./skills
COPY --chown=node:node agents ./agents
COPY --chown=node:node commands ./commands
COPY --chown=node:node data ./data
COPY --chown=node:node examples ./examples

USER node
ENV PORT=7860
ENV NODE_ENV=production
EXPOSE 7860
CMD ["node", "dist/server.js"]
