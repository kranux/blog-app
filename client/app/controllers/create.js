import Ember from 'ember';

export default Ember.Controller.extend({
	actions: {
		createTask: function () {
			const post = this.store.createRecord('post', {
				title: this.get('title'),
				content: this.get('content')
			});

			post.save().then(() => {
				this.transitionToRoute('posts');
			}).catch((e) => {
				console.error('error has occoured', e);
			});
		}
	}
});
