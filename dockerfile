FROM node:16.14 AS builder

COPY . .

RUN npm install
RUN npm run build

FROM node:16.14-alpine

COPY --from=builder build/ build/
RUN npm install -g serve

ENTRYPOINT ["serve", "-s", "build", "-l", "80"]
