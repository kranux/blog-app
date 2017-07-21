import Ember from 'ember';

export default Ember.Service.extend({
	user: null,

	store: Ember.inject.service('store'),

	setUser: function(user) {
		this.set('user', user);
	},

	logout: function() {
		this.set('user', null);
		this.get('store').unloadAll('user');
	},

	login: function(username, password) {
		return new Promise((resolve, reject) => {
			const user = this.get('store').createRecord('user', {username, password});
			user.save().then(() => {
				this.setUser({username});
				resolve(true);
			}).catch(reject);
		});

	}
});
