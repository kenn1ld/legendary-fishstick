# Use an official Node runtime as the base image
FROM node:14

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json into the directory
COPY package*.json ./

# Install the app dependencies
RUN npm install


# Add this line to install bcrypt explicitly
RUN npm install bcrypt
# If you are using `bcrypt` or any other package that uses native code, 
# install node-gyp and python to compile it.
# RUN apk add --no-cache make gcc g++ python && \
# npm rebuild bcrypt --build-from-source && \
# apk del make gcc g++ python

# Bundle the app source inside the Docker image
COPY . .

# Make port (your backend port) available outside the container
EXPOSE 5000

# Start the app
CMD [ "npm", "start" ]
