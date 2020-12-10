const mongoose = require('mongoose')

const optionSchema = new mongoose.Schema({
    option: String,
    votes: {
        type: Number,
        default: 0
    }
})

const schema = {
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },

    question: {
        type: String,
    },

    
    options: [optionSchema],

    voted: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}


const pollSchema = new mongoose.Schema(schema, {timestamps: true})

const Poll = mongoose.model('Testimonial', pollSchema)

module.exports = {Poll}