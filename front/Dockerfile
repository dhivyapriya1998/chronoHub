FROM node:18-buster-slim

WORKDIR /app/front

# Install dependencies first to allow Docker caching
COPY package*.json ./

RUN npm install

# Copy rest of the source code
COPY . .

EXPOSE 3000

CMD ["npx", "webpack", "serve", "--config", "webpack.config.js"]
