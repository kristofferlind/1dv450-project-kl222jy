'use strict';

var React = require('react/addons');
var Alert = require('react-bootstrap').Alert;

var Story = React.createClass({
    handleDelete: function() {
        console.log('delete');
    },
    render: function() {
        var story = this.props.story;
        var tags = [];
        if (story.tags.length > 0) {
            story.tags.forEach(function(tag) {
                tags.push(tag.name);
            });
            tags = tags.join(', ');
        }
        return (
            <div className="story-item">
                <Alert bsStyle="info" onDismiss={this.handleDelete}>
                    <h3>{story.name}</h3>
                    <p>{story.description} - {story.creator.name}</p>
                    <p>{tags}</p>
                </Alert>
            </div>
        );
    }
});

module.exports = Story;
