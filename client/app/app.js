import Ember from 'ember';
import Resolver from './resolver';
import loadInitializers from 'ember-load-initializers';
import config from './config/environment';
import DS from 'ember-data';


let App;

Ember.MODEL_FACTORY_INJECTIONS = true;

App = Ember.Application.extend({
	modulePrefix: config.modulePrefix,
	podModulePrefix: config.podModulePrefix,
	Resolver
});

loadInitializers(App, config.modulePrefix);

App.ApplicationAdapter = DS.RESTAdapter.extend({
	host: 'http://localhost:3000',
	ajax: function(url, method, hash) {
		hash.crossDomain = true;
		hash.xhrFields = {withCredentials: true};
		return this._super(url, method, hash);
	}
});

export default App;
