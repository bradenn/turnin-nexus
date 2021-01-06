FROM node:alpine

WORKDIR /turnin-nexus
COPY package.json ./
COPY tsconfig.json ./

COPY src /turnin-nexus/src

RUN yarn install
RUN yarn run build

CMD [ "node", "./dist/main.js" ]
