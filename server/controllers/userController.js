require('dotenv').config()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const {User} = require('../models/User')


const userController = {
    async createUser (req, res) {
        const secret = process.env.SECRET

        const {name, email, password, isAdmin} = req.body
        
        //CHECK IF EMAIL EXISTS
        const emaiExist = await User.findOne({email: req.body.email})

        if(emaiExist) {
            return res.status(400).send({message: 'email already exist'})
        }

        //ACTUAL REGISTRATION
        try {
           let user = new User({name, email, password, isAdmin}) 

           await user.save()

           //ASSIGNING TOKEN TO REGISTERED USER

           const token = jwt.sign({_id: user._id, isAdmin: user.isAdmin}, secret, {expiresIn: 9000000})

           res.header('auth-token').send({success: true, message: `${user.name} created successfully`, token, user})
        } catch (error) {
            res.send(error.message)
        }
    },

    async signInUser (req, res) {
        try {
            const secret = process.env.SECRET

            //CHECKING IF USER EXIST

            const user = await User.findOne({email: req.body.email})

            if(!user) return res.status(404).send({message: 'inavalid password or email'})

            //DECODING THE HASHED PASSWORD

            const password = bcrypt.compare(req.body.password, user.password)

            if(!password) return res.status(404).send('invalid password or email')

            //CREATING AND ASSIGNING TOKEN

            const token = jwt.sign({_id: user._id, isAdmin: user.isAdmin}, secret, {expiresIn: 9000000})

            res.header('auth-token').json({success: true, message: `${user.name} signed in successfully`, token, user})

        } catch (error) {
            res.send(error.message)
        }
    },

    async getUsers (req, res) {
        try {
            const users = await User.find({})
            if(users) res.send(users)
            
        } catch (error) {
            res.send(error.message)
        }

    }
}

module.exports = {userController}