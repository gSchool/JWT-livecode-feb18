npm install knex pg
dropdb knex_blog
createdb knex_blog
knex migrate:latest
knex seed:run