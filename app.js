const express = require('express');
const path = require('path');
const bodyparser = require('body-parser')
//add mongoose file
var mongoose = require('mongoose')

const app = express();
//connect mongoose with mongod
mongoose.connect('mongodb://localhost/ContactDance', {useNewUrlParser: true});

const port = 80;





//define mongoose schema
var ContactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email : String,
    address: String,
    desc : String
});

var Contact = mongoose.model('Contact', ContactSchema);

//EXPRESS SPECIFIC STUFFS
// app.use(express.static('static', options));
app.use('/static', express.static('static'))
app.use(express.urlencoded())

//PUG SPECIFIC STUFFS
app.set('view engine', 'pug') //set the template engine as pug
app.set('views', path.join(__dirname, 'views')) //set the views directory

//END POINTS
app.get("/", (req, res)=>{
    
    res.status(200).render('home.pug');
})
app.get("/contact", (req, res)=>{
    
    res.status(200).render('contact.pug');
})
app.post("/contact", (req, res)=>{
    
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to data base")
    }).catch(()=>{
        res.status(404).send("Items was not saved to the database");
    })
    
})



//START THE SERVER
app.listen(port, ()=>{
    console.log("The server has started on port")
})