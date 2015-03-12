'use strict';

var React = require('react/addons');
var GoogleMap = require('./google-map');
var StoryFilter = require('./story-filter');
var StoryList = require('./story-list');

//Mockdata
var fakeData = [{"id":35,"name":"testname","description":"testdescription","creator":{"id":1,"name":"Kristoffer Lind","email":"kristoffer@krad.se","self":"/api/v1/creators/1/stories"},"position":{"id":2,"longitude":55.0,"latitude":43.0},"tags":[],"self":"/api/v1/stories/35"},{"id":34,"name":"testname","description":"testdescription","creator":{"id":1,"name":"Kristoffer Lind","email":"kristoffer@krad.se","self":"/api/v1/creators/1/stories"},"position":{"id":2,"longitude":55.0,"latitude":43.0},"tags":[],"self":"/api/v1/stories/34"},{"id":33,"name":"testname","description":"testdescription","creator":{"id":1,"name":"Kristoffer Lind","email":"kristoffer@krad.se","self":"/api/v1/creators/1/stories"},"position":{"id":2,"longitude":55.0,"latitude":43.0},"tags":[],"self":"/api/v1/stories/33"},{"id":32,"name":"testname","description":"testdescription","creator":{"id":1,"name":"Kristoffer Lind","email":"kristoffer@krad.se","self":"/api/v1/creators/1/stories"},"position":{"id":2,"longitude":55.0,"latitude":43.0},"tags":[],"self":"/api/v1/stories/32"},{"id":31,"name":"testname","description":"testdescription","creator":{"id":1,"name":"Kristoffer Lind","email":"kristoffer@krad.se","self":"/api/v1/creators/1/stories"},"position":{"id":2,"longitude":55.0,"latitude":43.0},"tags":[],"self":"/api/v1/stories/31"},{"id":30,"name":"testname","description":"testdescription","creator":{"id":1,"name":"Kristoffer Lind","email":"kristoffer@krad.se","self":"/api/v1/creators/1/stories"},"position":{"id":2,"longitude":55.0,"latitude":43.0},"tags":[],"self":"/api/v1/stories/30"},{"id":29,"name":"testname","description":"testdescription","creator":{"id":1,"name":"Kristoffer Lind","email":"kristoffer@krad.se","self":"/api/v1/creators/1/stories"},"position":{"id":2,"longitude":55.0,"latitude":43.0},"tags":[],"self":"/api/v1/stories/29"},{"id":28,"name":"testname","description":"testdescription","creator":{"id":1,"name":"Kristoffer Lind","email":"kristoffer@krad.se","self":"/api/v1/creators/1/stories"},"position":{"id":2,"longitude":55.0,"latitude":43.0},"tags":[],"self":"/api/v1/stories/28"},{"id":27,"name":"testname","description":"testdescription","creator":{"id":1,"name":"Kristoffer Lind","email":"kristoffer@krad.se","self":"/api/v1/creators/1/stories"},"position":{"id":2,"longitude":55.0,"latitude":43.0},"tags":[],"self":"/api/v1/stories/27"},{"id":26,"name":"testname","description":"testdescription","creator":{"id":1,"name":"Kristoffer Lind","email":"kristoffer@krad.se","self":"/api/v1/creators/1/stories"},"position":{"id":2,"longitude":55.0,"latitude":43.0},"tags":[],"self":"/api/v1/stories/26"},{"id":25,"name":"testname","description":"testdescription","creator":{"id":1,"name":"Kristoffer Lind","email":"kristoffer@krad.se","self":"/api/v1/creators/1/stories"},"position":{"id":2,"longitude":55.0,"latitude":43.0},"tags":[],"self":"/api/v1/stories/25"},{"id":24,"name":"testname","description":"testdescription","creator":{"id":1,"name":"Kristoffer Lind","email":"kristoffer@krad.se","self":"/api/v1/creators/1/stories"},"position":{"id":2,"longitude":55.0,"latitude":43.0},"tags":[],"self":"/api/v1/stories/24"},{"id":23,"name":"testname","description":"testdescription","creator":{"id":1,"name":"Kristoffer Lind","email":"kristoffer@krad.se","self":"/api/v1/creators/1/stories"},"position":{"id":2,"longitude":55.0,"latitude":43.0},"tags":[],"self":"/api/v1/stories/23"},{"id":22,"name":"testname","description":"testdescription","creator":{"id":1,"name":"Kristoffer Lind","email":"kristoffer@krad.se","self":"/api/v1/creators/1/stories"},"position":{"id":2,"longitude":55.0,"latitude":43.0},"tags":[],"self":"/api/v1/stories/22"},{"id":21,"name":"testname","description":"testdescription","creator":{"id":1,"name":"Kristoffer Lind","email":"kristoffer@krad.se","self":"/api/v1/creators/1/stories"},"position":{"id":2,"longitude":55.0,"latitude":43.0},"tags":[],"self":"/api/v1/stories/21"},{"id":20,"name":"testname","description":"testdescription","creator":{"id":1,"name":"Kristoffer Lind","email":"kristoffer@krad.se","self":"/api/v1/creators/1/stories"},"position":{"id":2,"longitude":55.0,"latitude":43.0},"tags":[],"self":"/api/v1/stories/20"},{"id":17,"name":"testname","description":"testdescription","creator":{"id":1,"name":"Kristoffer Lind","email":"kristoffer@krad.se","self":"/api/v1/creators/1/stories"},"position":{"id":1,"longitude":45.0,"latitude":55.0},"tags":[],"self":"/api/v1/stories/17"},{"id":16,"name":"testname","description":"testdescription","creator":{"id":1,"name":"Kristoffer Lind","email":"kristoffer@krad.se","self":"/api/v1/creators/1/stories"},"position":null,"tags":[],"self":"/api/v1/stories/16"},{"id":15,"name":"testname","description":"testdescription","creator":{"id":1,"name":"Kristoffer Lind","email":"kristoffer@krad.se","self":"/api/v1/creators/1/stories"},"position":null,"tags":[],"self":"/api/v1/stories/15"},{"id":14,"name":"testname","description":"testdescription","creator":{"id":1,"name":"Kristoffer Lind","email":"kristoffer@krad.se","self":"/api/v1/creators/1/stories"},"position":null,"tags":[],"self":"/api/v1/stories/14"},{"id":13,"name":"testname","description":"testdescription","creator":{"id":1,"name":"Kristoffer Lind","email":"kristoffer@krad.se","self":"/api/v1/creators/1/stories"},"position":null,"tags":[],"self":"/api/v1/stories/13"},{"id":12,"name":"testname","description":"testdescription","creator":{"id":1,"name":"Kristoffer Lind","email":"kristoffer@krad.se","self":"/api/v1/creators/1/stories"},"position":null,"tags":[{"id":13,"name":"dev2","self":"/api/v1/tags/13"}],"self":"/api/v1/stories/12"},{"id":11,"name":"testname","description":"testdescription","creator":{"id":1,"name":"Kristoffer Lind","email":"kristoffer@krad.se","self":"/api/v1/creators/1/stories"},"position":null,"tags":[],"self":"/api/v1/stories/11"},{"id":10,"name":"testname","description":"testdescription","creator":{"id":1,"name":"Kristoffer Lind","email":"kristoffer@krad.se","self":"/api/v1/creators/1/stories"},"position":null,"tags":[],"self":"/api/v1/stories/10"},{"id":9,"name":"testname","description":"testdescription","creator":{"id":1,"name":"Kristoffer Lind","email":"kristoffer@krad.se","self":"/api/v1/creators/1/stories"},"position":null,"tags":[],"self":"/api/v1/stories/9"}];

var MainPage = React.createClass({
    getDefaultProps: function() {
        return {
            stories: fakeData
        };
    },
    getInitialState: function() {
        return {
            filterText: '',
            filterOptions: {}
        };
    },
    handleUserInput: function(filterText, filterOptions) {
        this.setState({
            filterText: filterText
        });
    },
    render: function() {
        var stories = this.props.stories;
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
