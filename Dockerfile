# FROM ubuntu:trusty
FROM node:alpine
FROM ubuntu
FROM php


RUN apt-get update && apt-get upgrade -y
RUN apt-get install -y nodejs npm libmcrypt-dev openssl zip git libonig-dev
# RUN rm -rf /var/lib/apt/lists/*

RUN docker-php-ext-install pdo pdo_mysql
# RUN pecl install mcrypt-1.0.5
# RUN docker-php-ext-enable mcrypt
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

WORKDIR /app
COPY . /app
RUN composer install

RUN npm i

# RUN npm run build

EXPOSE 8000
CMD php artisan migrate ; php artisan serve --host=0.0.0.0 --port=8000