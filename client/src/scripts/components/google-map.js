'use strict';

var React = require('react/addons');
var MapApi = window.google.maps;

//Need to keep track of markers outside react, following react rules we should repaint map on every change
//but it's too slow..
MapApi.markers = [];


var GoogleMap = React.createClass({
    getDefaultProps: function () {
        return {
            initialZoom: 3,
            mapCenterLat: 25,
            mapCenterLng: 25,
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
        // MapApi.event.addListener(map, 'click', this.handleMapClick);
        // MapApi.event.addListener(map, 'dblclick', this.handleMapDoubleClick);
    },
    // handleMapClick: function(event) {
    //     // console.log(event);
    //     // this.state.map.setCenter(event.LatLng);
    //     // this.setState({map: this.state.map});
    //     this.placeMarker(event.LatLng);
    // },
    // handleMapDoubleClick: function(event) {
    //     // event.preventDefault();
    //     // console.log(event);
    //     // this.state.map.setCenter(event.LatLng);
    //     // this.setState({map: this.state.map});
    // },
    // placeMarker: function(location) {
    //     var marker = new MapApi.Marker({
    //         position: location,
    //         map: this.state.map
    //     });
    //     MapApi.markers.push(marker);
    // },
    refreshMarkers: function() {
        this.setState({map: this.state.map});
    },
    render: function () {
        if (this.state && this.state.markers) {
            var oldMarkers = MapApi.markers;
            oldMarkers.forEach(function(marker) {
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
    }
});

module.exports = GoogleMap;
