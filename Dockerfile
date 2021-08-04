FROM node:14-alpine

# tzdata for timzone and net-tools
RUN apk update 
RUN apk add tzdata
RUN apk add net-tools

ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production 
COPY . .
EXPOSE 3001
CMD ["npm", "start"]
