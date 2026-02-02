# STAGE 1: Build the Angular App
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency definitions
COPY package*.json ./

# Install dependencies (npm ci is faster/cleaner than npm install)
RUN npm ci

# Copy the source code
COPY . .

# Build the app for production
RUN npx ng build --configuration production

# STAGE 2: Serve with Nginx
FROM nginx:alpine

# Remove default Nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy the Nginx config we created
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built Angular files from Stage 1
# Note: Check your "dist" folder name if this fails. Standard is 'dist/your-project-name/browser'
COPY --from=builder /app/dist/*/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]