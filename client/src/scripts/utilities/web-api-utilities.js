'use strict';

var AppConstants = require('../constants/app-constants');
var ServerActions = require('../actions/server-actions');
var request = require('superagent');

var APIEndpoints = AppConstants.APIEndpoints;

var WebAPIUtilities = {
    loadStories: function() {
        request.get(APIEndpoints.STORIES)
            .accept('application/json')
            .set('ClientKey', '6c747debaa8a1d177cc23d03f726f1a2')
            .end(function(error, response) {
                // console.log(error, response);
                if (error) {
                    console.error(error);
                }

                if (response) {
                    if (response.error) {
                        console.error(error);
                    }
                    ServerActions.receiveStories(response.body.stories);
                }
            });
    }
};

module.exports = WebAPIUtilities;
