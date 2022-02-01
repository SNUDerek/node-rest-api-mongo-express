# REST API example with mongodb, node and express

basic node REST API with express with mongodb

## features and todo

- example CRUD REST API (book catalog) with mongodb storage
- example authentication REST API with json webtokens and salted, hashed passwords & expiring tokens


## requirements

- `npm` + `node`
- `docker` and (optionally) `docker-compose` for running `mongoDB`
- (optional) `python` + `jupyter` for testing the api, else use Postman or VS Code "REST Client" extension

## start

```
# start mongodb
docker-compose up -d

# install necessary packages
npm install

# run with nodemon
npm start
```

you will need a `.env` file like below for testing:

```
DB_URL=mongodb://localhost:27017/<db_name>
TOKEN_SECRET=<some random string>
API_PORT=<port_to_run_on>
```

## usage

see the included `test-xxx.ipynb` in `/tests` for testing with python notebook, or see the `test.rest` file for testing with VS Code extension.

## user endpoints

### POST /api/user/register

post new user

**Request:**

```
{
    name: string, required
    username: string, required
    email: string, required
    password: string, required
}
```

### POST /api/user/login

post 

**Request:**

```
{
    username: string, required
    password: string, required
}
```

## books endpoints

### GET /json

hello world test

### GET /books

return list of all books in the db

### POST /books

post book to db

**Request:**

```
{
    title: string, required
    author: string, required
    genre: string
    isbn: string
    publisher: string
    description: string
}
```

### PATCH /books

update a book in the db. only send the fields to update.

```
{
    title: string
    author: string
    genre: string
    isbn: string
    publisher: string
    description: string
}
```

### DELETE /books/<book_id>

remove a book from the database


## references

based on:

[Build A Restful Api With Node.js Express & MongoDB | Rest Api Tutorial](https://www.youtube.com/watch?v=vjf774RKrLc)  
[Build A REST API With Node.js, Express, & MongoDB - Quick](https://www.youtube.com/watch?v=fgTGADljAeg)  
[Build A Node.js API Authentication With JWT Tutorial](https://www.youtube.com/watch?v=2jqok-WgelI)