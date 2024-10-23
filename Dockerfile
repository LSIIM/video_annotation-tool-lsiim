# Etapa 1: Build do projeto
FROM node:18-alpine as build-stage

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

ARG VITE_API
ARG VITE_VIDEOS_BASE_PATH

RUN npm run build

# Etapa 2: Servir a aplicação
FROM nginx:stable-alpine as production-stage

COPY --from=build-stage /app/dist /usr/share/nginx/html

EXPOSE 5713

CMD ["nginx", "-g", "daemon off;"]
