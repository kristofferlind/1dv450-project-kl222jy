'use strict';

var AppDispatcher = require('../dispatcher/app-dispatcher');
var AppConstants = require('../constants/app-constants');
var ActionTypes = AppConstants.ActionTypes;

var dispatch = function(eventName, data) {
    AppDispatcher.dispatch({
        eventName: eventName,
        data: data
    });
};

var ServerActions = {
    receiveStories: function(stories) {
        dispatch(ActionTypes.RECEIVE_STORIES, stories);
    },
    receiveStory: function(story) {
        dispatch(ActionTypes.RECEIVE_STORY, story);
    },
    removedStory: function(story) {
        dispatch(ActionTypes.STORY_REMOVED, story);
    },
    updatedStory: function(story) {
        dispatch(ActionTypes.STORY_UPDATED, story);
    }
};

module.exports = ServerActions;
