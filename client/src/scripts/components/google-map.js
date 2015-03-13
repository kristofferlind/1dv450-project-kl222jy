'use strict';

var React = require('react/addons');
var MapApi = window.google.maps;
// var AppDispatcher = require('../dispatcher/app-dispatcher');
var StoryActions = require('../actions/story-actions');
var OverlayMixin = require('react-bootstrap').OverlayMixin;
var CreateStoryModal = require('./create-story-modal');

//Need to keep track of markers outside react, following react rules we should repaint map on every change
//but it's too slow..
MapApi.markers = [];


var GoogleMap = React.createClass({
    mixins: [OverlayMixin],
    lastPosition: {},
    getDefaultProps: function () {
        return {
            initialZoom: 3,
            mapCenterLat: 25,
            mapCenterLng: 25,
        };
    },
    getInitialState: function() {
        return {
            isModalOpen: false
        };
    },
    componentDidMount: function (rootNode) {
        var position = new MapApi.LatLng(this.props.mapCenterLat, this.props.mapCenterLng);

        var mapOptions = {
            center: position,
            zoom: this.props.initialZoom
        },
        map = new MapApi.Map(this.getDOMNode(), mapOptions);

        this.setState({map: map});

        //event logic
        MapApi.event.addListener(map, 'click', this.handleMapClick);
    },
    handleMapClick: function(event) {
        console.log(event);
        this.lastPosition = event.latLng;
        this.toggleModal();
    },
    toggleModal: function() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    },
    refreshMarkers: function() {
        this.setState({map: this.state.map});
    },
    render: function () {
        if (this.state && this.state.markers) {
            MapApi.markers.forEach(function(marker) {
                marker.setMap(null);
            });
        }
        if (this.state && this.state.map) {
            var map = this.state.map;
            MapApi.markers.forEach(function(marker) {
                marker.setMap(null);
            });

            MapApi.markers = [];

            var stories = this.props.stories;
            stories.forEach(function(story) {
                if (story && story.position && story.position.latitude && story.position.longitude) {
                    var LatLng = new MapApi.LatLng(story.position.latitude, story.position.longitude);
                    var marker = new MapApi.Marker({
                        position: LatLng,
                        title: story.name
                    });
                    MapApi.markers.push(marker);
                }
            });
            MapApi.markers.forEach(function(marker) {
                marker.setMap(map);
            });
        }
        return (
            <div className='google-map'></div>
        );
    },
    renderOverlay: function() {
        if (!this.state.isModalOpen) {
            return <span/>;
        }

        return (
            <CreateStoryModal position={this.lastPosition} onToggle={this.toggleModal} />
        );
    }
});

module.exports = GoogleMap;
