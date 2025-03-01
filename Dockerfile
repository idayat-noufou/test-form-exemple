FROM node:20 AS build

ARG APP_HOME=/app

WORKDIR $APP_HOME

COPY package.json package-lock.json ./

RUN npm install -g npm@11.1.0
RUN npm install

COPY . .

EXPOSE 5173

LABEL maintainer="idayat.noufou@ynov.com" \
      version="1.0" \
      description="test-form-example"

CMD ["npm", "run", "dev"]