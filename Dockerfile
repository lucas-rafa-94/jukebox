FROM node:11.6.0-alpine AS builder
COPY . ./jukebox
WORKDIR /jukebox
RUN npm i
RUN $(npm bin)/ng build --prod

FROM nginx:1.15.8-alpine
COPY --from=builder /jukebox/dist/jukebox /usr/share/nginx/html
