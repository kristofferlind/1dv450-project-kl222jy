'use strict';

var React = require('react/addons');
var GoogleMap = require('./google-map');
var StoryFilter = require('./story-filter');
var StoryList = require('./story-list');
var StoryStore = require('../stores/story-store');
var StoryActions = require('../actions/story-actions');

var MainPage = React.createClass({
    getInitialState: function() {
        return {
            filterText: '',
            filterOptions: {},
            stories: StoryStore.getAll()
        };
    },
    componentDidMount: function() {
        // StoryStore.bind('change', this.storiesChanged);
        StoryStore.addChangeListener(this.onChange);
        StoryActions.loadStories();
    },
    componentWillUnmount: function() {
        StoryStore.removeChangeListener(this.onChange);
        // StoryStore.unbind('change', this.storiesChanged);
    },
    handleUserInput: function(filterText, filterOptions) {
        this.setState({
            filterText: filterText
        });
    },
    onChange: function() {
        this.setState({
            stories: StoryStore.getAll()
        });
    },
    render: function() {
        var stories = this.state.stories; //StoryStore.getAll(); //this.props.stories;
        var filterText = this.state.filterText;
        var filterOptions = this.state.filterOptions;
        if (filterText) {
            stories = stories.filter(function(story) {
                var checkTags = function() {
                    if (story.tags.length < 1) {
                        return false;
                    }
                    return story.tags.some(function(tag) {
                        return tag.name.indexOf(filterText) !== -1;
                    });
                };
                return story.name.toLowerCase().indexOf(filterText.toLowerCase()) !== -1 ||
                    story.description.toLowerCase().indexOf(filterText.toLowerCase()) !== -1 ||
                    story.creator.name.toLowerCase().indexOf(filterText.toLowerCase()) !== -1 ||
                    checkTags();
            });
        }

        return (
            <main className="container-fluid">
                <StoryFilter filterText={this.state.filterText} filterOptions={this.state.filterOptions} onUserInput={this.handleUserInput} />
                <div className="row no-gutter full-height">
                    <div className="col-md-8 full-height">
                        <GoogleMap stories={stories} />
                    </div>
                    <div className="col-md-4 full-height">
                        <StoryList stories={stories} />
                    </div>
                </div>
            </main>
        );
    }
});

module.exports = MainPage;
