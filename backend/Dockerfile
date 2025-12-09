# BASE IMAGE
FROM node:18-alpine

# SET WORKDIR
WORKDIR /usr/src/app

# COPY package.json & package-lock.json
COPY package*.json ./

# INSTALL DEPENDENCIES
RUN npm install

# COPY SOURCE CODE BACKEND
COPY . .

# EXPOSE PORT BACKEND 
EXPOSE 4000

# START THE SERVER
CMD ["npm", "start"]
