# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . .

# Install any needed packages specified in package.json
RUN npm install

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Define environment variable
ENV PORT=3000

# Run npm start when the container launches
CMD ["npm", "start"]

# Metadata as key/value LABEL pair
LABEL authors="janihegedus"
