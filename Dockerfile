FROM alpine:latest

RUN apk add --update nodejs npm

WORKDIR /app/cms-fe

COPY package.json package.json
RUN npm install
COPY . .

EXPOSE  3000
CMD ["npm", "start"]