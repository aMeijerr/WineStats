FROM node:16-alpine

# Set the working directory to /app
WORKDIR /Wine-stats

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the Angular app
RUN npm run build

# Expose port 80 to allow external access
EXPOSE 80

# Start the web server
CMD [ "npm", "run", "start" ]