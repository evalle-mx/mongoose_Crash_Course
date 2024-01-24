const mongoose = require('mongoose')
 
const addressSchema = new mongoose.Schema({
    street: String,
    city: String,
})

const userSchema = new mongoose.Schema({
    fullName: String,
    age: {
        type:Number, min:6, max:99,
        validate: {
            // validator: v => v % 2 ===0,  // Even number only
            validator: v => v>17,   //adult
            message: props => `${props.value} is under minimal age`
        }
    },
    email: {
        type: String, 
        minLength: 10,
        required: true,
        lowercase:true,
    },
    createdAt: {
        type: Date,
        immutable:true,
        default: () => Date.now(),
    },
    updatedAt: {
        type: Date,
        default: () => Date.now(),
    },
    bestFriend:  {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    },
    hobbies: [String],
    // address: {
    //     street: String,
    //     city: String
    // }
    address: addressSchema,
});

// Methods
userSchema.methods.sayHi = function () {  // arrow fn (=>) is not allowed in mongoose
    console.log(`Hi, my name is ${this.fullName}`);
}
//Generates an static method
userSchema.statics.findByName = function(aName) {
    return this.find( {fullName: new RegExp(aName, 'i')} )   // i for case insensitive on RegExp
}

//Extends query functionality into the schema
userSchema.query.byName = function(aName) {
    return this.where( {fullName: new RegExp(aName, 'i')} )   // i for case insensitive on RegExp
}

//Virtual fields created on the fly, but not stored
userSchema.virtual('namedEmail').get(function() {
    return `${this.fullName} <${this.email}>`;
})


//MIDDLEWARE (functionality applied to save, validate & remove )
userSchema.pre('save', function (next) {
    this.updatedAt = Date.now()
    //throw new Error('Simulted fail')
    next()
})
userSchema.post('save', function (doc, next) {
    doc.sayHi()
    next()
})
// module.exports = mongoose.model('User', userSchema ) 
module.exports = mongoose.model('Crash-user', userSchema ) 
