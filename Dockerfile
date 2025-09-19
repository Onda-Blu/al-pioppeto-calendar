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

# Expose port
EXPOSE 4000

# Start the service
CMD ["npm", "run", "start"]
