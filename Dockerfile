FROM node:22.12.0-alpine

WORKDIR /app

COPY ./package.json  .
COPY ./package-lock.json .

RUN npm install

COPY . .

RUN npm run build

ENV VITE_API_URL=https://showcase-2-0.onrender.com

EXPOSE 5173

CMD ["npm", "run", "preview"]