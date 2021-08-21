FROM node:alpine

EXPOSE 3000

ARG NEXT_PUBLIC_ENV
ENV NEXT_PUBLIC_ENV=${NEXT_PUBLIC_ENV}

WORKDIR /app/admin

COPY ./package*.json ./
RUN  npm install pm2 -g

RUN  npm ci

COPY ./ ./

RUN echo "Based on env: $NEXT_PUBLIC_ENV"

RUN npm run build:${NEXT_PUBLIC_ENV}

ENTRYPOINT pm2 list && NEXT_PUBLIC_ENV=${NEXT_PUBLIC_ENV} pm2-runtime start pm2.config.js