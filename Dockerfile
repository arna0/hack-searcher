FROM node:22-alpine
WORKDIR /app
COPY package.json ./
RUN npm install --no-audit --no-fund
COPY . .
RUN npm run build
ENV DB_FILE=/data/hack-searcher.db
VOLUME /data
EXPOSE 8080
CMD ["npm", "start"]
