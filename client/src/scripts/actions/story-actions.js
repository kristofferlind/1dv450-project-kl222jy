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
        WebAPIUtilities.createStory(story);
    },
    loadStories: function() {
        dispatch(ActionTypes.LOAD_STORIES);
        WebAPIUtilities.loadStories();
    },
    loadMoreStories: function(page) {
        dispatch(ActionTypes.LOAD_MORE_STORIES, page);
        WebAPIUtilities.loadMoreStories(page);
    },
    remove: function(story) {
        dispatch(ActionTypes.DESTROY_STORY, story);
        WebAPIUtilities.removeStory(story);
    },
    update: function(story) {
        dispatch(ActionTypes.UPDATE_STORY, story);
        WebAPIUtilities.updateStory(story);
    }
};

module.exports = StoryActions;
