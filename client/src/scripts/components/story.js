'use strict';

var React = require('react/addons');
var Alert = require('react-bootstrap').Alert;
var Button = require('react-bootstrap').Button;
var Glyphicon = require('react-bootstrap').Glyphicon;
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
    filter: function(data, e) {
        this.props.onFilter(data);
    },
    render: function() {
        var component = this;
        var story = this.props.story;
        var tags = '';
        if (story.tags.length > 0) {
            tags = story.tags.map(function(tag) {
                return (
                    <span key={tag.id}><a href="#" onClick={component.filter.bind(null, tag.name)}>{tag.name}</a> </span>
                );
            });
        }
         // <Button bsStyle="warning" bsSize="small" onClick={this.handleEdit}><Glyphicon glyph="pencil" /></Button>
        return (
            <div key={story.id} onDoubleClick={this.handleEdit} className="story-item">
                <Alert bsStyle="info" onDismiss={this.handleDelete}>
                    <h3>{story.name}</h3>
                    <p>{story.description} - <a href="#" onClick={this.filter.bind(null, story.creator.name)}>{story.creator.name}</a></p>
                    <p>{tags}</p>
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
