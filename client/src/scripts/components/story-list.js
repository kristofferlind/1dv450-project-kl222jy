'use strict';

var React = require('react/addons');
var Story = require('./story');
// var Accordion = require('react-bootstrap').Accordion;

var StoryList = React.createClass({
    render: function() {
        var stories = this.props.stories.map(function(story) {
            return (
                <Story key={story.id} story={story} />
            );
        });
        return (
            <div className="story-list-container bg-primary">
                <div className="story-list">
                    {stories}
                </div>
            </div>
        );
    }
});

module.exports = StoryList;
