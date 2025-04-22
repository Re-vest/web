# Etapa 1: Build do projeto
FROM node:20 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Define variável de ambiente para o build do Vite
ARG VITE_BACK_END
ENV VITE_BACK_END=$VITE_BACK_END

RUN npm run build

# Etapa 2: Servir com Nginx
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]