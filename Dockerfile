FROM coffeemate/nodejs

RUN mkdir /app
COPY . /app/

WORKDIR /app
RUN yarn install
RUN touch .env
RUN cp server/secret.js.example server/secret.js
