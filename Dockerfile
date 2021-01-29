FROM node:12-alpine as builder

WORKDIR /app

COPY /package*.json ./

RUN npm ci

COPY . ./

RUN npm run build

FROM nginx:1.19-alpine

ENV NODE_ENV production

WORKDIR /app

RUN rm /etc/nginx/conf.d/default.conf

COPY /nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build/ /usr/share/nginx/html/

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]
