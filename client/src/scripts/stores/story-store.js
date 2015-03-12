'use strict';

var AppDispatcher = require('../dispatcher/app-dispatcher');
var EventEmitter = require('events').EventEmitter;
var StoryConstants = require('../constants/story-constants');
// var WebAPIUtilities = require('../utilities/web-api-utilities');
var assign = require('object-assign');
var AppConstants = require('../constants/app-constants');
var ActionTypes = AppConstants.ActionTypes;

var _stories = [];

var StoryStore = assign({}, EventEmitter.prototype, {
    getAll: function() {
        return _stories;
    },
    emitChange: function() {
        this.emit(ActionTypes.CHANGE);
    },
    addChangeListener: function(callback) {
        this.on(ActionTypes.CHANGE, callback);
    },
    removeChangeListener: function(callback) {
        this.removeListener(ActionTypes.CHANGE, callback);
    }
});

AppDispatcher.register(function(payload) {
    switch(payload.eventName) {
        case ActionTypes.CREATE_STORY:
            //add story
            StoryStore.trigger(ActionTypes.CHANGE);
            break;
        case ActionTypes.RECEIVE_STORIES:
            _stories = payload.data;
            StoryStore.emitChange(ActionTypes.CHANGE);
            break;
    }

    return true;
});

module.exports = StoryStore;
