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

var Routes = (
    <Route handler={AppLayout}>
        <Route name="about" handler={AboutPage}/>
        <Route name="contact" handler={ContactPage}/>
        <DefaultRoute name="home" handler={MainPage} />
    </Route>
);

Router.run(Routes, function (Handler) {
    React.render(<Handler/>, content);
});
