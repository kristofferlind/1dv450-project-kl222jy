'use strict';

var React = require('react/addons');
var ReactTransitionGroup = React.addons.TransitionGroup;
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;
var Navbar = require('react-bootstrap').Navbar;
var NavItem = require('react-bootstrap').NavItem;
var Nav = require('react-bootstrap').Nav;

// CSS
require('../../styles/normalize.css');
require('../../styles/main.css');

var App = React.createClass({
    render: function() {
        return (
            <div className="container">
                <header>
                    <Navbar brand="MapTales" fixedTop inverse toggleNavKey={0}>
                        <Nav eventKey={0}>
                            <NavItem eventKey={1} href="#/">Home</NavItem>
                            <NavItem eventKey={2} href="#/about">About</NavItem>
                            <NavItem eventKey={3} href="#/contact">Contact</NavItem>
                        </Nav>
                    </Navbar>
                </header>

                <RouteHandler />
            </div>
        );
    }
});

module.exports = App;
