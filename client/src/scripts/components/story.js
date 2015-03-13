'use strict';

var React = require('react/addons');
var Alert = require('react-bootstrap').Alert;
var StoryActions = require('../actions/story-actions');
var OverlayMixin = require('react-bootstrap').OverlayMixin;
var EditStoryModal = require('./edit-story-modal');

var Story = React.createClass({
    mixins: [OverlayMixin],
    getInitialState: function() {
        return {
            isModalOpen: false
        };
    },
    handleDelete: function() {
        StoryActions.remove(this.props.story);
    },
    handleEdit: function() {
        this.toggleModal();
    },
    toggleModal: function() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    },
    filter: function() {
        this.props.onFilter(this.props.story.creator.name);
    },
    render: function() {
        var story = this.props.story;
        var tags = function() {
            var tags = [];

            if (story.tags.length > 0) {
                story.tags.forEach(function(tag) {
                    tags.push(tag.name);
                });
                tags = tags.join(', ');
            }
            return tags;
        };
        return (
            <div className="story-item">
                <Alert bsStyle="info" onDismiss={this.handleDelete}>
                    <h3 onClick={this.handleEdit}>{story.name}</h3>
                    <p>{story.description} - <span onClick={this.filter}>{story.creator.name}</span></p>
                    <p>{tags()}</p>
                </Alert>
            </div>
        );
    },
    renderOverlay: function() {
        if (!this.state.isModalOpen) {
            return <span/>;
        }

        return (
            <EditStoryModal story={this.props.story} onToggle={this.toggleModal} />
        );
    }
});

module.exports = Story;
