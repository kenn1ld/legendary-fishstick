# Use an official Node runtime as the base image
FROM node:14

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json into the directory
COPY package*.json ./

# Install the app dependencies
RUN npm install

# Bundle the app source inside the Docker image
COPY . .

# Make port 3000 available outside the container
EXPOSE 3000

# Start the app
CMD [ "npm", "start" ]
