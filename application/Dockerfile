FROM node:10.16-alpine

WORKDIR /project
COPY /dist                  /project/application
COPY node_modules           /project/node_modules

EXPOSE 3000
ENTRYPOINT ["node", "/project/application/main.js"]
