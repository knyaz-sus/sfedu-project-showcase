FROM node:22.12.0-alpine

ARG VITE_API_URL

WORKDIR /app

COPY ./package.json  .
COPY ./package-lock.json .

RUN npm install

COPY . .

RUN npm run build

EXPOSE 5173

CMD [ "npm", "run", "preview" ]