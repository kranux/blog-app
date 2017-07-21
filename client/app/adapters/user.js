import DS from 'ember-data';

export default DS.JSONAPIAdapter.extend({
	namespace: 'login',
	host: 'http://localhost:3000',
	corsWithCredentials: true,
	headers: {
		'X-Requested-With': 'XMLHttpRequest'
	},
	ajax: function (url, method, hash) {
		console.log(url, method, hash);
		hash = hash || {};
		hash.crossDomain = true;
		hash.xhrFields = { withCredentials: true };
		return this._super(url, method, hash);
	}
});
