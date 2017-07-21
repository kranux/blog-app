import Ember from 'ember';

export default Ember.Controller.extend({

	auth: Ember.inject.service('auth'),

	actions: {

		login: function () {
			const user = this.store.createRecord('user', {
				email: this.get('email'),
				password: this.get('password')
			});

			user.save().then(() => {
				this.transitionToRoute('posts');
				this.get('auth').setUser({username: this.get('email')});
				this.set('email', '');
				this.set('password', '');
			}).catch((e) => {
				console.error('error has occoured', e);
			});
		}
	}
});
