FROM node:alpine
RUN apk add ffmpeg

WORKDIR /usr/src/app

COPY backend/package.json ./
RUN npm install

COPY . .
EXPOSE 3000

RUN npm run build

CMD [ "npm", "run", "start:prod" ]