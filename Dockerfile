FROM node:latest

WORKDIR verifier

RUN npm install -g yarn

COPY package.json package.json
COPY yarn.lock yarn.lock

RUN yarn install

COPY . .

RUN npm install -g
