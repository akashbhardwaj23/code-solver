FROM node:alpine

WORKDIR /

COPY ./backend ./backend
COPY ./client ./client
COPY ./websocket-server ./websocket-server
COPY ./worker ./worker


RUN command