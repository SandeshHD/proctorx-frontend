FROM node:alpine

WORKDIR /app

COPY . .

RUN npm install -g @angular/cli

EXPOSE 4200

RUN npm install

CMD [ "ng", "serve","super-admin", "--host","0.0.0.0" ]
