FROM node:alpine

EXPOSE 3000

ARG REACT_APP_ENV
ENV REACT_APP_ENV=${REACT_APP_ENV}

WORKDIR /app/admin

COPY ./package*.json ./
RUN  npm install pm2 -g

RUN  npm ci

COPY ./ ./

RUN echo "Based on env: $REACT_APP_ENV"

RUN npm run build:${REACT_APP_ENV}

ENTRYPOINT pm2 list && REACT_APP_ENV=${REACT_APP_ENV} pm2-runtime start pm2.config.js