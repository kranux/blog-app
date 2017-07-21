import Ember from 'ember';

export default Ember.Service.extend({
	user: null,

	setUser: function(user) {
		this.set('user', user);
	},

	logout: function() {
		this.set('user', null);
	}
});
