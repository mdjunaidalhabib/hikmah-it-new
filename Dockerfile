# ---- Build frontend ----
FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# ---- Runtime (Express serves API + dist) ----
FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY server/package.json server/package-lock.json ./server/
RUN npm ci --omit=dev --prefix server
COPY server/src ./server/src
COPY --from=build /app/dist ./dist
RUN mkdir -p server/uploads
ENV PORT=5000
EXPOSE 5000
CMD ["node", "server/src/server.js"]
