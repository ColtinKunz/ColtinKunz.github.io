# Specify build stage
FROM node:16.3.0-slim as builder

# build dependencies
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm ci --production --silent

# copy over application source
COPY . .

# build application
RUN npm run build:production


# Specify app stage
FROM nginxinc/nginx-unprivileged:1.20.1 as app

# copy over user configuration
#COPY .bashrc /home/worker
# copy over application
COPY --from=builder /app/build /usr/share/nginx/html
# copy over server configuration
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
