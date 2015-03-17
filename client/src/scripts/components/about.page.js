'use strict';

var React = require('react/addons');

var AboutPage = React.createClass({
  render: function() {
    return (
        <main className="container">
            <h1>About</h1>
            <p>Click map to create story, doubleclick story to edit.</p>
        </main>
    );
  }
});

module.exports = AboutPage;
