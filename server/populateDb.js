const Message = require("./model/Message");
const User = require("./model/User");
const { faker } = require("@faker-js/faker");
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs')
require("dotenv").config();


main().catch((err) => console.log(err));
async function main() {
  const dbName = process.env.DBName;
  const connectDb = await mongoose.connect(process.env.MONGO_URI).dbName;
  const hashedpassword = await bcrypt.hash("faker123", 10)
  const users = createUsers(100, hashedpassword);
  const allUsers = await User.insertMany(users) 
  let userId = []
  await allUsers.forEach(item => {
      userId.push(item._id);
  })

  for(let i = 0; i < userId.length; i++){

    //create a message with the userid
    //then sends it to the database
     await Message.create(new MessageObj(userId[i]))
  }
 
  await mongoose.connection.close().then(console.log("successfully populated"))

}

function createUsers(num, password) {
  const arr = [];

  for (let i = 0; i < num; i++) {
    arr.push(new UserObj(password));
  }

  return arr;
}

function createMessages(num, id) {
    const arr = [];
  
    for (let i = 0; i < num; i++) {
      arr.push(new MessageObj(id));
    }
  
    return arr;
  }

function createUserandMessage(num){
    const user = createUsers(num);
    let userId = []
    user.forEach(item => {
        userId.push(item._id);
    })

    var randomUserId = userId[Math.floor(Math.random()*userId.length)];

   
    createMessages(num, randomUserId)
}

class UserObj {

    constructor(password){
        this.password = password
            }
  first_name = faker.person.firstName();
  last_name = faker.person.lastName();
  email = faker.internet.email({
    firstName: this.first_name,
    lastName: this.last_name,
  });
  password = this.password;
}
//create a umessage object
class MessageObj {
  
    
    constructor(author){
        this.author= author
            }
            
            author = this.author
    title = faker.word.words({count:{ min: 3, max: 5}})
    text = faker.word.words({count:{ min: 3, max: 40}})
}

