'use strict';

var AppDispatcher = require('../dispatcher/app-dispatcher');
var WebAPIUtilities = require('../utilities/web-api-utilities');
var AppConstants = require('../constants/app-constants');
var ActionTypes = AppConstants.ActionTypes;

var dispatch = function(eventName, data) {
    AppDispatcher.dispatch({
        eventName: eventName,
        data: data
    });
};

var StoryActions = {
    add: function(story) {
        dispatch(ActionTypes.CREATE_STORY, story);
    },
    loadStories: function() {
        dispatch(ActionTypes.LOAD_STORIES);
        WebAPIUtilities.loadStories();
    }
};

module.exports = StoryActions;
