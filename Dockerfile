FROM coffeemate/nodejs

RUN mkdir /app
COPY . /app/

WORKDIR /app
RUN yarn install
