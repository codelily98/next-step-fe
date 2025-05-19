# 1단계: 빌드 단계
FROM node:18-alpine AS build
WORKDIR /app
COPY . .
RUN npm install && npm run build

# 2단계: Nginx 정적 파일 서빙
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
