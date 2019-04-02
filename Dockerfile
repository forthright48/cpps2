FROM coffeemate/nodejs

RUN mkdir /app
COPY . /app/
WORKDIR /app

RUN yarn install
RUN cd server/node_modules/ojscraper && yarn install
RUN cd client && yarn install && npm run build
RUN touch .env
RUN cp server/secret.js.example server/secret.js
