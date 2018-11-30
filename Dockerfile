FROM node:8
# Set the working directory to /app
WORKDIR /app

COPY package*.json ./

RUN npm install

# Copy the current directory contents into the container at /app
COPY . .

EXPOSE 8001

CMD [ "node", "server/index.js" ]
