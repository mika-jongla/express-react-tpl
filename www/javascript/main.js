var React = require('react');

const HELLO_MSG = 'Express App - Powered by Browserify and React!';

var Main = React.createClass({

  render: function() {
    return (
      <div>{HELLO_MSG}</div>
    );
  }
  
});

module.exports = Main;