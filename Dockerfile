# FROM node:14.17.1
# WORKDIR /app
# COPY package.json ./
# COPY package-lock.json ./
# RUN npm install --silent
# COPY . ./
# CMD ["npm", "start"]

FROM node
WORKDIR /app
COPY package.json .
RUN npm i
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev"]