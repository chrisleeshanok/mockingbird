var React = require('react');
var $ = require('jquery');

var MockMethod = React.createClass({

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
                <div style={{marginBottom: '40px'}}>
                    <div className="row">
                        <div className="col-md-6"><h4>Edit {this.state.method.method} | {this.state.method.code}</h4></div>
                        <div className="col-md-6 text-right">
                            <button className="btn btn-primary" onClick={this.putUpdate}>Save</button>&nbsp;
                            <button className="btn btn-default" onClick={this.toggleEditMode}>Cancel</button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <label htmlFor={"methodResponseData" + this.state.method.method}></label>
                            <textarea className="form-control json-field" id={"methodResponseData" + this.state.method.method} ref="responseData" defaultValue={JSON.stringify(this.state.method.data)}>
                            </textarea>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <h4>Mock Response Code</h4>
                            <p>Choose a response code to return</p>
                            <div className="row">
                                <div className="col-md-12">
                                    <select id={"selectCodeMenu" + this.state.method.method} ref="selectCodeMenu">
                                        <option value="200">200</option>
                                        <option value="201">201</option>
                                        <option value="202">202</option>
                                        <option value="203">203</option>
                                        <option value="204">204</option>
                                        <option value="205">205</option>
                                        <option value="206">206</option>
                                        <option value="300">300</option>
                                        <option value="301">301</option>
                                        <option value="302">302</option>
                                        <option value="303">303</option>
                                        <option value="304">304</option>
                                        <option value="305">305</option>
                                        <option value="306">306</option>
                                        <option value="307">307</option>
                                        <option value="400">400</option>
                                        <option value="401">401</option>
                                        <option value="403">403</option>
                                        <option value="404">404</option>
                                        <option value="405">405</option>
                                        <option value="407">407</option>
                                        <option value="408">408</option>
                                        <option value="409">409</option>
                                        <option value="410">410</option>
                                        <option value="411">411</option>
                                        <option value="412">412</option>
                                        <option value="413">413</option>
                                        <option value="414">414</option>
                                        <option value="415">415</option>
                                        <option value="416">416</option>
                                        <option value="417">417</option>
                                        <option value="500">500</option>
                                        <option value="501">501</option>
                                        <option value="503">503</option>
                                        <option value="504">504</option>
                                        <option value="505">505</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <h4>Mock Response Delay (ms)</h4>
                            <p><em>Currently not available</em></p>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div style={{marginBottom: '40px'}}>
                    <div className="row">
                        <div className="col-md-6"><h4>{this.state.method.method} | {this.state.method.code}</h4></div>
                        <div className="col-md-6 text-right"><button className="btn btn-warning" onClick={this.toggleEditMode}>Edit</button></div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <label htmlFor={"methodResponseData" + this.state.method.method}></label>
                            <textarea className="form-control json-field" id={"methodResponseData" + this.state.method.method} ref="responseData" value={JSON.stringify(this.state.method.data)} readOnly>
                            </textarea>
                        </div>
                    </div>
                </div>
            );
        }
    }
});

var MockMethods = React.createClass({

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
            return <option value={verb.verb}>{verb.verb}</option>;
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
                <div className="row">
                    <div className="col-md-12 text-right" style={{marginBottom: '20px'}}>
                        <select id="selectVerbMenu" ref="selectVerbMenu">
                            {this.generateVerbOptions()}
                        </select>&nbsp;
                        <button className="btn btn-primary" onClick={this.postVerb}>Create</button>&nbsp;
                        <button className="btn btn-default" onClick={this.toggleAddMode}>Cancel</button>
                    </div>
                    <div className="col-md-12">
                    {this.state.methods.map(function(method) {
                        return <MockMethod context_root={this.props.context_root} key={method._id + method.code + method.method} method={method}/>
                    }.bind(this))}
                    </div>
                </div>
            );
        } else {

            var addButton = "";
            if (this.generateVerbOptions().length > 0) {
                addButton = <button className="btn btn-primary" onClick={this.toggleAddMode}>Add New Verb</button>;
            }

            return (
                <div className="row">
                    <div className="col-md-12 text-right" style={{marginBottom: '20px'}}>
                        {addButton}
                    </div>
                    <div className="col-md-12">
                    {this.state.methods.map(function(method) {
                        return <MockMethod context_root={this.props.context_root} key={method._id + method.code + method.method} method={method}/>
                    }.bind(this))}
                    </div>
                </div>
            );
        }

    }
});



module.exports = MockMethods;
module.exports.MockMethod = MockMethod;
