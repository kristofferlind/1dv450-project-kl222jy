'use strict';

var APIRoot = 'http://localhost:3000/api';

var AppConstants = {
    APIEndpoints: {
        STORIES: APIRoot + '/v1/stories'
    },
    ActionTypes: {
        CHANGE: 'change',
        CREATE_STORY: 'create-story',
        LOAD_STORIES: 'load-stories',
        RECEIVE_STORIES: 'reveive-stories'
    }
};

module.exports = AppConstants;
