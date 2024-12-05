FROM node:22.12.0-alpine

WORKDIR /app

COPY ./package.json .

RUN npm install

COPY . .

RUN npm run build

EXPOSE 5173

CMD ["npm", "run", "preview"]