const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const membersSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    required: false,
    status: Boolean,
  },
});

const Members = mongoose.model("members", membersSchema);
module.exports = Members;
