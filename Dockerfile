FROM node:16-alpine As build

WORKDIR /usr/src/app

COPY . .

RUN npm i

# Run the build command which creates the production bundle
RUN npm run build

# Set NODE_ENV environment variable
ENV NODE_ENV production

FROM nginx:alpine

COPY /nginx.conf /etc/nginx/conf.d/web.template
COPY --from=build /usr/src/app/dist/wine-data /usr/share/nginx/html

EXPOSE 8080
CMD sh -c "envsubst '\$PORT' < /etc/nginx/conf.d/web.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"

# FROM node:16-alpine AS build
# WORKDIR /usr/src/app
# COPY . .
# RUN npm install
# RUN npm run build
# ENV NODE_ENV production

# FROM nginx:alpine
# COPY /nginx.conf /etc/nginx/conf.d/default.conf.template
# COPY --from=build /usr/src/app/dist /usr/share/nginx/html
# EXPOSE 8080
# CMD ["sh", "-c", "envsubst < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf && exec nginx -g 'daemon off;'"]