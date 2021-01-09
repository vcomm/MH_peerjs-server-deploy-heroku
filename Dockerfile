FROM node:alpine

# создание директории приложения
WORKDIR /usr/src/app

# установка зависимостей
# символ астериск ("*") используется для того чтобы по возможности 
# скопировать оба файла: package.json и package-lock.json
COPY package*.json ./

RUN yarn install
# Если вы создаете сборку для продакшн
# RUN npm ci --only=production

# копируем исходный код
COPY . .

# Compile frontend
RUN echo compile frontend
RUN yarn build
RUN rm -r ./public
RUN rm -r ./src

CMD [ "node", "server.js"]