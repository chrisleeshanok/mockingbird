var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var mockDataSchema = new Schema({
    name: { type: String, required: true },
    component: {
        id: { type: String },
        name: { type: String },
        product: { type: String }
    },
    metadata: {
        author: { type: String },
        description: { type: String }
    },
    created: { type: Date },
    modified: { type: Date },
    response: {
        method: { type: String },
        data: { type: Object, required: true },
        code: { type: Number },
        delay: { type: Number }
    }
});

//Set the created date and last modified date
mockDataSchema.pre('save', function(next) {

    var currentDate = new Date();
    this.modified = currentDate;

    if (!this.created) {
        this.created = currentDate;
    }

    //The following must be invoked
    next();
});

var Mock = mongoose.model('Mock', mockDataSchema);

module.exports = Mock;
