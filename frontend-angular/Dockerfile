# Use Node image
FROM node:18-alpine

WORKDIR /app

# Copy package files and install deps
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Run ng serve, exposing it to the outside (0.0.0.0)
CMD ["npx", "ng", "serve", "--host", "0.0.0.0", "--disable-host-check"]