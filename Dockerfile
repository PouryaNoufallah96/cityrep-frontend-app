# --- Stage 1: Build the app ---
FROM node:20-alpine AS builder
WORKDIR /app

# Copy dependencies first
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile || yarn install

# Copy full project
COPY . .

# Set env and build
ENV NODE_ENV=production
RUN echo "🚀 Building project..." && yarn build && \
    echo "✅ Build complete. Contents:" && ls -R build || true

# --- Stage 2: Serve via Nginx ---
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# Clean default nginx HTML
RUN rm -rf ./*

# Copy the contents of build/client (⚠️ trailing slash is important)
COPY --from=builder /app/build/client/ ./

# Sanity check: ensure index.html exists
RUN test -f index.html || (echo "❌ Build failed: /app/build/client/index.html not found" && exit 1)

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3014
CMD ["nginx", "-g", "daemon off;"]
