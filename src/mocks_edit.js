var MocksEdit = require('./jsx/MocksEdit.jsx');

var mocks = React.createElement(MocksEdit ,{
    context_root: CONTEXT_ROOT.innerHTML,
    mock: JSON.parse(currentMock.innerHTML),
    methods: JSON.parse(currentMethods.innerHTML)
});
ReactDOM.render(mocks, document.getElementById('reactContainer'));
