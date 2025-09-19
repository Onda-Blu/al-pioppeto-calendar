# Use official Node.js LTS image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json* ./
RUN npm install --production

# Copy source code
COPY src ./src
COPY tsconfig.json ./
COPY .gitignore ./

# Copy credentials if present (for local dev, not recommended for production)
COPY google-service-account.json ./

# Expose port
EXPOSE 4000

# Start the service
CMD ["npm", "run", "start"]
