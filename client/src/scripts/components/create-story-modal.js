'use strict';

var React = require('react/addons');
var StoryActions = require('../actions/story-actions');
var Modal = require('react-bootstrap').Modal;
var Button = require('react-bootstrap').Button;
var Input = require('react-bootstrap').Input;

var CreateStoryModal = React.createClass({
    createStory: function(e) {
        e.preventDefault();
        var position = this.props.position;
        var story = {
            name: this.refs.storyName.getValue(),
            description: this.refs.storyDescription.getValue(),
            position: {
                latitude: position.k,
                longitude: position.D
            }
        };
        var tags = this.refs.storyTags.getValue().split(',');
        story.tags = [];
        if (tags.length > 0) {
            tags.forEach(function(tag) {
                story.tags.push(tag.trim());
            });
        }
        StoryActions.add(story);
        this.props.onToggle();
    },
    render: function() {
        return (
            <Modal bsStyle="primary" title="Create story" onRequestHide={this.props.onToggle}>
                <div className="modal-body">
                    <form onSubmit={this.createStory}>
                        <Input type="text" placeholder="Storyname" ref="storyName" label="Name" />
                        <Input type="textarea" placeholder="Once upon a time.." ref="storyDescription" label="Description" />
                        <Input type="text" placeholder="tag, tag, tag" ref="storyTags" label="Tags" />
                        <Input type="submit" value="Create" />
                    </form>
                </div>
            </Modal>
        );
    }
});

module.exports = CreateStoryModal;
