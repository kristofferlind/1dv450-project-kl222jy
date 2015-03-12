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
    }
};

module.exports = ServerActions;
