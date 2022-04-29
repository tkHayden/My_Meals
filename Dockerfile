FROM node:16

ENV MONGO_DB_USERNAME=admin \
    MONGO_DB_PWD=password

RUN mkdir -p /home/backend

COPY ./backend /home/backend

WORKDIR /home/backend

RUN npm install

EXPOSE 3010

CMD ["npm", "start"]

