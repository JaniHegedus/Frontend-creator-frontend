FROM ubuntu:latest
FROM node:16
WORKDIR /app

COPY . .

RUN npm install

LABEL authors="heged"

ENTRYPOINT ["top", "-b"]

ENV PORT = 3000
EXPOSE 3000

CMD ["npm","start"]
