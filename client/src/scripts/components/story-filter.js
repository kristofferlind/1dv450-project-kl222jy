'use strict';

var React = require('react/addons');
var Input = require('react-bootstrap').Input;

var StoryFilter = React.createClass({
    handleChange: function() {
        this.props.onUserInput(this.refs.filterTextInput.getValue());
    },
    render: function() {
        return (
            <div className="story-filter">
                <Input type="text" placeholder="Search.." value={this.props.filterText} ref="filterTextInput" onChange={this.handleChange} />
            </div>
        );
    }
});

module.exports = StoryFilter;
