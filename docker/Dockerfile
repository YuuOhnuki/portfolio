FROM node:lts-alpine3.22

WORKDIR /var/www/html

# まず、package.json と package-lock.json (または yarn.lock) をコピー
COPY ./app/package*.json ./

# 依存関係をインストール
RUN npm install

# 残りのアプリケーションコードをコピー
COPY ./app .