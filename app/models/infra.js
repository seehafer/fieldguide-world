var mongoose = require('mongoose'),
  _ = require('underscore')._,
  Schema = mongoose.Schema;

var InfraSchema = new Schema({
  name: String,
  photo_url: String,
  description: String,
  fun_fact: String,
  type: String
});

InfraSchema.virtual('date')
  .get(function(){
    return this._id.getTimestamp();
  });

InfraSchema.statics.types = [
  {id: 'plumbing', name: 'Plumbing and Waterworks'},
  {id: 'food', name: 'Food'},
  {id: 'roadways', name: 'Roadways'},
  {id: 'power', name: 'Power Grid'},
  {id: 'telephony', name: 'Communication'}
]

mongoose.model('Infra', InfraSchema);
