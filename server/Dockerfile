# version of node to use
FROM node:ubuntu as base
# define working directory for docker
WORKDIR /usr/src/app
# copy all our source code into the working directory
COPY . .
# install npm dependencies and pm2
RUN npm install && npm install -g pm2
# expose port 3000 for our server to run on
EXPOSE 3000
# command to start our server
CMD [ "pm2-runtime", "start", "./dist/api.bundle.js", "-i", "max" ]