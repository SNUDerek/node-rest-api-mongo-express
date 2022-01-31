# REST API example with mongodb, node and express

basic node CRUD & authentication REST API with express. saves to and reads from monogdb.

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

## usage

see the included `test-xxx.ipynb` for testing with python notebook, or see the `test.rest` file for testing with VS Code extension.

## user endpoints

### POST /api/user/register

<todo>

### POST /api/user/login

<todo>

## books endpoints

### GET /json

hello world test

### GET /books

return list of all books in the db

### POST /books

post book to db

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