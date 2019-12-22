#Latest Node
FROM node

#Creating working folder
RUN mkdir /app  
WORKDIR /app
COPY package.json .
RUN npm install
RUN npm install -g @angular/cli@latest
COPY . . 
EXPOSE 80
CMD ["npm", "start"]