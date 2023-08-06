# select base image
FROM node:18.17-alpine3.18

#Creatie working directory
WORKDIR /chatbot

# Copy dependencies in package.json
COPY public/ /chatbot/public
COPY src/ /chatbot/src
COPY package.json /chatbot/

# Install dependencies
RUN npm install

# RUN container on port 4000
CMD ["npm", "start"]
