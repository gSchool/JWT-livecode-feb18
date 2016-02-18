# Tyler Bettilyon: JWT Live Code Feb. 18 2016

This folder is an example of how to use Knex. In order to get started, run the bootstrap.sh shell script in your terminal:

```
$ ./bootstrap.sh
```

Alternately, you can run the commands individually:

```
npm install knex, pg
dropdb knex_blog
createdb knex_blog
knex migrate:latest
knex seed:run
```

Now you should have a database with data!

Run the server with 

```
node server/app.js
```
