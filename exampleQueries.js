var knex = require('./db/knex');
var exampleToRun = process.argv[2] || 'selectUsers';


function printRows(rows) {
	console.log('\n===== results ======')
	for(var i = 0; i < rows.length; i++) {
		console.log(JSON.stringify(rows[i]));
	}
	console.log('\n\n');
	process.exit();
}

// Select all the users
var examples = {
	selectUsers: function() {
		knex.select('*').from('users').then(printRows);
	},

	selectUserNames: function() {
		knex.select('username').from('users').then(printRows);	
	},

	joinUsersToPosts: function() {
		knex('users')
		  .join('posts', 'users.id', '=', 'posts.user_id')
		  .select('users.username', 'posts.post_text')
		  .then(printRows);
	},

	joinPostsWithTags: function() {
		knex('tags_posts')
		  .join('posts', 'tags_posts.post_id', '=', 'posts.id')
		  .join('tags', 'tags_posts.tag_id', '=', 'tags.id')
		  .select('posts.id', 'posts.post_text', 'tags.name')
		  .orderBy('posts.id')
		  .then(printRows);
	},

	joinPostsUsersAndTags: function() {
		knex('tags_posts')
		  .join('posts', 'tags_posts.post_id', '=', 'posts.id')
		  .join('tags', 'tags_posts.tag_id', '=', 'tags.id')
		  .join('users', 'users.id', '=', 'posts.user_id')
		  .select('posts.id', 'posts.post_text', 'users.username', 'tags.name')
		  .orderBy('posts.id')
		  .then(printRows);
	} 
}

examples[exampleToRun]();
