var React = require('react');
var $ = require('jquery');

var MocksCreate = React.createClass({

    getInitialState: function() {
        return {
            error: false,
            created: false,
            createdMock: null
        };
    },

    postForm: function() {

        if (!(this.refs.name.value && this.refs.responseData.value)) {
            this.setState({ error: true });
            return;
        }

        var responseCode = $('input[name=responseCode]:checked').val();
        var responseMethod = $('input[name=responseMethod]:checked').val();

        var data = {
            "name": this.refs.name.value,
            "description": this.refs.description.value,
            "author": this.refs.author.value,
            "componentName": this.refs.componentName.value,
            "responseData": this.refs.responseData.value,
            "componentProduct": this.refs.componentProduct.value,
            "responseCode": responseCode,
            "responseMethod": responseMethod
        };

        $.ajax({
            type: 'POST',
            url: '/mockingbird/api/mock',
            data: data,
            dataType: 'json',
            success: function(response){
                this.setState({
                    created: true,
                    createdMock: response.result
                });
            }.bind(this)
        });
    },

    cancelForm: function() {
        window.location = this.props.context_root + '/mocks';
    },

    render: function() {

        if (this.state.created) {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col-12-12">
                            <h1>Success!</h1>
                            <p>We've created a mock api endpoint for you!</p>
                            <hr/>
                            <p>To access the endpoint, visit the URL below:</p>
                            <p>
                                <a href={this.props.context_root + '/mockapi/mock/' + this.state.createdMock._id}>
                                    {this.props.context_root}/mockapi/mock/{this.state.createdMock._id
                                }</a>
                            </p>
                            <p>OR</p>
                            <p>Hit it with a {this.state.createdMock.response.method} request from your app.</p>
                            <hr/>
                            <h4>IMPORTANT</h4>
                            <p><strong>NEVER</strong> ever ever rely on this endpoint for production applications. Consider it volatile.</p>
                            <hr/>
                            <a href={this.props.context_root + '/mocks'}><button className="btn btn-primary">Back to List</button></a>&nbsp;
                            <a href={this.props.context_root + '/mocks/edit/' + this.state.createdMock._id}><button className="btn btn-success">Edit this Mock</button></a>
                        </div>
                    </div>
                </div>
            );
        } else {
            var error = "";
            if (this.state.error) {
                error = <span>You must complete all required fields</span>;
            }

            var defaultJSON = {
                "code": 200,
                "status": "success",
                "message": "The call succeeded"
            };

            return (
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1>Create new mock</h1>
                            <hr/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <h3>Basics</h3>
                            <p>Enter some identifying information</p>
                            <div className="form-group">
                                <label htmlFor="mockName">Name</label>
                                <input type="text" className="form-control" id="mockName" placeholder="Name (REQUIRED)" ref="name" name="name" required></input>
                            </div>
                            <div className="form-group">
                                <label htmlFor="mockDescription">Description</label>
                                <input type="text" className="form-control" id="mockDescription" placeholder="Description" ref="description" name="description"></input>
                            </div>
                            <div className="form-group">
                                <label htmlFor="mockAuthor">Author Email</label>
                                <input type="text" className="form-control" id="mockAuthor" placeholder="Author Email" ref="author" name="author"></input>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <h3>Component Info</h3>
                            <p>Enter some information about the component this data is going to be used for</p>
                            <div className="form-group">
                                <label htmlFor="mockComponentName">Component Name</label>
                                <input type="text" className="form-control" id="mockComponentName" placeholder="Component Name" ref="componentName" name="componentName"></input>
                            </div>
                            <div className="form-group">
                                <label htmlFor="mockComponentProduct">Product</label>
                                <input type="text" className="form-control" id="mockComponentProduct" placeholder="Product Name" ref="componentProduct" name="componentProduct"></input>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <h3>Base Response Data</h3>
                            <p>Enter <strong>VALID</strong> JSON below. This is the data that your endpoint will return as a JSON response.</p>
                            <p>Note: Current lack of a validator will cause your request to fail.</p>
                            <div className="form-group">
                                <label htmlFor="mockResponseData">Response Data (REQUIRED)</label>
                                <textarea className="form-control json-field-edit" id="mockResponseData" placeholder="Enter valid JSON here" ref="responseData" name="responseData" defaultValue={JSON.stringify(defaultJSON)}>
                                </textarea>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <h4>Mock Response Code</h4>
                            <p>Choose a response code to return</p>
                            <div className="row">
                                <div className="col-md-12">
                                    <label className="inline-radio">
                                      <input name="responseCode" type="radio" id="response200" value="200" defaultChecked="true"></input> 200
                                    </label>
                                    <label className="inline-radio">
                                      <input name="responseCode" type="radio" id="response201" value="201"></input> 201
                                    </label>
                                    <label className="inline-radio">
                                      <input name="responseCode" type="radio" id="response202" value="202"></input> 202
                                    </label>
                                    <label className="inline-radio">
                                      <input name="responseCode" type="radio" id="response203" value="203"></input> 203
                                    </label>
                                    <label className="inline-radio">
                                      <input name="responseCode" type="radio" id="response204" value="204"></input> 204
                                    </label>
                                    <label className="inline-radio">
                                      <input name="responseCode" type="radio" id="response205" value="205"></input> 205
                                    </label>
                                    <label className="inline-radio">
                                      <input name="responseCode" type="radio" id="response206" value="206"></input> 206
                                    </label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <label className="inline-radio">
                                      <input name="responseCode" type="radio" id="response300" value="300"></input> 300
                                    </label>
                                    <label className="inline-radio">
                                      <input name="responseCode" type="radio" id="response301" value="301"></input> 301
                                    </label>
                                    <label className="inline-radio">
                                      <input name="responseCode" type="radio" id="response302" value="302"></input> 302
                                    </label>
                                    <label className="inline-radio">
                                      <input name="responseCode" type="radio" id="response303" value="303"></input> 303
                                    </label>
                                    <label className="inline-radio">
                                      <input name="responseCode" type="radio" id="response304" value="304"></input> 304
                                    </label>
                                    <label className="inline-radio">
                                      <input name="responseCode" type="radio" id="response305" value="305"></input> 305
                                    </label>
                                    <label className="inline-radio">
                                      <input name="responseCode" type="radio" id="response307" value="307"></input> 307
                                    </label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <label className="inline-radio">
                                      <input name="responseCode" type="radio" id="response400" value="400"></input> 400
                                    </label>
                                    <label className="inline-radio">
                                      <input name="responseCode" type="radio" id="response401" value="401"></input> 401
                                    </label>
                                    <label className="inline-radio">
                                      <input name="responseCode" type="radio" id="response403" value="403"></input> 403
                                    </label>
                                    <label className="inline-radio">
                                      <input name="responseCode" type="radio" id="response404" value="404"></input> 404
                                    </label>
                                    <label className="inline-radio">
                                      <input name="responseCode" type="radio" id="response405" value="405"></input> 405
                                    </label>
                                    <label className="inline-radio">
                                      <input name="responseCode" type="radio" id="response407" value="407"></input> 407
                                    </label>
                                    <label className="inline-radio">
                                      <input name="responseCode" type="radio" id="response408" value="408"></input> 408
                                    </label>
                                    <label className="inline-radio">
                                      <input name="responseCode" type="radio" id="response409" value="409"></input> 409
                                    </label>
                                    <label className="inline-radio">
                                      <input name="responseCode" type="radio" id="response410" value="410"></input> 410
                                    </label>
                                    <label className="inline-radio">
                                      <input name="responseCode" type="radio" id="response411" value="411"></input> 411
                                    </label>
                                    <label className="inline-radio">
                                      <input name="responseCode" type="radio" id="response412" value="412"></input> 412
                                    </label>
                                    <label className="inline-radio">
                                      <input name="responseCode" type="radio" id="response413" value="413"></input> 413
                                    </label>
                                    <label className="inline-radio">
                                      <input name="responseCode" type="radio" id="response414" value="414"></input> 414
                                    </label>
                                    <label className="inline-radio">
                                      <input name="responseCode" type="radio" id="response415" value="415"></input> 415
                                    </label>
                                    <label className="inline-radio">
                                      <input name="responseCode" type="radio" id="response416" value="416"></input> 416
                                    </label>
                                    <label className="inline-radio">
                                      <input name="responseCode" type="radio" id="response417" value="417"></input> 417
                                    </label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <label className="inline-radio">
                                      <input name="responseCode" type="radio" id="response500" value="500"></input> 500
                                    </label>
                                    <label className="inline-radio">
                                      <input name="responseCode" type="radio" id="response501" value="501"></input> 501
                                    </label>
                                    <label className="inline-radio">
                                      <input name="responseCode" type="radio" id="response503" value="503"></input> 503
                                    </label>
                                    <label className="inline-radio">
                                      <input name="responseCode" type="radio" id="response504" value="504"></input> 504
                                    </label>
                                    <label className="inline-radio">
                                      <input name="responseCode" type="radio" id="response505" value="505"></input> 505
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <h4>Mock Response Method</h4>
                            <label className="inline-radio">
                              <input name="responseMethod" type="radio" id="responseGET" value="GET" defaultChecked="true"></input> GET
                            </label>
                            <label className="inline-radio">
                              <input name="responseMethod" type="radio" id="responsePOST" value="POST"></input> POST
                            </label>
                            <label className="inline-radio">
                              <input name="responseMethod" type="radio" id="responsePUT" value="PUT"></input> PUT
                            </label>
                            <label className="inline-radio">
                              <input name="responseMethod" type="radio" id="responsePATCH" value="PATCH"></input> PATCH
                            </label>
                            <label className="inline-radio">
                              <input name="responseMethod" type="radio" id="responseOPTIONS" value="OPTIONS"></input> OPTIONS
                            </label>
                            <label className="inline-radio">
                              <input name="responseMethod" type="radio" id="responseDELETE" value="DELETE"></input> DELETE
                            </label>
                            <br/>
                            <h4>Mock Response Delay (ms)</h4>
                            <p><em>Currently not available</em></p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <hr/>
                            <button onClick={this.postForm} type="submit" className="btn btn-primary">Create</button> &nbsp;
                            <button onClick={this.cancelForm} type="submit" className="btn btn-secondary">Cancel</button> {error}
                        </div>
                    </div>
                </div>
            );
        }
    }
});

module.exports = MocksCreate;
