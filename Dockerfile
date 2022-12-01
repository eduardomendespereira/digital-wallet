FROM node:18-alpine

ENV NODE_ENV development

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json .

RUN npm install --force
RUN npm install react-scripts@3.3.1 -g --silent

CMD ["npm", "start"]