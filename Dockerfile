FROM nginx:alpine

ENV TZ=Asia/Kolkata

RUN apk add --update tzdata && cp /usr/share/zoneinfo/Asia/Kolkata /etc/localtime

COPY dist /usr/share/nginx/html

EXPOSE 80
