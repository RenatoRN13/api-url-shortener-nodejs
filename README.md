URL Shortener API

TECHNOLOGIES
- Typescript
- NodeJS
- Express
- Banco PostgreSQL
- Knex
- Swagger
- Docker
 
This API aims to convert long URLs to short URLs using a key which has a range of 5 to 10 characters This key has 15 days of validation from the moment its register. All information (id, short_url, long_url, validation_date) are registered. When a key (short_url) is active and it's solicited, the browser redirects the user to another website registered (long_url).
 
DATABASE

It was used postgreSQL 13. To configure the application with the database, it was used Knex. The table creation script could be found in the file: "src/database/script/create_table.sql".
 
HOW EXECUTES
To facilitate the application execution, I created a script in package.json. This script to allow run the app using the command as following:
 
- npm run start

DOCKER

Execute the follow commands:

- build --tag < tag-name > .
- run --publish 3000:8081 < tag-name >

Now use port 3000 to make requests.

 
HOW WORKS

POST
To register new sites through a POST, the user should make a request to 'localhost:8081/encurtador' and to set the URL in the request body. Example:
{
            	url: 'wisereducacao.com'
}
 
There are two possible results to this request. The first return is a "short url" with request status 200. The second return is the message "URL already registered" with request status 400. The last case happens because the url passed in the request body already registered in a before request.
 
Status 200
{ 'localhost:8081/kas783bds2' }
Status 400
{ 'URL already registered' }
 
GET

The user can access the complete url through the registered key ('localhost:8081/kas783bds2') when making a GET request. After to process the request, the browser will redirect the user to the associated site. In this case the choose key is not registered, the api returns NOT FOUND error (status 404).


