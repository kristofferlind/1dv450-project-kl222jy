'use strict';

var React = require('react/addons');
var Story = require('./story');
var InfiniteScroll = require('react-infinite-scroll')(React);

var StoryList = React.createClass({
    getDefaultProps: function() {
        return {
            listen: true,
            lastPage: 1
        };
    },
    componentDidMount: function () {
        this.props.listen = true;
        this.page = 1;
    },
    componentDidUpdate: function () {
        this.props.listen = true;
    },
    componentWillUnmount: function () {
        this.props.listen = true;
    },
    hasMore: function() {
        return this.page < this.props.lastPage;
    },
    onScrolling: function() {
        if (!this.props.listen || !this.hasMore()) {
            return;
        }
        var element = this.getDOMNode();
        var scrollTop = element.scrollTop;
        var containerHeight = element.offsetHeight;
        var listHeight = this.refs.storyList.getDOMNode().offsetHeight - containerHeight;

        var position = listHeight - scrollTop;
        if (position < 500) {
            this.page += 1;
            this.props.loadMore(this.page);
            this.props.listen = false;
        }
    },
    render: function() {
        var component = this;
        var stories = this.props.stories.map(function(story) {
            return (
                <Story key={story.id} story={story} onFilter={component.props.onFilter} />
            );
        });
        return (
            <div onScroll={this.onScrolling} className="story-list-container bg-primary">
                <div ref="storyList" className="story-list">
                    {stories}
                </div>
            </div>
        );
    }
});

module.exports = StoryList;
