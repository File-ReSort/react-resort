# syntax=docker/dockerfile:1
FROM node:16-alpine as builder
WORKDIR '/app'
COPY package.json .
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build

FROM nginx
COPY --from=builder /app/build /usr/share/nginx/html