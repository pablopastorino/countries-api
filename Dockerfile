FROM node:18-alpine

WORKDIR /app

ENV DATABASE_URL=file:./dev.db

COPY package*.json ./

COPY prisma ./prisma/

RUN npm install

COPY . .

RUN npx prisma migrate deploy

EXPOSE 3000

CMD ["npm", "run", "start"]
