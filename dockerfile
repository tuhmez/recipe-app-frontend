FROM node:erbium AS builder

COPY . .

RUN npm install
RUN npm run build

FROM node:erbium-alpine

COPY --from=builder build/ build/
RUN npm install -g serve

ENTRYPOINT ["serve", "-s", "build", "-l", "3000"]
