import Ember from 'ember';

export default Ember.Controller.extend({
	error: '',

	actions: {
		createTask: function () {
			const post = this.store.createRecord('post', {
				title: this.get('title'),
				content: this.get('content')
			});

			post.save().then(() => {
				this.transitionToRoute('posts');
			}).catch(() => {
				this.set('error', 'An error has occoured.');
			});
		}
	}
});
