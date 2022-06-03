FROM node:16

RUN mkdir -p /home/backend

COPY ./backend /home/backend

WORKDIR /home/backend

RUN npm install

EXPOSE 3010

CMD ["npm", "run", "dev"]

