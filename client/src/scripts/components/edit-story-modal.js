'use strict';

var React = require('react/addons');
var StoryActions = require('../actions/story-actions');
var Modal = require('react-bootstrap').Modal;
var Button = require('react-bootstrap').Button;
var Input = require('react-bootstrap').Input;

var EditStoryModal = React.createClass({
    updateStory: function(e) {
        e.preventDefault();
        var story = this.props.story;
        story.name = this.refs.storyName.getValue();
        story.description = this.refs.storyDescription.getValue();
        story.tags = [];

        //transform tags
        var tags = this.refs.storyTags.getValue().split(',');
        if (tags.length > 0) {
            tags.forEach(function(tag) {
                story.tags.push(tag.trim());
            });
        }
        StoryActions.update(story);
        this.props.onToggle();
    },
    render: function() {
        var story = this.props.story;
        var tagNames = story.tags.map(function(tag) {
            return tag.name;
        });
        var tags = tagNames.join(', ');

        return (
            <Modal bsStyle="primary" title="Edit story" onRequestHide={this.props.onToggle}>
                <div className="modal-body">
                    <form onSubmit={this.updateStory}>
                        <Input type="text" placeholder="Storyname" ref="storyName" label="Name" defaultValue={story.name} />
                        <Input type="textarea" placeholder="Once upon a time.." ref="storyDescription" label="Description" defaultValue={story.description} />
                        <Input type="text" placeholder="tag, tag, tag" ref="storyTags" label="Tags" defaultValue={tags} />
                        <Input type="submit" value="Edit" />
                    </form>
                </div>
            </Modal>
        );
    }
});

module.exports = EditStoryModal;
