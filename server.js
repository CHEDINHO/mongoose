const express = require('express');

const app = express();

app.use(express.json());

require("dotenv").config();

const PORT = process.env.PORT || 5010;

app.listen(PORT,(err)=>{
    err? console.log(err) 
    : console.log(`Server is running on port http://127.0.0.1:${PORT}`)



})
 
const connect = require ('./connectDB/connectDB')
  

connect();

const mongoose = require("mongoose");

const  personSchema = new mongoose.Schema({
    name:{type: String, required: true},
    age: Number,
    email:{type: String, required: true, unique: true},
    favoriteFoods : [String]
},{collection:'person'}
);


const Person =  mongoose.model('Person',personSchema);

const personarray =[{
    name: "Joff",
    age: 30,
    email: "jdo7e@example.com",
    favoriteFoods: ["Pizza", "Burger"],
},{
    name: "Joe",
    age: 30,
    email: "j7e@example.com",
    favoriteFoods: ["Pizza", "Burger"],
}];


const createPersonArray = async (personarray) => {

    try{
  const savedPerson=  await Person.insertMany(personarray);
    console.log('Person saved:', savedPerson )
    }
    catch (error){
        console.error('Error saving person:', error);
    }
};
//createPerson(person);
//createPersonArray(personarray);
const createPerson = async (person) => {

    try{
        

   const savedPerson=  await person.save();
    console.log('Person saved:', savedPerson )
    }
    catch (error){
        console.error('Error saving person:', error);
    }
};



const findPersonByName = async (name) => {

    try{
        const persons =  await Person.find({name : name})
        console.log("Persons found:", persons )

    }
catch (error) { 
console.log (`Error can't find person ${name}`, error)

 
}
}

//findPersonByName( "person22");







const findPersonByFavoriteFood = async (food) => {

    try{
        const persons =  await Person.find({ favoriteFoods : food})
        console.log("Persons found:", persons )

    }
catch (error) { 
console.log (`Error can't find person ${food}`, error)

 
}
}


//findPersonByFavoriteFood('Pizza')

const findPersonById = async (id) => {

    try{
        const persons =  await Person.findById(id)
        console.log("Persons found:", persons )

    }
catch (error) { 
console.log (`Error can't find person ${food}`, error)

 
}
}
//findPersonById('668fc1a93063002d700da80d')



const findOnePerson = async (name) => {

    try{
        const persons =  await Person.findOne(name)
        console.log("Persons found:", persons )

    }
catch (error) { 
console.log (`Error can't find person ${name}`, error)

 
}
}
//findOnePerson('Joe')




const findOnePersonByIdAndDelete = async (id) => {

    try{
        const persons =  await Person.findByIdAndDelete(id)
        console.log("Persons found:", persons )

    }
catch (error) { 
console.log (`Error can't find person ${id}`, error)

 
}
}
//findOnePersonByIdAndDelete('668fc1a93063002d700da80d')





const findAllPersons = async() => {

    try{
        const persons =  await Person.find();
        console.log(`persons ${persons}`);

    }
catch (error) { 
console.log ("Error saving person:", error)

 
}
}
findAllPersons();

const updatePersonAge = async (personName) => {
    try {
      
        const updatedPerson = await Person.findOneAndUpdate(
            { name: personName }, // search query
            { age: 20 }, // new age value to set
            { new: true } // options: return updated document
        );

       
        if (!updatedPerson) {
            console.log(`Person with name '${personName}' not found.`);
            return null; 
        }

       
        console.log(`Updated person details:\n${updatedPerson}`);
        return updatedPerson;
    } catch (error) {
        console.error(`Error updating person: ${error.message}`);
        throw error;
    }
};


updatePersonAge('Joe')
    .then(updatedPerson => {

    })
    .catch(error => {
   
    });
