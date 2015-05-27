jest.autoMockOff();

var HELLO_MSG = 'Express App - Powered by Browserify and React!';

describe('Main', function() {

  it('should set the hello text', function() {
    var React = require('react/addons');
    var Main = require('../../../www/javascript/main');
    var TestUtils = React.addons.TestUtils;

    // Render the Main compontn
    var m = TestUtils.renderIntoDocument(
      <Main />
    );

    // Check that the div inner text is updated
    var div = TestUtils.findRenderedDOMComponentWithTag(m, 'div');
    expect(div.props.children).toBe(HELLO_MSG);
  });

});