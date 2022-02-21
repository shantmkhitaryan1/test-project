FROM node:16.13.1
LABEL version="1.0"
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
RUN chmod 755 /app
EXPOSE 3000
CMD ["npm", "start"]