import DS from 'ember-data';

export default DS.JSONAPIAdapter.extend({
	namespace: 'login',
	host: 'http://localhost:3000'
});
