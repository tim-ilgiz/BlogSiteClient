#Latest Node
FROM node

RUN mkdir /app  
WORKDIR /app
COPY package.json .
RUN npm install
RUN npm install -g @angular/cli@latest
COPY . . 
EXPOSE 4200
CMD ["npm", "start"]