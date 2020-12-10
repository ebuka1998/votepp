require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./config/key')
const app = express()


//MIDDLEWARE DECLARATIONS
app.use(cors())
app.use(express.json({extended: true}))

//DATABASE CONNECTION
const connect = mongoose.connect(config.mongoUri, {useNewUrlParser: true, useUnifiedTopology: true})
                        .then(() => console.log('database connection successful'))
                        .catch((error) => console.log(error.message))



//ROUTES WILL GO HERE
app.use('/api', require('./routes/userRoutes'))
app.use('/api', require('./routes/pollRoutes')) 

 
//var item = items[Math.floor(Math.random() * items.length)];

PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`app has started on port ${PORT}`))

