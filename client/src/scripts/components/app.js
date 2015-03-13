'use strict';

var AppLayout = require('./app.layout');
var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

// Pages
var MainPage = require('./main.page');
var AboutPage = require('./about.page');
var ContactPage = require('./contact.page');

var content = document.getElementById('content');

var LoginCallback = React.createClass({
    mixins: [Router.State, Router.Navigation],
    componentDidMount: function() {
        var token = this.getParams().token;
        localStorage.setItem('token', token);
        this.transitionTo('home');
    },
    render: function() {
        return (
            <div></div>
        );
    }
});

var Routes = (
    <Route handler={AppLayout}>
        <Route name="about" handler={AboutPage}/>
        <Route name="contact" handler={ContactPage}/>
        <Route name="callback" url="callback?token=:token" handler={LoginCallback} />
        <Route name="token" path="/token/:token" handler={LoginCallback} />
        <DefaultRoute name="home" handler={MainPage} />
    </Route>
);

Router.run(Routes, function (Handler) {
    React.render(<Handler/>, content);
});
