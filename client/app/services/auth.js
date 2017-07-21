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
	}
});
