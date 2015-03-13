'use strict';

var RootURL = 'http://localhost:3000';
var APIRoot = RootURL + '/api';

var AppConstants = {
    APIEndpoints: {
        STORIES: APIRoot + '/v1/stories'
    },
    ActionTypes: {
        CHANGE: 'change',
        CREATE_STORY: 'create-story',
        LOAD_STORIES: 'load-stories',
        LOAD_MORE_STORIES: 'load-more-stories',
        RECEIVE_STORIES: 'reveive-stories',
        RECEIVE_STORY: 'reveive-story',
        DESTROY_STORY: 'destroy-story',
        STORY_REMOVED: 'story-removed',
        UPDATE_STORY: 'update-story',
        STORY_UPDATED: 'story-updated'
    },
    URLS: {
        LOGIN_PAGE: RootURL + '/auth/github'
    }
};

module.exports = AppConstants;
