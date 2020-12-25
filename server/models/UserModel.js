const mongoose = require('mongoose'),
     bcrypt = require('bcrypt'),
     Schema = mongoose.Schema,
     SALT_FACTOR = 10;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
}, {collection: "user" })

UserSchema.pre('save', function (next) {
    const user = this;

    bcrypt.hash(user.password, SALT_FACTOR, function(err, hash) {
        user.password = hash;
        next();
    });
});

// UserSchema.methods.comparePassword = function (candidatePassword, cb) {
//     bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
//         if (err) { return cb(err); }
//         cb(null, isMatch);
//     });
// };

module.exports = mongoose.model('user', UserSchema);
