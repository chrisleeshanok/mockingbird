(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/chrisls/dev/common-ui/mockingbird/src/jsx/MockMethods.jsx":[function(require,module,exports){
(function (global){
var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var $ = (typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null);

var MockMethod = React.createClass({displayName: "MockMethod",

    getInitialState: function() {
        return {
            editMode: false,
            method: this.props.method
        };
    },

    toggleEditMode: function() {
        this.setState({
            editMode: !this.state.editMode
        });
    },

    componentDidUpdate: function() {
        if (this.state.editMode) {
            $("#selectCodeMenu" + this.state.method.method).val(this.state.method.code);
        }
    },

    putUpdate: function() {
        //TODO: Validation
        var payload = {
            endpointId: this.state.method.endpointId,
            code: $("#selectCodeMenu" + this.state.method.method).val(),
            method: this.state.method.method,
            data: this.refs.responseData.value
        };

        var url = this.props.context_root + '/api/method/' + this.state.method._id;

        $.ajax({
            type: 'PUT',
            url: url,
            data: payload,
            dataType: 'json',
            success: function(response){
                this.setState({
                    method: response.result,
                    editMode: false
                });
            }.bind(this)
        });

    },

    render: function() {

        if (this.state.editMode) {
            return (
                React.createElement("div", {style: {marginBottom: '40px'}}, 
                    React.createElement("div", {className: "row"}, 
                        React.createElement("div", {className: "col-md-6"}, React.createElement("h4", null, "Edit ", this.state.method.method, " | ", this.state.method.code)), 
                        React.createElement("div", {className: "col-md-6 text-right"}, 
                            React.createElement("button", {className: "btn btn-primary", onClick: this.putUpdate}, "Save"), " ", 
                            React.createElement("button", {className: "btn btn-default", onClick: this.toggleEditMode}, "Cancel")
                        )
                    ), 
                    React.createElement("div", {className: "row"}, 
                        React.createElement("div", {className: "col-md-12"}, 
                            React.createElement("label", {htmlFor: "methodResponseData" + this.state.method.method}), 
                            React.createElement("textarea", {className: "form-control json-field", id: "methodResponseData" + this.state.method.method, ref: "responseData", defaultValue: JSON.stringify(this.state.method.data)}
                            )
                        )
                    ), 
                    React.createElement("div", {className: "row"}, 
                        React.createElement("div", {className: "col-md-6"}, 
                            React.createElement("h4", null, "Mock Response Code"), 
                            React.createElement("p", null, "Choose a response code to return"), 
                            React.createElement("div", {className: "row"}, 
                                React.createElement("div", {className: "col-md-12"}, 
                                    React.createElement("select", {id: "selectCodeMenu" + this.state.method.method, ref: "selectCodeMenu"}, 
                                        React.createElement("option", {value: "200"}, "200"), 
                                        React.createElement("option", {value: "201"}, "201"), 
                                        React.createElement("option", {value: "202"}, "202"), 
                                        React.createElement("option", {value: "203"}, "203"), 
                                        React.createElement("option", {value: "204"}, "204"), 
                                        React.createElement("option", {value: "205"}, "205"), 
                                        React.createElement("option", {value: "206"}, "206"), 
                                        React.createElement("option", {value: "300"}, "300"), 
                                        React.createElement("option", {value: "301"}, "301"), 
                                        React.createElement("option", {value: "302"}, "302"), 
                                        React.createElement("option", {value: "303"}, "303"), 
                                        React.createElement("option", {value: "304"}, "304"), 
                                        React.createElement("option", {value: "305"}, "305"), 
                                        React.createElement("option", {value: "306"}, "306"), 
                                        React.createElement("option", {value: "307"}, "307"), 
                                        React.createElement("option", {value: "400"}, "400"), 
                                        React.createElement("option", {value: "401"}, "401"), 
                                        React.createElement("option", {value: "403"}, "403"), 
                                        React.createElement("option", {value: "404"}, "404"), 
                                        React.createElement("option", {value: "405"}, "405"), 
                                        React.createElement("option", {value: "407"}, "407"), 
                                        React.createElement("option", {value: "408"}, "408"), 
                                        React.createElement("option", {value: "409"}, "409"), 
                                        React.createElement("option", {value: "410"}, "410"), 
                                        React.createElement("option", {value: "411"}, "411"), 
                                        React.createElement("option", {value: "412"}, "412"), 
                                        React.createElement("option", {value: "413"}, "413"), 
                                        React.createElement("option", {value: "414"}, "414"), 
                                        React.createElement("option", {value: "415"}, "415"), 
                                        React.createElement("option", {value: "416"}, "416"), 
                                        React.createElement("option", {value: "417"}, "417"), 
                                        React.createElement("option", {value: "500"}, "500"), 
                                        React.createElement("option", {value: "501"}, "501"), 
                                        React.createElement("option", {value: "503"}, "503"), 
                                        React.createElement("option", {value: "504"}, "504"), 
                                        React.createElement("option", {value: "505"}, "505")
                                    )
                                )
                            )
                        ), 
                        React.createElement("div", {className: "col-md-6"}, 
                            React.createElement("h4", null, "Mock Response Delay (ms)"), 
                            React.createElement("p", null, React.createElement("em", null, "Currently not available"))
                        )
                    )
                )
            );
        } else {
            return (
                React.createElement("div", {style: {marginBottom: '40px'}}, 
                    React.createElement("div", {className: "row"}, 
                        React.createElement("div", {className: "col-md-6"}, React.createElement("h4", null, this.state.method.method, " | ", this.state.method.code)), 
                        React.createElement("div", {className: "col-md-6 text-right"}, React.createElement("button", {className: "btn btn-warning", onClick: this.toggleEditMode}, "Edit"))
                    ), 
                    React.createElement("div", {className: "row"}, 
                        React.createElement("div", {className: "col-md-12"}, 
                            React.createElement("label", {htmlFor: "methodResponseData" + this.state.method.method}), 
                            React.createElement("textarea", {className: "form-control json-field", id: "methodResponseData" + this.state.method.method, ref: "responseData", value: JSON.stringify(this.state.method.data), readOnly: true}
                            )
                        )
                    )
                )
            );
        }
    }
});

var MockMethods = React.createClass({displayName: "MockMethods",

    getInitialState: function() {
        return {
            methods: this.props.methods,
            addMode: false
        };
    },

    toggleAddMode: function() {
        this.setState({
            addMode: !this.state.addMode
        });
    },

    calculateAvailableVerbs: function() {
        //Warning - Shitty code for the sake of time to demo
        //TODO: Clean up this diaper method
        var responseVerbs = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'];
        var availableVerbs = [];
        var i;
        var j;
        for (i = 0; i < responseVerbs.length; i++) {
            var match = false;
            for (j = 0; j < this.state.methods.length; j++) {
                match = match || (this.state.methods[j].method == responseVerbs[i]);
            }
            if (!match) {
                availableVerbs.push({verb: responseVerbs[i]});
            }
        }

        return availableVerbs;
    },

    generateVerbOptions: function() {
        var availableVerbs = this.calculateAvailableVerbs();

        var options = availableVerbs.map(function(verb) {
            return React.createElement("option", {value: verb.verb}, verb.verb);
        });


        return options;

    },

    postVerb: function() {
        //TODO: Validation
        var payload = {
            endpointId: this.props.mock._id,
            code: 200,
            method: this.refs.selectVerbMenu.value,
            data: JSON.stringify({
                "samplekey": "samplevalue"
            })
        };

        var url = this.props.context_root + '/api/method';

        $.ajax({
            type: 'POST',
            url: url,
            data: payload,
            dataType: 'json',
            success: function(response){

                var methods = this.state.methods.slice(0);
                methods.push(response.result);

                this.setState({
                    methods: methods,
                    addMode: false
                });
            }.bind(this)
        });

    },

    render: function() {
        if (this.state.addMode) {
            return (
                React.createElement("div", {className: "row"}, 
                    React.createElement("div", {className: "col-md-12 text-right", style: {marginBottom: '20px'}}, 
                        React.createElement("select", {id: "selectVerbMenu", ref: "selectVerbMenu"}, 
                            this.generateVerbOptions()
                        ), " ", 
                        React.createElement("button", {className: "btn btn-primary", onClick: this.postVerb}, "Create"), " ", 
                        React.createElement("button", {className: "btn btn-default", onClick: this.toggleAddMode}, "Cancel")
                    ), 
                    React.createElement("div", {className: "col-md-12"}, 
                    this.state.methods.map(function(method) {
                        return React.createElement(MockMethod, {context_root: this.props.context_root, key: method._id + method.code + method.method, method: method})
                    }.bind(this))
                    )
                )
            );
        } else {

            var addButton = "";
            if (this.generateVerbOptions().length > 0) {
                addButton = React.createElement("button", {className: "btn btn-primary", onClick: this.toggleAddMode}, "Add New Verb");
            }

            return (
                React.createElement("div", {className: "row"}, 
                    React.createElement("div", {className: "col-md-12 text-right", style: {marginBottom: '20px'}}, 
                        addButton
                    ), 
                    React.createElement("div", {className: "col-md-12"}, 
                    this.state.methods.map(function(method) {
                        return React.createElement(MockMethod, {context_root: this.props.context_root, key: method._id + method.code + method.method, method: method})
                    }.bind(this))
                    )
                )
            );
        }

    }
});



module.exports = MockMethods;
module.exports.MockMethod = MockMethod;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],"/Users/chrisls/dev/common-ui/mockingbird/src/jsx/MocksEdit.jsx":[function(require,module,exports){
(function (global){
var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var $ = (typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null);
var Clipboard = (typeof window !== "undefined" ? window['Clipboard'] : typeof global !== "undefined" ? global['Clipboard'] : null);

var MockMethods = require('./MockMethods.jsx');

var MocksEdit = React.createClass({displayName: "MocksEdit",

    getInitialState: function() {
        return {
            mock: this.props.mock,
            updated: false,
            error: false
        };
    },

    componentDidMount: function() {
        new Clipboard('.clipboardButton');
    },

    putForm: function() {

        if (!this.refs.name.value) {
            this.setState({ error: true });
            return;
        }
        //TODO: cleanup code, method, and data. Deprecated

        var data = {
            "name": this.refs.name.value,
            "description": this.refs.description.value,
            "author": this.refs.author.value,
            "componentName": this.refs.componentName.value,
            "responseData": JSON.stringify({"null":"null}"}),
            "componentProduct": this.refs.componentProduct.value,
            "responseCode": 200,
            "responseMethod": "GET"
        };

        var url = this.props.context_root + '/api/mock/' + this.state.mock._id;

        $.ajax({
            type: 'PUT',
            url: url,
            data: data,
            dataType: 'json',
            success: function(response){
                this.setState({
                    updated: true,
                    mock: response.result
                });
            }.bind(this)
        });
    },

    cancelForm: function() {
        //Just plain navigate back to the root
        window.location = this.props.context_root + '/mocks';
    },

    render: function() {
        var updated = "";
        if (this.state.updated) {
            updated = React.createElement("span", null, "The update was successful");
        }

        return (
            React.createElement("div", {className: "container"}, 
                React.createElement("div", {className: "row"}, 
                    React.createElement("div", {className: "col-md-1"}, 
                        React.createElement("button", {style: {marginTop: '20px'}, onClick: this.cancelForm, type: "submit", className: "btn btn-secondary"}, "Back")
                    ), 
                    React.createElement("div", {className: "col-md-11"}, 
                        React.createElement("h1", null, "Update ", this.props.mock.name), 
                        React.createElement("div", {className: "input-group"}, 
                            React.createElement("input", {id: "endpointURL", className: "form-control endpointURL", type: "text", value: this.props.context_root + '/mockapi/mock/' + this.state.mock._id, readOnly: true}), 
                            React.createElement("div", {className: "input-group-btn"}, 
                                React.createElement("button", {className: "btn btn-default clipboardButton", "data-clipboard-target": "#endpointURL"}, "Copy")
                            )
                        ), 
                        React.createElement("p", null)

                    )
                ), 
                React.createElement("hr", null), 
                React.createElement("div", {className: "row"}, 
                    React.createElement("div", {className: "col-md-6"}, 
                        React.createElement("h3", null, "Basics"), 
                        React.createElement("p", null, "Enter some identifying information"), 
                        React.createElement("div", {className: "form-group"}, 
                            React.createElement("label", {htmlFor: "mockName"}, "Name"), 
                            React.createElement("input", {type: "text", className: "form-control", id: "mockName", placeholder: "Name (REQUIRED)", ref: "name", name: "name", defaultValue: this.props.mock.name, required: true})
                        ), 
                        React.createElement("div", {className: "form-group"}, 
                            React.createElement("label", {htmlFor: "mockDescription"}, "Description"), 
                            React.createElement("input", {type: "text", className: "form-control", id: "mockDescription", placeholder: "Description", ref: "description", defaultValue: this.props.mock.metadata.description, name: "description"})
                        ), 
                        React.createElement("div", {className: "form-group"}, 
                            React.createElement("label", {htmlFor: "mockAuthor"}, "Author Email"), 
                            React.createElement("input", {type: "text", className: "form-control", id: "mockAuthor", placeholder: "Author Email", ref: "author", name: "author", defaultValue: this.props.mock.metadata.author})
                        )
                    ), 
                    React.createElement("div", {className: "col-md-6"}, 
                        React.createElement("h3", null, "Component Info"), 
                        React.createElement("p", null, "Enter some information about the component this data is going to be used for"), 
                        React.createElement("div", {className: "form-group"}, 
                            React.createElement("label", {htmlFor: "mockComponentName"}, "Component Name"), 
                            React.createElement("input", {type: "text", className: "form-control", id: "mockComponentName", placeholder: "Component Name", ref: "componentName", name: "componentName", defaultValue: this.props.mock.component.name})
                        ), 
                        React.createElement("div", {className: "form-group"}, 
                            React.createElement("label", {htmlFor: "mockComponentProduct"}, "Product"), 
                            React.createElement("input", {type: "text", className: "form-control", id: "mockComponentProduct", placeholder: "Product Name", ref: "componentProduct", name: "componentProduct", defaultValue: this.props.mock.component.product})
                        )
                    )
                ), 
                React.createElement("div", {className: "row"}, 
                    React.createElement("div", {className: "col-md-12 text-right"}, 
                        React.createElement("hr", null), 
                        React.createElement("button", {onClick: this.putForm, type: "submit", className: "btn btn-primary"}, "Update"), "  ", 
                        React.createElement("button", {onClick: this.cancelForm, type: "submit", className: "btn btn-secondary"}, "Cancel"), " ", updated
                    )
                ), 
                React.createElement("div", {className: "row"}, 
                    React.createElement("div", {className: "col-md-12"}, 
                    React.createElement("h3", null, "Endpoint VERBS"), 
                    React.createElement("p", null, "Below you will find verbs associated with this endpoint"), 
                        React.createElement(MockMethods, {context_root: this.props.context_root, mock: this.state.mock, methods: this.props.methods})
                    )
                )

            )
        );
    }
});

module.exports = MocksEdit;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./MockMethods.jsx":"/Users/chrisls/dev/common-ui/mockingbird/src/jsx/MockMethods.jsx"}],"/Users/chrisls/dev/common-ui/mockingbird/src/mocks_edit.js":[function(require,module,exports){
var MocksEdit = require('./jsx/MocksEdit.jsx');

var mocks = React.createElement(MocksEdit ,{
    context_root: CONTEXT_ROOT.innerHTML,
    mock: JSON.parse(currentMock.innerHTML),
    methods: JSON.parse(currentMethods.innerHTML)
});
ReactDOM.render(mocks, document.getElementById('reactContainer'));

},{"./jsx/MocksEdit.jsx":"/Users/chrisls/dev/common-ui/mockingbird/src/jsx/MocksEdit.jsx"}]},{},["/Users/chrisls/dev/common-ui/mockingbird/src/mocks_edit.js"])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvY2hyaXNscy9kZXYvY29tbW9uLXVpL21vY2tpbmdiaXJkL3NyYy9qc3gvTW9ja01ldGhvZHMuanN4IiwiL1VzZXJzL2NocmlzbHMvZGV2L2NvbW1vbi11aS9tb2NraW5nYmlyZC9zcmMvanN4L01vY2tzRWRpdC5qc3giLCIvVXNlcnMvY2hyaXNscy9kZXYvY29tbW9uLXVpL21vY2tpbmdiaXJkL3NyYy9tb2Nrc19lZGl0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztBQ0FBLElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUM3QixJQUFJLENBQUMsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7O0FBRTFCLElBQUksZ0NBQWdDLDBCQUFBOztJQUVoQyxlQUFlLEVBQUUsV0FBVztRQUN4QixPQUFPO1lBQ0gsUUFBUSxFQUFFLEtBQUs7WUFDZixNQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNO1NBQzVCLENBQUM7QUFDVixLQUFLOztJQUVELGNBQWMsRUFBRSxXQUFXO1FBQ3ZCLElBQUksQ0FBQyxRQUFRLENBQUM7WUFDVixRQUFRLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVE7U0FDakMsQ0FBQyxDQUFDO0FBQ1gsS0FBSzs7SUFFRCxrQkFBa0IsRUFBRSxXQUFXO1FBQzNCLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUU7WUFDckIsQ0FBQyxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUMvRTtBQUNULEtBQUs7O0FBRUwsSUFBSSxTQUFTLEVBQUUsV0FBVzs7UUFFbEIs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LEVBQUEsQ0FBQSxDQUFDLEtBQUEsRUFBSyxDQUFDLEtBQU0sQ0FBQSxFQUFBLEtBQVksQ0FBQSxFQUFBO3dDQUNoQyxvQkFBQSxRQUFPLEVBQUEsQ0FBQSxDQUFDLEtBQUEsRUFBSyxDQUFDLEtBQU0sQ0FBQSxFQUFBLEtBQVksQ0FBQSxFQUFBO3dDQUNoQyxvQkFBQSxRQUFPLEVBQUEsQ0FBQSxDQUFDLEtBQUEsRUFBSyxDQUFDLEtBQU0sQ0FBQSxFQUFBLEtBQVksQ0FBQSxFQUFBO3dDQUNoQyxvQkFBQSxRQUFPLEVBQUEsQ0FBQSxDQUFDLEtBQUEsRUFBSyxDQUFDLEtBQU0sQ0FBQSxFQUFBLEtBQVksQ0FBQSxFQUFBO3dDQUNoQyxvQkFBQSxRQUFPLEVBQUEsQ0FBQSxDQUFDLEtBQUEsRUFBSyxDQUFDLEtBQU0sQ0FBQSxFQUFBLEtBQVksQ0FBQSxFQUFBO3dDQUNoQyxvQkFBQSxRQUFPLEVBQUEsQ0FBQSxDQUFDLEtBQUEsRUFBSyxDQUFDLEtBQU0sQ0FBQSxFQUFBLEtBQVksQ0FBQSxFQUFBO3dDQUNoQyxvQkFBQSxRQUFPLEVBQUEsQ0FBQSxDQUFDLEtBQUEsRUFBSyxDQUFDLEtBQU0sQ0FBQSxFQUFBLEtBQVksQ0FBQSxFQUFBO3dDQUNoQyxvQkFBQSxRQUFPLEVBQUEsQ0FBQSxDQUFDLEtBQUEsRUFBSyxDQUFDLEtBQU0sQ0FBQSxFQUFBLEtBQVksQ0FBQSxFQUFBO3dDQUNoQyxvQkFBQSxRQUFPLEVBQUEsQ0FBQSxDQUFDLEtBQUEsRUFBSyxDQUFDLEtBQU0sQ0FBQSxFQUFBLEtBQVksQ0FBQSxFQUFBO3dDQUNoQyxvQkFBQSxRQUFPLEVBQUEsQ0FBQSxDQUFDLEtBQUEsRUFBSyxDQUFDLEtBQU0sQ0FBQSxFQUFBLEtBQVksQ0FBQSxFQUFBO3dDQUNoQyxvQkFBQSxRQUFPLEVBQUEsQ0FBQSxDQUFDLEtBQUEsRUFBSyxDQUFDLEtBQU0sQ0FBQSxFQUFBLEtBQVksQ0FBQSxFQUFBO3dDQUNoQyxvQkFBQSxRQUFPLEVBQUEsQ0FBQSxDQUFDLEtBQUEsRUFBSyxDQUFDLEtBQU0sQ0FBQSxFQUFBLEtBQVksQ0FBQSxFQUFBO3dDQUNoQyxvQkFBQSxRQUFPLEVBQUEsQ0FBQSxDQUFDLEtBQUEsRUFBSyxDQUFDLEtBQU0sQ0FBQSxFQUFBLEtBQVksQ0FBQSxFQUFBO3dDQUNoQyxvQkFBQSxRQUFPLEVBQUEsQ0FBQSxDQUFDLEtBQUEsRUFBSyxDQUFDLEtBQU0sQ0FBQSxFQUFBLEtBQVksQ0FBQSxFQUFBO3dDQUNoQyxvQkFBQSxRQUFPLEVBQUEsQ0FBQSxDQUFDLEtBQUEsRUFBSyxDQUFDLEtBQU0sQ0FBQSxFQUFBLEtBQVksQ0FBQSxFQUFBO3dDQUNoQyxvQkFBQSxRQUFPLEVBQUEsQ0FBQSxDQUFDLEtBQUEsRUFBSyxDQUFDLEtBQU0sQ0FBQSxFQUFBLEtBQVksQ0FBQSxFQUFBO3dDQUNoQyxvQkFBQSxRQUFPLEVBQUEsQ0FBQSxDQUFDLEtBQUEsRUFBSyxDQUFDLEtBQU0sQ0FBQSxFQUFBLEtBQVksQ0FBQSxFQUFBO3dDQUNoQyxvQkFBQSxRQUFPLEVBQUEsQ0FBQSxDQUFDLEtBQUEsRUFBSyxDQUFDLEtBQU0sQ0FBQSxFQUFBLEtBQVksQ0FBQSxFQUFBO3dDQUNoQyxvQkFBQSxRQUFPLEVBQUEsQ0FBQSxDQUFDLEtBQUEsRUFBSyxDQUFDLEtBQU0sQ0FBQSxFQUFBLEtBQVksQ0FBQSxFQUFBO3dDQUNoQyxvQkFBQSxRQUFPLEVBQUEsQ0FBQSxDQUFDLEtBQUEsRUFBSyxDQUFDLEtBQU0sQ0FBQSxFQUFBLEtBQVksQ0FBQSxFQUFBO3dDQUNoQyxvQkFBQSxRQUFPLEVBQUEsQ0FBQSxDQUFDLEtBQUEsRUFBSyxDQUFDLEtBQU0sQ0FBQSxFQUFBLEtBQVksQ0FBQSxFQUFBO3dDQUNoQyxvQkFBQSxRQUFPLEVBQUEsQ0FBQSxDQUFDLEtBQUEsRUFBSyxDQUFDLEtBQU0sQ0FBQSxFQUFBLEtBQVksQ0FBQSxFQUFBO3dDQUNoQyxvQkFBQSxRQUFPLEVBQUEsQ0FBQSxDQUFDLEtBQUEsRUFBSyxDQUFDLEtBQU0sQ0FBQSxFQUFBLEtBQVksQ0FBQSxFQUFBO3dDQUNoQyxvQkFBQSxRQUFPLEVBQUEsQ0FBQSxDQUFDLEtBQUEsRUFBSyxDQUFDLEtBQU0sQ0FBQSxFQUFBLEtBQVksQ0FBQSxFQUFBO3dDQUNoQyxvQkFBQSxRQUFPLEVBQUEsQ0FBQSxDQUFDLEtBQUEsRUFBSyxDQUFDLEtBQU0sQ0FBQSxFQUFBLEtBQVksQ0FBQSxFQUFBO3dDQUNoQyxvQkFBQSxRQUFPLEVBQUEsQ0FBQSxDQUFDLEtBQUEsRUFBSyxDQUFDLEtBQU0sQ0FBQSxFQUFBLEtBQVksQ0FBQSxFQUFBO3dDQUNoQyxvQkFBQSxRQUFPLEVBQUEsQ0FBQSxDQUFDLEtBQUEsRUFBSyxDQUFDLEtBQU0sQ0FBQSxFQUFBLEtBQVksQ0FBQSxFQUFBO3dDQUNoQyxvQkFBQSxRQUFPLEVBQUEsQ0FBQSxDQUFDLEtBQUEsRUFBSyxDQUFDLEtBQU0sQ0FBQSxFQUFBLEtBQVksQ0FBQSxFQUFBO3dDQUNoQyxvQkFBQSxRQUFPLEVBQUEsQ0FBQSxDQUFDLEtBQUEsRUFBSyxDQUFDLEtBQU0sQ0FBQSxFQUFBLEtBQVksQ0FBQSxFQUFBO3dDQUNoQyxvQkFBQSxRQUFPLEVBQUEsQ0FBQSxDQUFDLEtBQUEsRUFBSyxDQUFDLEtBQU0sQ0FBQSxFQUFBLEtBQVksQ0FBQSxFQUFBO3dDQUNoQyxvQkFBQSxRQUFPLEVBQUEsQ0FBQSxDQUFDLEtBQUEsRUFBSyxDQUFDLEtBQU0sQ0FBQSxFQUFBLEtBQVksQ0FBQSxFQUFBO3dDQUNoQyxvQkFBQSxRQUFPLEVBQUEsQ0FBQSxDQUFDLEtBQUEsRUFBSyxDQUFDLEtBQU0sQ0FBQSxFQUFBLEtBQVksQ0FBQSxFQUFBO3dDQUNoQyxvQkFBQSxRQUFPLEVBQUEsQ0FBQSxDQUFDLEtBQUEsRUFBSyxDQUFDLEtBQU0sQ0FBQSxFQUFBLEtBQVksQ0FBQTtvQ0FDM0IsQ0FBQTtnQ0FDUCxDQUFBOzRCQUNKLENBQUE7d0JBQ0osQ0FBQSxFQUFBO3dCQUNOLG9CQUFBLEtBQUksRUFBQSxDQUFBLENBQUMsU0FBQSxFQUFTLENBQUMsVUFBVyxDQUFBLEVBQUE7NEJBQ3RCLG9CQUFBLElBQUcsRUFBQSxJQUFDLEVBQUEsMEJB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WUFFSixDQUFBO1VBQ1I7S0FDTDtBQUNMLENBQUMsQ0FBQyxDQUFDOztBQUVILE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFDOzs7OztBQ3ZJM0IsSUFBSSxTQUFTLEdBQUcsT0FBTyxDQUFDLHFCQUFxQixDQUFDLENBQUM7O0FBRS9DLElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQyxhQUFhLENBQUMsU0FBUyxFQUFFO0lBQ3ZDLFlBQVksRUFBRSxZQUFZLENBQUMsU0FBUztJQUNwQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDO0lBQ3ZDLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUM7Q0FDaEQsQ0FBQyxDQUFDO0FBQ0gsUUFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLGNBQWMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbnZhciAkID0gcmVxdWlyZSgnanF1ZXJ5Jyk7XG5cbnZhciBNb2NrTWV0aG9kID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXG4gICAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGVkaXRNb2RlOiBmYWxzZSxcbiAgICAgICAgICAgIG1ldGhvZDogdGhpcy5wcm9wcy5tZXRob2RcbiAgICAgICAgfTtcbiAgICB9LFxuXG4gICAgdG9nZ2xlRWRpdE1vZGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGVkaXRNb2RlOiAhdGhpcy5zdGF0ZS5lZGl0TW9kZVxuICAgICAgICB9KTtcbiAgICB9LFxuXG4gICAgY29tcG9uZW50RGlkVXBkYXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuZWRpdE1vZGUpIHtcbiAgICAgICAgICAgICQoXCIjc2VsZWN0Q29kZU1lbnVcIiArIHRoaXMuc3RhdGUubWV0aG9kLm1ldGhvZCkudmFsKHRoaXMuc3RhdGUubWV0aG9kLmNvZGUpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIHB1dFVwZGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vVE9ETzogVmFsaWRhdGlvblxuICAgICAgICB2YXIgcGF5bG9hZCA9IHtcbiAgICAgICAgICAgIGVuZHBvaW50SWQ6IHRoaXMuc3RhdGUubWV0aG9kLmVuZHBvaW50SWQsXG4gICAgICAgICAgICBjb2RlOiAkKFwiI3NlbGVjdENvZGVNZW51XCIgKyB0aGlzLnN0YXRlLm1ldGhvZC5tZXRob2QpLnZhbCgpLFxuICAgICAgICAgICAgbWV0aG9kOiB0aGlzLnN0YXRlLm1ldGhvZC5tZXRob2QsXG4gICAgICAgICAgICBkYXRhOiB0aGlzLnJlZnMucmVzcG9uc2VEYXRhLnZhbHVlXG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIHVybCA9IHRoaXMucHJvcHMuY29udGV4dF9yb290ICsgJy9hcGkvbWV0aG9kLycgKyB0aGlzLnN0YXRlLm1ldGhvZC5faWQ7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHR5cGU6ICdQVVQnLFxuICAgICAgICAgICAgdXJsOiB1cmwsXG4gICAgICAgICAgICBkYXRhOiBwYXlsb2FkLFxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlc3BvbnNlKXtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiByZXNwb25zZS5yZXN1bHQsXG4gICAgICAgICAgICAgICAgICAgIGVkaXRNb2RlOiBmYWxzZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfS5iaW5kKHRoaXMpXG4gICAgICAgIH0pO1xuXG4gICAgfSxcblxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuZWRpdE1vZGUpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17e21hcmdpbkJvdHRvbTogJzQwcHgnfX0+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1tZC02XCI+PGg0PkVkaXQge3RoaXMuc3RhdGUubWV0aG9kLm1ldGhvZH0gfCB7dGhpcy5zdGF0ZS5tZXRob2QuY29kZX08L2g0PjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtbWQtNiB0ZXh0LXJpZ2h0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnlcIiBvbkNsaWNrPXt0aGlzLnB1dFVwZGF0ZX0+U2F2ZTwvYnV0dG9uPiZuYnNwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1kZWZhdWx0XCIgb25DbGljaz17dGhpcy50b2dnbGVFZGl0TW9kZX0+Q2FuY2VsPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1tZC0xMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBodG1sRm9yPXtcIm1ldGhvZFJlc3BvbnNlRGF0YVwiICsgdGhpcy5zdGF0ZS5tZXRob2QubWV0aG9kfT48L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZXh0YXJlYSBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2wganNvbi1maWVsZFwiIGlkPXtcIm1ldGhvZFJlc3BvbnNlRGF0YVwiICsgdGhpcy5zdGF0ZS5tZXRob2QubWV0aG9kfSByZWY9XCJyZXNwb25zZURhdGFcIiBkZWZhdWx0VmFsdWU9e0pTT04uc3RyaW5naWZ5KHRoaXMuc3RhdGUubWV0aG9kLmRhdGEpfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RleHRhcmVhPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtbWQtNlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoND5Nb2NrIFJlc3BvbnNlIENvZGU8L2g0PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwPkNob29zZSBhIHJlc3BvbnNlIGNvZGUgdG8gcmV0dXJuPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLW1kLTEyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c2VsZWN0IGlkPXtcInNlbGVjdENvZGVNZW51XCIgKyB0aGlzLnN0YXRlLm1ldGhvZC5tZXRob2R9IHJlZj1cInNlbGVjdENvZGVNZW51XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIjIwMFwiPjIwMDwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCIyMDFcIj4yMDE8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiMjAyXCI+MjAyPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIjIwM1wiPjIwMzwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCIyMDRcIj4yMDQ8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiMjA1XCI+MjA1PC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIjIwNlwiPjIwNjwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCIzMDBcIj4zMDA8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiMzAxXCI+MzAxPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIjMwMlwiPjMwMjwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCIzMDNcIj4zMDM8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiMzA0XCI+MzA0PC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIjMwNVwiPjMwNTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCIzMDZcIj4zMDY8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiMzA3XCI+MzA3PC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIjQwMFwiPjQwMDwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCI0MDFcIj40MDE8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiNDAzXCI+NDAzPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIjQwNFwiPjQwNDwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCI0MDVcIj40MDU8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiNDA3XCI+NDA3PC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIjQwOFwiPjQwODwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCI0MDlcIj40MDk8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiNDEwXCI+NDEwPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIjQxMVwiPjQxMTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCI0MTJcIj40MTI8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiNDEzXCI+NDEzPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIjQxNFwiPjQxNDwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCI0MTVcIj40MTU8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiNDE2XCI+NDE2PC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIjQxN1wiPjQxNzwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCI1MDBcIj41MDA8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiNTAxXCI+NTAxPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIjUwM1wiPjUwMzwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCI1MDRcIj41MDQ8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiNTA1XCI+NTA1PC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLW1kLTZcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDQ+TW9jayBSZXNwb25zZSBEZWxheSAobXMpPC9oND5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD48ZW0+Q3VycmVudGx5IG5vdCBhdmFpbGFibGU8L2VtPjwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3ttYXJnaW5Cb3R0b206ICc0MHB4J319PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtbWQtNlwiPjxoND57dGhpcy5zdGF0ZS5tZXRob2QubWV0aG9kfSB8IHt0aGlzLnN0YXRlLm1ldGhvZC5jb2RlfTwvaDQ+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1tZC02IHRleHQtcmlnaHRcIj48YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4td2FybmluZ1wiIG9uQ2xpY2s9e3RoaXMudG9nZ2xlRWRpdE1vZGV9PkVkaXQ8L2J1dHRvbj48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1tZC0xMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBodG1sRm9yPXtcIm1ldGhvZFJlc3BvbnNlRGF0YVwiICsgdGhpcy5zdGF0ZS5tZXRob2QubWV0aG9kfT48L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZXh0YXJlYSBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2wganNvbi1maWVsZFwiIGlkPXtcIm1ldGhvZFJlc3BvbnNlRGF0YVwiICsgdGhpcy5zdGF0ZS5tZXRob2QubWV0aG9kfSByZWY9XCJyZXNwb25zZURhdGFcIiB2YWx1ZT17SlNPTi5zdHJpbmdpZnkodGhpcy5zdGF0ZS5tZXRob2QuZGF0YSl9IHJlYWRPbmx5PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGV4dGFyZWE+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxufSk7XG5cbnZhciBNb2NrTWV0aG9kcyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblxuICAgIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBtZXRob2RzOiB0aGlzLnByb3BzLm1ldGhvZHMsXG4gICAgICAgICAgICBhZGRNb2RlOiBmYWxzZVxuICAgICAgICB9O1xuICAgIH0sXG5cbiAgICB0b2dnbGVBZGRNb2RlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBhZGRNb2RlOiAhdGhpcy5zdGF0ZS5hZGRNb2RlXG4gICAgICAgIH0pO1xuICAgIH0sXG5cbiAgICBjYWxjdWxhdGVBdmFpbGFibGVWZXJiczogZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vV2FybmluZyAtIFNoaXR0eSBjb2RlIGZvciB0aGUgc2FrZSBvZiB0aW1lIHRvIGRlbW9cbiAgICAgICAgLy9UT0RPOiBDbGVhbiB1cCB0aGlzIGRpYXBlciBtZXRob2RcbiAgICAgICAgdmFyIHJlc3BvbnNlVmVyYnMgPSBbJ0dFVCcsICdQT1NUJywgJ1BVVCcsICdQQVRDSCcsICdERUxFVEUnLCAnT1BUSU9OUyddO1xuICAgICAgICB2YXIgYXZhaWxhYmxlVmVyYnMgPSBbXTtcbiAgICAgICAgdmFyIGk7XG4gICAgICAgIHZhciBqO1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgcmVzcG9uc2VWZXJicy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIG1hdGNoID0gZmFsc2U7XG4gICAgICAgICAgICBmb3IgKGogPSAwOyBqIDwgdGhpcy5zdGF0ZS5tZXRob2RzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgbWF0Y2ggPSBtYXRjaCB8fCAodGhpcy5zdGF0ZS5tZXRob2RzW2pdLm1ldGhvZCA9PSByZXNwb25zZVZlcmJzW2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghbWF0Y2gpIHtcbiAgICAgICAgICAgICAgICBhdmFpbGFibGVWZXJicy5wdXNoKHt2ZXJiOiByZXNwb25zZVZlcmJzW2ldfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYXZhaWxhYmxlVmVyYnM7XG4gICAgfSxcblxuICAgIGdlbmVyYXRlVmVyYk9wdGlvbnM6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgYXZhaWxhYmxlVmVyYnMgPSB0aGlzLmNhbGN1bGF0ZUF2YWlsYWJsZVZlcmJzKCk7XG5cbiAgICAgICAgdmFyIG9wdGlvbnMgPSBhdmFpbGFibGVWZXJicy5tYXAoZnVuY3Rpb24odmVyYikge1xuICAgICAgICAgICAgcmV0dXJuIDxvcHRpb24gdmFsdWU9e3ZlcmIudmVyYn0+e3ZlcmIudmVyYn08L29wdGlvbj47XG4gICAgICAgIH0pO1xuXG5cbiAgICAgICAgcmV0dXJuIG9wdGlvbnM7XG5cbiAgICB9LFxuXG4gICAgcG9zdFZlcmI6IGZ1bmN0aW9uKCkge1xuICAgICAgICAvL1RPRE86IFZhbGlkYXRpb25cbiAgICAgICAgdmFyIHBheWxvYWQgPSB7XG4gICAgICAgICAgICBlbmRwb2ludElkOiB0aGlzLnByb3BzLm1vY2suX2lkLFxuICAgICAgICAgICAgY29kZTogMjAwLFxuICAgICAgICAgICAgbWV0aG9kOiB0aGlzLnJlZnMuc2VsZWN0VmVyYk1lbnUudmFsdWUsXG4gICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAgICAgXCJzYW1wbGVrZXlcIjogXCJzYW1wbGV2YWx1ZVwiXG4gICAgICAgICAgICB9KVxuICAgICAgICB9O1xuXG4gICAgICAgIHZhciB1cmwgPSB0aGlzLnByb3BzLmNvbnRleHRfcm9vdCArICcvYXBpL21ldGhvZCc7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHR5cGU6ICdQT1NUJyxcbiAgICAgICAgICAgIHVybDogdXJsLFxuICAgICAgICAgICAgZGF0YTogcGF5bG9hZCxcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihyZXNwb25zZSl7XG5cbiAgICAgICAgICAgICAgICB2YXIgbWV0aG9kcyA9IHRoaXMuc3RhdGUubWV0aG9kcy5zbGljZSgwKTtcbiAgICAgICAgICAgICAgICBtZXRob2RzLnB1c2gocmVzcG9uc2UucmVzdWx0KTtcblxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgICAgICBtZXRob2RzOiBtZXRob2RzLFxuICAgICAgICAgICAgICAgICAgICBhZGRNb2RlOiBmYWxzZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfS5iaW5kKHRoaXMpXG4gICAgICAgIH0pO1xuXG4gICAgfSxcblxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmFkZE1vZGUpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtbWQtMTIgdGV4dC1yaWdodFwiIHN0eWxlPXt7bWFyZ2luQm90dG9tOiAnMjBweCd9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzZWxlY3QgaWQ9XCJzZWxlY3RWZXJiTWVudVwiIHJlZj1cInNlbGVjdFZlcmJNZW51XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3RoaXMuZ2VuZXJhdGVWZXJiT3B0aW9ucygpfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9zZWxlY3Q+Jm5ic3A7XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeVwiIG9uQ2xpY2s9e3RoaXMucG9zdFZlcmJ9PkNyZWF0ZTwvYnV0dG9uPiZuYnNwO1xuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLWRlZmF1bHRcIiBvbkNsaWNrPXt0aGlzLnRvZ2dsZUFkZE1vZGV9PkNhbmNlbDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtbWQtMTJcIj5cbiAgICAgICAgICAgICAgICAgICAge3RoaXMuc3RhdGUubWV0aG9kcy5tYXAoZnVuY3Rpb24obWV0aG9kKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gPE1vY2tNZXRob2QgY29udGV4dF9yb290PXt0aGlzLnByb3BzLmNvbnRleHRfcm9vdH0ga2V5PXttZXRob2QuX2lkICsgbWV0aG9kLmNvZGUgKyBtZXRob2QubWV0aG9kfSBtZXRob2Q9e21ldGhvZH0vPlxuICAgICAgICAgICAgICAgICAgICB9LmJpbmQodGhpcykpfVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIHZhciBhZGRCdXR0b24gPSBcIlwiO1xuICAgICAgICAgICAgaWYgKHRoaXMuZ2VuZXJhdGVWZXJiT3B0aW9ucygpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBhZGRCdXR0b24gPSA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeVwiIG9uQ2xpY2s9e3RoaXMudG9nZ2xlQWRkTW9kZX0+QWRkIE5ldyBWZXJiPC9idXR0b24+O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLW1kLTEyIHRleHQtcmlnaHRcIiBzdHlsZT17e21hcmdpbkJvdHRvbTogJzIwcHgnfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICB7YWRkQnV0dG9ufVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtbWQtMTJcIj5cbiAgICAgICAgICAgICAgICAgICAge3RoaXMuc3RhdGUubWV0aG9kcy5tYXAoZnVuY3Rpb24obWV0aG9kKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gPE1vY2tNZXRob2QgY29udGV4dF9yb290PXt0aGlzLnByb3BzLmNvbnRleHRfcm9vdH0ga2V5PXttZXRob2QuX2lkICsgbWV0aG9kLmNvZGUgKyBtZXRob2QubWV0aG9kfSBtZXRob2Q9e21ldGhvZH0vPlxuICAgICAgICAgICAgICAgICAgICB9LmJpbmQodGhpcykpfVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgIH1cbn0pO1xuXG5cblxubW9kdWxlLmV4cG9ydHMgPSBNb2NrTWV0aG9kcztcbm1vZHVsZS5leHBvcnRzLk1vY2tNZXRob2QgPSBNb2NrTWV0aG9kO1xuIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbnZhciAkID0gcmVxdWlyZSgnanF1ZXJ5Jyk7XG52YXIgQ2xpcGJvYXJkID0gcmVxdWlyZSgnY2xpcGJvYXJkJyk7XG5cbnZhciBNb2NrTWV0aG9kcyA9IHJlcXVpcmUoJy4vTW9ja01ldGhvZHMuanN4Jyk7XG5cbnZhciBNb2Nrc0VkaXQgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cbiAgICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbW9jazogdGhpcy5wcm9wcy5tb2NrLFxuICAgICAgICAgICAgdXBkYXRlZDogZmFsc2UsXG4gICAgICAgICAgICBlcnJvcjogZmFsc2VcbiAgICAgICAgfTtcbiAgICB9LFxuXG4gICAgY29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICBuZXcgQ2xpcGJvYXJkKCcuY2xpcGJvYXJkQnV0dG9uJyk7XG4gICAgfSxcblxuICAgIHB1dEZvcm06IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIGlmICghdGhpcy5yZWZzLm5hbWUudmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBlcnJvcjogdHJ1ZSB9KTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvL1RPRE86IGNsZWFudXAgY29kZSwgbWV0aG9kLCBhbmQgZGF0YS4gRGVwcmVjYXRlZFxuXG4gICAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICAgICAgXCJuYW1lXCI6IHRoaXMucmVmcy5uYW1lLnZhbHVlLFxuICAgICAgICAgICAgXCJkZXNjcmlwdGlvblwiOiB0aGlzLnJlZnMuZGVzY3JpcHRpb24udmFsdWUsXG4gICAgICAgICAgICBcImF1dGhvclwiOiB0aGlzLnJlZnMuYXV0aG9yLnZhbHVlLFxuICAgICAgICAgICAgXCJjb21wb25lbnROYW1lXCI6IHRoaXMucmVmcy5jb21wb25lbnROYW1lLnZhbHVlLFxuICAgICAgICAgICAgXCJyZXNwb25zZURhdGFcIjogSlNPTi5zdHJpbmdpZnkoe1wibnVsbFwiOlwibnVsbH1cIn0pLFxuICAgICAgICAgICAgXCJjb21wb25lbnRQcm9kdWN0XCI6IHRoaXMucmVmcy5jb21wb25lbnRQcm9kdWN0LnZhbHVlLFxuICAgICAgICAgICAgXCJyZXNwb25zZUNvZGVcIjogMjAwLFxuICAgICAgICAgICAgXCJyZXNwb25zZU1ldGhvZFwiOiBcIkdFVFwiXG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIHVybCA9IHRoaXMucHJvcHMuY29udGV4dF9yb290ICsgJy9hcGkvbW9jay8nICsgdGhpcy5zdGF0ZS5tb2NrLl9pZDtcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdHlwZTogJ1BVVCcsXG4gICAgICAgICAgICB1cmw6IHVybCxcbiAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzcG9uc2Upe1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgICAgICB1cGRhdGVkOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBtb2NrOiByZXNwb25zZS5yZXN1bHRcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0uYmluZCh0aGlzKVxuICAgICAgICB9KTtcbiAgICB9LFxuXG4gICAgY2FuY2VsRm9ybTogZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vSnVzdCBwbGFpbiBuYXZpZ2F0ZSBiYWNrIHRvIHRoZSByb290XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9IHRoaXMucHJvcHMuY29udGV4dF9yb290ICsgJy9tb2Nrcyc7XG4gICAgfSxcblxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciB1cGRhdGVkID0gXCJcIjtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUudXBkYXRlZCkge1xuICAgICAgICAgICAgdXBkYXRlZCA9IDxzcGFuPlRoZSB1cGRhdGUgd2FzIHN1Y2Nlc3NmdWw8L3NwYW4+O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtbWQtMVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17e21hcmdpblRvcDogJzIwcHgnfX0gb25DbGljaz17dGhpcy5jYW5jZWxGb3JtfSB0eXBlPVwic3VibWl0XCIgY2xhc3NOYW1lPVwiYnRuIGJ0bi1zZWNvbmRhcnlcIj5CYWNrPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1tZC0xMVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGgxPlVwZGF0ZSB7dGhpcy5wcm9wcy5tb2NrLm5hbWV9PC9oMT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaW5wdXQtZ3JvdXBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgaWQ9XCJlbmRwb2ludFVSTFwiIGNsYXNzTmFtZT1cImZvcm0tY29udHJvbCBlbmRwb2ludFVSTFwiIHR5cGU9XCJ0ZXh0XCIgdmFsdWU9e3RoaXMucHJvcHMuY29udGV4dF9yb290ICsgJy9tb2NrYXBpL21vY2svJyArIHRoaXMuc3RhdGUubW9jay5faWR9IHJlYWRPbmx5PjwvaW5wdXQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJpbnB1dC1ncm91cC1idG5cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLWRlZmF1bHQgY2xpcGJvYXJkQnV0dG9uXCIgZGF0YS1jbGlwYm9hcmQtdGFyZ2V0PVwiI2VuZHBvaW50VVJMXCI+Q29weTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cD48L3A+XG5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGhyLz5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1tZC02XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aDM+QmFzaWNzPC9oMz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPkVudGVyIHNvbWUgaWRlbnRpZnlpbmcgaW5mb3JtYXRpb248L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgaHRtbEZvcj1cIm1vY2tOYW1lXCI+TmFtZTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCIgaWQ9XCJtb2NrTmFtZVwiIHBsYWNlaG9sZGVyPVwiTmFtZSAoUkVRVUlSRUQpXCIgcmVmPVwibmFtZVwiIG5hbWU9XCJuYW1lXCIgZGVmYXVsdFZhbHVlPXt0aGlzLnByb3BzLm1vY2submFtZX0gcmVxdWlyZWQ+PC9pbnB1dD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGh0bWxGb3I9XCJtb2NrRGVzY3JpcHRpb25cIj5EZXNjcmlwdGlvbjwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCIgaWQ9XCJtb2NrRGVzY3JpcHRpb25cIiBwbGFjZWhvbGRlcj1cIkRlc2NyaXB0aW9uXCIgcmVmPVwiZGVzY3JpcHRpb25cIiBkZWZhdWx0VmFsdWU9e3RoaXMucHJvcHMubW9jay5tZXRhZGF0YS5kZXNjcmlwdGlvbn0gbmFtZT1cImRlc2NyaXB0aW9uXCI+PC9pbnB1dD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGh0bWxGb3I9XCJtb2NrQXV0aG9yXCI+QXV0aG9yIEVtYWlsPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIiBpZD1cIm1vY2tBdXRob3JcIiBwbGFjZWhvbGRlcj1cIkF1dGhvciBFbWFpbFwiIHJlZj1cImF1dGhvclwiIG5hbWU9XCJhdXRob3JcIiBkZWZhdWx0VmFsdWU9e3RoaXMucHJvcHMubW9jay5tZXRhZGF0YS5hdXRob3J9PjwvaW5wdXQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLW1kLTZcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxoMz5Db21wb25lbnQgSW5mbzwvaDM+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cD5FbnRlciBzb21lIGluZm9ybWF0aW9uIGFib3V0IHRoZSBjb21wb25lbnQgdGhpcyBkYXRhIGlzIGdvaW5nIHRvIGJlIHVzZWQgZm9yPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGh0bWxGb3I9XCJtb2NrQ29tcG9uZW50TmFtZVwiPkNvbXBvbmVudCBOYW1lPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIiBpZD1cIm1vY2tDb21wb25lbnROYW1lXCIgcGxhY2Vob2xkZXI9XCJDb21wb25lbnQgTmFtZVwiIHJlZj1cImNvbXBvbmVudE5hbWVcIiBuYW1lPVwiY29tcG9uZW50TmFtZVwiIGRlZmF1bHRWYWx1ZT17dGhpcy5wcm9wcy5tb2NrLmNvbXBvbmVudC5uYW1lfT48L2lucHV0PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgaHRtbEZvcj1cIm1vY2tDb21wb25lbnRQcm9kdWN0XCI+UHJvZHVjdDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCIgaWQ9XCJtb2NrQ29tcG9uZW50UHJvZHVjdFwiIHBsYWNlaG9sZGVyPVwiUHJvZHVjdCBOYW1lXCIgcmVmPVwiY29tcG9uZW50UHJvZHVjdFwiIG5hbWU9XCJjb21wb25lbnRQcm9kdWN0XCIgZGVmYXVsdFZhbHVlPXt0aGlzLnByb3BzLm1vY2suY29tcG9uZW50LnByb2R1Y3R9PjwvaW5wdXQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtbWQtMTIgdGV4dC1yaWdodFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGhyLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17dGhpcy5wdXRGb3JtfSB0eXBlPVwic3VibWl0XCIgY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5XCI+VXBkYXRlPC9idXR0b24+ICZuYnNwO1xuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXt0aGlzLmNhbmNlbEZvcm19IHR5cGU9XCJzdWJtaXRcIiBjbGFzc05hbWU9XCJidG4gYnRuLXNlY29uZGFyeVwiPkNhbmNlbDwvYnV0dG9uPiB7dXBkYXRlZH1cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtbWQtMTJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGgzPkVuZHBvaW50IFZFUkJTPC9oMz5cbiAgICAgICAgICAgICAgICAgICAgPHA+QmVsb3cgeW91IHdpbGwgZmluZCB2ZXJicyBhc3NvY2lhdGVkIHdpdGggdGhpcyBlbmRwb2ludDwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxNb2NrTWV0aG9kcyBjb250ZXh0X3Jvb3Q9e3RoaXMucHJvcHMuY29udGV4dF9yb290fSBtb2NrPXt0aGlzLnN0YXRlLm1vY2t9IG1ldGhvZHM9e3RoaXMucHJvcHMubWV0aG9kc30vPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gTW9ja3NFZGl0O1xuIiwidmFyIE1vY2tzRWRpdCA9IHJlcXVpcmUoJy4vanN4L01vY2tzRWRpdC5qc3gnKTtcblxudmFyIG1vY2tzID0gUmVhY3QuY3JlYXRlRWxlbWVudChNb2Nrc0VkaXQgLHtcbiAgICBjb250ZXh0X3Jvb3Q6IENPTlRFWFRfUk9PVC5pbm5lckhUTUwsXG4gICAgbW9jazogSlNPTi5wYXJzZShjdXJyZW50TW9jay5pbm5lckhUTUwpLFxuICAgIG1ldGhvZHM6IEpTT04ucGFyc2UoY3VycmVudE1ldGhvZHMuaW5uZXJIVE1MKVxufSk7XG5SZWFjdERPTS5yZW5kZXIobW9ja3MsIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZWFjdENvbnRhaW5lcicpKTtcbiJdfQ==
