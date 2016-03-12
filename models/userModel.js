var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username:String,
  password:String,
  registerTime:{ type: Date, default: Date.now}
});
exports.User = mongoose.model('user', userSchema);
