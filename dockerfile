FROM node:16.14 AS builder

COPY . .

RUN npm install
RUN npm run build

FROM node:16.14-slim

COPY --from=builder build/ build/
RUN npm install -g serve

ENTRYPOINT ["serve", "-s", "build", "--ssl-cert", "./build/file.crt", "--ssl-key", "./build/file.pem", "-l", "443"]
