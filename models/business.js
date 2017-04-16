var mongoose = require('mongoose')
// var bcrypt = require('bcrypt')
var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

var bizSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: emailRegex
  },
  // description: {
  //   type: String,
  //   required: true,
  //   minlength: [100, 'Name must be between 100 to 1000 characters'],
  //   maxlength: [1000, 'Name must be between 100 to 1000 characters']
  // },
  // password: {
  //   type: String,
  //   required: true,
  //   minlength: [8, 'Name must be between 8 to 99 characters'],
  //   maxlength: [99, 'Name must be between 8 to 99 characters']
  // },
  // password2: {
  //   type: String,
  //   required: true,
  //   minlength: [8, 'Name must be between 8 to 99 characters'],
  //   maxlength: [99, 'Name must be between 8 to 99 characters']
  // },
  restaurant_name: {
    type: String,
    required: true,
    minlength: [3, 'Name must be between 8 to 99 characters'],
    maxlength: [99, 'Name must be between 8 to 99 characters']
  },
  nealicense: {
    type: Number,
    required: true
    // minlength: [8, 'Name must be between 8 to 99 characters'],
    // maxlength: [99, 'Name must be between 8 to 99 characters']
  },
  address: {
    type: String,
    required: true,
    minlength: [8, 'Name must be between 8 to 99 characters'],
    maxlength: [99, 'Name must be between 8 to 99 characters']
  },
  cuisine: {
    type: String,
    required: true,
    minlength: [3, 'Name must be between 8 to 99 characters'],
    maxlength: [99, 'Name must be between 8 to 99 characters']
  }
})


// bizSchema.pre('save', function(next) {
//    var user = this;
//
//    // Only hash the password if it has been modified (or is new)
//    if (!user.isModified('password')) return next();
//
//    //hash the password
//    var hash = bcrypt.hashSync(user.password, 10);
// // console.log('original password', user.password)
// // console.log('hashed password', hash)
//    // Override the cleartext password with the hashed one
//    user.password = hash;
//    next();
// });
//
// userSchema.methods.validPassword = function(password) {
//   // Compare is a bcrypt method that will return a boolean,
//   return bcrypt.compareSync(password, this.password);
// };
//
// userSchema.options.toJSON = {
//     transform: function(doc, ret, options) {
//         // delete the password from the JSON data, and return
//         delete ret.password;
//         return ret;
//     }
// }

var Biz = mongoose.model('Biz', bizSchema)

module.exports = Biz
