FROM nginx
COPY . /usr/share/nginx/html
ENV VIRTUAL_HOST=phoelid.me
ENV LETSENCRYPT_HOST=phoelid.me
