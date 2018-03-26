var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var StreamsSchema = new Schema({
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

var Streams = mongoose.model("Streams", StreamsSchema);

module.exports = Streams;