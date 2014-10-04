var mongoose = require('mongoose'),
  _ = require('underscore')._,
  Schema = mongoose.Schema;

var BirdSchema = new Schema({
  name: String,
  photo_url: String,
  description: String,
  commonality: Number,
  fun_fact: String,
  color: Array,
  size: String
});

BirdSchema.virtual('date')
  .get(function(){
    return this._id.getTimestamp();
  });

BirdSchema.statics.colors = function (cb) {
  this.find({}, {'color': 1, '_id': 0}, function (err, birds) {
    if (err) {
      cb(err);
    } else {
      console.log(birds);
      var colors = _(birds).chain().pluck('color').flatten().uniq().value();
      cb(null, colors);
    }
  });
}

mongoose.model('Bird', BirdSchema);
