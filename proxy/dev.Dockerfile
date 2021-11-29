# visimo/coeus-proxy:latest
FROM nginx:1.21.0

ENV USE_SSL "disabled"

# copy in configuration
COPY nginx.conf  /etc/nginx/nginx.conf
COPY templates   /etc/nginx/templates
