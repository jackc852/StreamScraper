var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var StreamLinkSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    note: {
        type: Schema.Types.ObjectId,
        ref: "Note"
    }
});

var StreamLink = mongoose.model("Stream Link", StreamLinkSchema);

module.exports = StreamLink;