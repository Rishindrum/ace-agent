# Stage 1: Build the Angular app
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ARG API_URL=https://backend-go-31441781562.us-central1.run.app
ARG WS_URL=wss://backend-go-31441781562.us-central1.run.app
RUN sed -i "s#apiUrl: '[^']*'#apiUrl: '${API_URL}'#" src/environments/environment.prod.ts \
    && sed -i "s#wsUrl: '[^']*'#wsUrl: '${WS_URL}'#" src/environments/environment.prod.ts
RUN npx ng build --configuration production

# Stage 2: Serve with Nginx
FROM nginx:alpine
# Copy the built files to Nginx's public folder
COPY --from=build /app/dist/frontend-angular/browser /usr/share/nginx/html
# Copy a custom Nginx config for Angular routing
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
