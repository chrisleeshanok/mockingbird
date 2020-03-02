var React = require('react');
var $ = require('jquery');
var Clipboard = require('clipboard');

var MockMethods = require('./MockMethods.jsx');

var MocksEdit = React.createClass({

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
            updated = <span>The update was successful</span>;
        }

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-1">
                        <button style={{marginTop: '20px'}} onClick={this.cancelForm} type="submit" className="btn btn-secondary">Back</button>
                    </div>
                    <div className="col-md-11">
                        <h1>Update {this.props.mock.name}</h1>
                        <div className="input-group">
                            <input id="endpointURL" className="form-control endpointURL" type="text" value={this.props.context_root + '/mockapi/mock/' + this.state.mock._id} readOnly></input>
                            <div className="input-group-btn">
                                <button className="btn btn-default clipboardButton" data-clipboard-target="#endpointURL">Copy</button>
                            </div>
                        </div>
                        <p></p>

                    </div>
                </div>
                <hr/>
                <div className="row">
                    <div className="col-md-6">
                        <h3>Basics</h3>
                        <p>Enter some identifying information</p>
                        <div className="form-group">
                            <label htmlFor="mockName">Name</label>
                            <input type="text" className="form-control" id="mockName" placeholder="Name (REQUIRED)" ref="name" name="name" defaultValue={this.props.mock.name} required></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="mockDescription">Description</label>
                            <input type="text" className="form-control" id="mockDescription" placeholder="Description" ref="description" defaultValue={this.props.mock.metadata.description} name="description"></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="mockAuthor">Author Email</label>
                            <input type="text" className="form-control" id="mockAuthor" placeholder="Author Email" ref="author" name="author" defaultValue={this.props.mock.metadata.author}></input>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <h3>Component Info</h3>
                        <p>Enter some information about the component this data is going to be used for</p>
                        <div className="form-group">
                            <label htmlFor="mockComponentName">Component Name</label>
                            <input type="text" className="form-control" id="mockComponentName" placeholder="Component Name" ref="componentName" name="componentName" defaultValue={this.props.mock.component.name}></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="mockComponentProduct">Product</label>
                            <input type="text" className="form-control" id="mockComponentProduct" placeholder="Product Name" ref="componentProduct" name="componentProduct" defaultValue={this.props.mock.component.product}></input>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 text-right">
                        <hr/>
                        <button onClick={this.putForm} type="submit" className="btn btn-primary">Update</button> &nbsp;
                        <button onClick={this.cancelForm} type="submit" className="btn btn-secondary">Cancel</button> {updated}
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                    <h3>Endpoint VERBS</h3>
                    <p>Below you will find verbs associated with this endpoint</p>
                        <MockMethods context_root={this.props.context_root} mock={this.state.mock} methods={this.props.methods}/>
                    </div>
                </div>

            </div>
        );
    }
});

module.exports = MocksEdit;
