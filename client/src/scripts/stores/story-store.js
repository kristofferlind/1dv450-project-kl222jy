'use strict';

var AppDispatcher = require('../dispatcher/app-dispatcher');
var EventEmitter = require('events').EventEmitter;
var StoryConstants = require('../constants/story-constants');
var assign = require('object-assign');
var AppConstants = require('../constants/app-constants');
var ActionTypes = AppConstants.ActionTypes;

var _stories = [];
var _links = {};

var StoryStore = assign({}, EventEmitter.prototype, {
    getAll: function() {
        return _stories;
    },
    getPageAmount: function() {
        if (_links.last) {
            var lasthref = _links.last.href;
            return lasthref.substr(lasthref.length -1);
        }
        return 0;
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

var findIndex = function(id) {
    var storyIds = _stories.map(function(story) {
        return story.id;
    });
    return storyIds.indexOf(id);
};

var addStory = function(story) {
    _stories.push(story);
};

var updateStory = function(story) {
    var storyIndex = findIndex(story.id);
    _stories[storyIndex] = story;
};

var removeStory = function(story) {
    var storyIndex = findIndex(story.id);
    _stories.splice(storyIndex, 1);
};

AppDispatcher.register(function(payload) {
    switch(payload.eventName) {
        case ActionTypes.CREATE_STORY:
            //add story (optimistic)
            // StoryStore.emitChange(ActionTypes.CHANGE);
            break;
        case ActionTypes.RECEIVE_STORIES:
            _stories = payload.data.stories;
            _links = payload.data._links;
            StoryStore.emitChange(ActionTypes.CHANGE);
            break;
        case ActionTypes.RECEIVE_MORE_STORIES:
            payload.data.stories.forEach(function(story) {
                _stories.push(story);
            });
            // _stories = payload.data.stories;
            _links = payload.data._links;
            StoryStore.emitChange(ActionTypes.CHANGE);
            break;
        case ActionTypes.RECEIVE_STORY:
            addStory(payload.data);
            StoryStore.emitChange(ActionTypes.CHANGE);
            break;
        case ActionTypes.STORY_REMOVED:
            removeStory(payload.data);
            StoryStore.emitChange(ActionTypes.CHANGE);
            break;
        case ActionTypes.STORY_UPDATED:
            updateStory(payload.data);
            StoryStore.emitChange(ActionTypes.CHANGE);
            break;
    }

    return true;
});

module.exports = StoryStore;
