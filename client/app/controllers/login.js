import Ember from 'ember';

export default Ember.Controller.extend({
	actions: {
		login: function () {
			const user = this.store.createRecord('user', {
				email: this.get('email'),
				password: this.get('password')
			});

			user.save().then(() => {
				this.transitionToRoute('posts');
			}).catch((e) => {
				console.error('error has occoured', e);
			});
		}
	}
});
