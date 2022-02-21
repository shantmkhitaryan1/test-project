FROM node:16.13.1
LABEL version="1.0"
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 8000
CMD ["npm", "run", "dev"]