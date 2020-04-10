FROM node:10

ENV NODE_CONFIG_ENV=docker NUXT_HOST=0.0.0.0 NUXT_PORT=3000

ARG COMMIT
ENV LAST_COMMIT=${COMMIT}

WORKDIR /var/www

COPY . .

RUN yarn install \
  && yarn build:prismic && yarn build:ct

COPY dev/docker/vue-storefront.sh /usr/local/bin/

EXPOSE 3000

ENTRYPOINT ["vue-storefront.sh"]
