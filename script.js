const mongoose = require('mongoose')
require('dotenv').config()

const User = require('./schema/User')

var ATLAS_URI = process.env.ATLAS_URL;
//'mongodb+srv://<username>:<pass>@<cluster.dnsname>.mongodb.net/crashCourse';
console.log( process.env.ATLAS_URL);

mongoose.connect(
    ATLAS_URI
    // , () => { console.log('connected');}  // throw new MongooseError('Mongoose.prototype.connect() no longer accepts a callback');
    // , e => console.error(e) 
    )

const db = mongoose.connection

db.once('open', () => {  //Do it just one time
    console.log('Successfully connected to Mongo')
})
db.on('error', (e) => {  //DO it everytime detects an error 7888989
    console.error('Error connecting/processing ');
    console.log( e );
})

// ## FINDALL (initial testing)
findAll();


// ## CREATE
//storeUser()
// storeUser2()

// ## FIND
// findElem();
// findElem2();

async function findAll(){
    const users = await User.find();
    console.log(users);
    console.log(`  >>  ${users.length} users on collection: user << `);
}

async function findElem2(){
    /*  Testing extended functionality (methods, statics, query) */
    // const user = await User.findOne({fullName:'Kyle'});
    // console.log(user);
    // user.sayHi()

    // const user = await User.findByName('Kyle')
    // console.log(user);
    // user[0].sayHi()

    // const user = await User.find().byName('Sally')
    // const user = await User.where().byName('Sally')
    // console.log(user);

    const user = await User.findOne({email: {$exists:true}});
    console.log(user);
    //console.log(user.namedEmail);
    // await user.save()

}

async function findElem() {
    try {
        const user =
        // await User.findById('651c1a3f001613009a640906');
        // await User.findOne({fullName:'x'});  //find, findOne, exists , *deleteOne

        ///Via Query
        await User.where('age').gt(26).lt(33)
        .where('fullName').equals('Sally').ne('Kyle')
        .populate('bestFriend')    // Acts like JOIN
        .limit(1)
        .select('age fullName bestFriend')
         //651b31cf9092397c7cb42043

        console.log(user); 

    } catch (e) {
        console.log(e.message);
    }
}

async function storeUser2(){
    try {
        const user = await User.create({
            fullName: "Kyle",
            email: 'TEST@mail.com',
            age: 17 ,
            hobbies: ["Weight Lifting", "Bowling"],
            address: {street:"Main St "}
        })
        user.bestFriend = '651b31cf9092397c7cb42043'
        await user.save();

        console.log(`user: ${user}`); 
    } catch ( e ) {
        console.error(e.message);
        //console.log(e.errors.age);
    }
}

async function storeUser(){
    /* / Method 1
    const user = new User({fullName:'Kyle', age: 31 })
    await user.save().then( () => console.log('User saved') ) // */
    // * Method 2:
    const user = await User.create({fullName:'Kyle', age: 32 })// */
    console.log(`user: ${user}`);

    // Update
    user.fullName = 'Sally'
    await user.save()
}

