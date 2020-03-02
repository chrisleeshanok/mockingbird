var MocksCreate = require('./jsx/MocksCreate.jsx');

var mocks = React.createElement(MocksCreate ,{ "context_root": CONTEXT_ROOT.innerHTML });
ReactDOM.render(mocks, document.getElementById('reactContainer'));
