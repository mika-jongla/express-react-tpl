var React = require('react');
var Main = require('./main');

// Needed for React Developer Tools
window.React = React;

// Render the main app react component into the document body
React.render(<Main />, document.body);
