# Use the official Node image as the build stage
FROM node:18 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy dependency files and install dependencies
RUN npm install

# Copy all project files into the container
COPY . .

# Expose port 5174 to the host
EXPOSE 5174

CMD ["npm", "run", "dev", "--", "--host"]