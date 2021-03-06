import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
	location: config.locationType,
	rootURL: config.rootURL
});

Router.map(function() {
	this.route('posts');
	this.route('create');
	this.route('login');
});

Router.reopen({
	location: 'hash'
});

export default Router;
