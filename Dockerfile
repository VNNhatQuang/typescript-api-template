FROM node:20
WORKDIR /typescript_api_template
COPY package*.json ./
RUN npm i
RUN npm i -g typescript
COPY . .
RUN npm run build
EXPOSE ${PORT}
# CMD ["npm", "start"]
CMD ["npm", "run", "dev"]
