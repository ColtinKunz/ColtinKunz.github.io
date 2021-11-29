# visimo/coeus-proxy:latest
FROM nginxinc/nginx-unprivileged:1.20.1

ENV USE_SSL "enabled"

# copy in configuration
COPY nginx.conf  /etc/nginx/nginx.conf
COPY templates   /etc/nginx/templates
