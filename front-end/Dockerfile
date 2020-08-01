# pull official base image
FROM node:13.12.0-alpine as build

#ENV PATH /front-end/node_modules/.bin:$PATH
#RUN ls -la
WORKDIR /front-end
COPY package.json ./

#COPY package-lock.json ./
#RUN npm ci --silent
RUN npm install

#RUN rm -rf /front-end/node_modules/webpack
#RUN npm install react-scripts@3.4.1 -g --silent
COPY . ./
RUN npm run build

# production environment
FROM nginx:stable-alpine
COPY --from=build /front-end/build /usr/share/nginx/html
# new
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]