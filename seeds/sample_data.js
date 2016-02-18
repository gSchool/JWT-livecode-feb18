
var users = [
	{id: 1, username: "Tyler", password: '12345'},
	{id: 2, username: "Liz", password: '12345'},
	{id: 3, username: "Elie", password: '12345'},
	{id: 4, username: "Foxworthington", password: '12345'}
];

var posts = [
	{id: 1, post_text: "JavaScript is sweet", user_id: 1},
	{id: 2, post_text: "I like sushi", user_id: 1},
	{id: 3, post_text: "Eggs are delicious", user_id: 2},
	{id: 4, post_text: "BURN IT ALL DOWN", user_id: 2},
	{id: 5, post_text: "Teamwork makes that dream work", user_id: 2},
	{id: 6, post_text: "I decided to be team Edward", user_id: 3},
	{id: 7, post_text: "programming is fun", user_id: 3},
	{id: 8, post_text: "last week I found ten bucks on the ground", user_id: 4},
	{id: 9, post_text: "dancing in the rain was a bad idea", user_id: 4}
];

var tags = [
	{id: 1, name: 'programming'},
	{id: 2, name: 'food'},
	{id: 3, name: 'random'},
	{id: 4, name: 'motivational'}
];

var tagsPosts = [
	{id: 1, tag_id: 1, post_id: 1},
	{id: 2, tag_id: 1, post_id: 7},
	{id: 3, tag_id: 2, post_id: 2},
	{id: 4, tag_id: 2, post_id: 3},
	{id: 5, tag_id: 4, post_id: 9},
	{id: 6, tag_id: 4, post_id: 1},
	{id: 7, tag_id: 4, post_id: 5},
	{id: 8, tag_id: 3, post_id: 4},
	{id: 9, tag_id: 3, post_id: 5},
	{id: 10, tag_id: 3, post_id: 8},
	{id: 11, tag_id: 3, post_id: 9},
];

exports.seed = function(knex, Promise) {
	var userPromises = [];
	for(var index in users) {
    	userPromises.push(knex('users').insert(users[index]));
    }

    var postPromises = [];
    for(var index in posts) {
    	postPromises.push(knex('posts').insert(posts[index]));
    }

    var tagsPromises = []
    for(var index in tags) {
    	tagsPromises.push(knex('tags').insert(tags[index]));
    }

 	var tagsPostsPromises = []
    for(var index in tagsPosts) {
    	tagsPostsPromises.push(knex('tags_posts').insert(tagsPosts[index]));
    }

  	return Promise.all(userPromises).then(function(results) {
  		return Promise.all(postPromises);
  	}).then(function(results){
  		return Promise.all(tagsPromises);
  	}).then(function(results){
  		return Promise.all(tagsPostsPromises);
  	})
};
