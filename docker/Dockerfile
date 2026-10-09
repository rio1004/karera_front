FROM node:22-alpine3.22 AS builder

WORKDIR /app
COPY package*.json .
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80

HEALTHCHECK --interval=5s --timeout=5s --retries=3 CMD wget --spider -q http://0.0.0.0 || exit 1
