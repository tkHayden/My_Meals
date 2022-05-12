FROM node:16

ENV POSTGRES_DB=dev \
    POSTGRES_USER=remotegang\
    POSTGRES_PASSWORD=cse115

RUN mkdir -p /home/backend

COPY ./backend /home/backend

WORKDIR /home/backend

RUN npm install

EXPOSE 3010

CMD ["npm", "start"]

