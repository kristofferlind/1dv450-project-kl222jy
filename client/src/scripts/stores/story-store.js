'use strict';

var AppDispatcher = require('../dispatcher/app-dispatcher');
var EventEmitter = require('events').EventEmitter;
var StoryConstants = require('../constants/story-constants');
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
            //add story (optimistic)
            // StoryStore.emitChange(ActionTypes.CHANGE);
            break;
        case ActionTypes.RECEIVE_STORIES:
            _stories = payload.data;
            StoryStore.emitChange(ActionTypes.CHANGE);
            break;
        case ActionTypes.RECEIVE_STORY:
            _stories.push(payload.data);
            StoryStore.emitChange(ActionTypes.CHANGE);
            break;
        case ActionTypes.STORY_REMOVED:
            var story = payload.data;
            for (var i = 0; i < _stories.length; i++) {
                if (_stories[i].id === story.id) {
                    _stories.splice(i, 1);
                    break;
                }
            }
            StoryStore.emitChange(ActionTypes.CHANGE);
            break;
        case ActionTypes.STORY_UPDATED:
            var story = payload.data;
            for (var i = 0; i < _stories.length; i++) {
                if (_stories[i].id === story.id) {
                    _stories[i] = story;
                    break;
                }
            }
            StoryStore.emitChange(ActionTypes.CHANGE);
            break;
    }

    return true;
});

module.exports = StoryStore;
