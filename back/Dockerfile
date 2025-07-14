FROM node:18-buster-slim
WORKDIR /app
COPY package*.json /app
RUN npm install

COPY . .

EXPOSE 3001

CMD ["node", "server.js"]
