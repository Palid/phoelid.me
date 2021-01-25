FROM node:15.6.0-alpine as builder

# install and cache app dependencies
WORKDIR /app
COPY ./src/ /app/src/
COPY ./package.json /app/package.json
COPY ./package-lock.json /app/package-lock.json
RUN npm install
RUN npm run ci:build


# ------------------------------------------------------
# Production Build
# ------------------------------------------------------
FROM nginx
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html
ENV VIRTUAL_HOST=phoelid.me
ENV LETSENCRYPT_HOST=phoelid.me
