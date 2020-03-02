var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var methodDataScheme = new Schema({
    endpointId: Schema.Types.ObjectId,
    method: { type: String, required: true },
    code: { type: String, required: true },
    data: { type: Object, required: true },
    created: { type: Date },
    modified: { type: Date }
});

methodDataScheme.pre('save', function(next) {
    var currentDate = new Date();
    this.modified = currentDate;

    if (!this.created) {
        this.created = currentDate;
    }

    //The following must be invoked
    next();
});

var Method = mongoose.model('Method', methodDataScheme);

module.exports = Method;
