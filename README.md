Nodejs Microservice

This microservice consist of login, patch, and image download routes

#Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 

#Prerequisites

Node -v 8 or higher

#Installing

run npm install (installs all dependencies)

#Test
run npm test

>Testing POST user/login
.email and password is required & email must be valid
example:
{
    "email": "yourname@email.com",
    "passowrd": yourpassword"
}

login returns a token, copy it to test other routes

>Testing PATCH user/patch
set header ('x-auth', token return from login)
provide "age" and "sex" values
example:
{
    "age": "24",
    "sex": "male"
}

>Testing POST user/me/image
set header ('x-auth', token return from login)
provide an image url
example:
{
    "url": "https://sitename/folder/image.jpg"
}
