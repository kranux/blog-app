import Ember from 'ember';

export default Ember.Controller.extend({

	auth: Ember.inject.service('auth'),

	actions: {
		login: function () {
			this.get('auth')
				.login(this.get('username'), this.get('password'))
				.then(() => {
					this.set('username', '');
					this.set('password', '');
					this.transitionToRoute('posts');
				})
				.catch(console.error);
		}
	}
});
