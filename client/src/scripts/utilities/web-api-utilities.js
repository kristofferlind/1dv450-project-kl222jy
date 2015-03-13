'use strict';

var AppConstants = require('../constants/app-constants');
var ServerActions = require('../actions/server-actions');
var request = require('superagent');

var APIEndpoints = AppConstants.APIEndpoints;

var handleErrors = function(error, response) {
    if (response.status === 401 || response.status === 403) {
        //make this a message instead, where user can opt to login
        window.location = AppConstants.URLS.LOGIN_PAGE;
    }
};

var WebAPIUtilities = {
    getToken: function() {
        return localStorage.getItem('token');
    },
    createStory: function(story) {
        request.post(APIEndpoints.STORIES)
            .accept('application/json')
            .set('Content-Type', 'application/json')
            .set('ClientKey', '6c747debaa8a1d177cc23d03f726f1a2')
            .set('Authorization', 'Bearer ' + this.getToken())
            .send(story)
            .end(function(error, response) {
                if (error || response.error) {
                    handleErrors(error, response);
                    return;
                }

                ServerActions.receiveStory(response.body);
            });
    },
    loadStories: function() {
        request.get(APIEndpoints.STORIES)
            .accept('application/json')
            .set('ClientKey', '6c747debaa8a1d177cc23d03f726f1a2')
            .end(function(error, response) {
                if (error || response.error) {
                    handleErrors(error, response);
                    return;
                }

                ServerActions.receiveStories(response.body);
            });
    },
    loadMoreStories: function(page) {
        request.get(APIEndpoints.STORIES + '?page=' + page)
            .accept('application/json')
            .set('ClientKey', '6c747debaa8a1d177cc23d03f726f1a2')
            .end(function(error, response) {
                if (error || response.error) {
                    handleErrors(error, response);
                    return;
                }

                ServerActions.receiveMoreStories(response.body);
            });
    },
    removeStory: function(story) {
        request.del(APIEndpoints.STORIES + '/' + story.id)
            .set('Content-Type', 'application/json')
            .set('ClientKey', '6c747debaa8a1d177cc23d03f726f1a2')
            .set('Authorization', 'Bearer ' + this.getToken())
            .end(function(error, response) {
                if (error || response.error) {
                    handleErrors(error, response);
                    return;
                }

                ServerActions.removedStory(story);
            });
    },
    updateStory: function(story) {
        request.put(APIEndpoints.STORIES + '/' + story.id)
            .accept('application/json')
            .set('Content-Type', 'application/json')
            .set('ClientKey', '6c747debaa8a1d177cc23d03f726f1a2')
            .set('Authorization', 'Bearer ' + this.getToken())
            .send(story)
            .end(function(error, response) {
                if (error || response.error) {
                    handleErrors(error, response);
                    return;
                }

                ServerActions.updatedStory(response.body);
            });
    },
};

module.exports = WebAPIUtilities;
