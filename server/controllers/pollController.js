const {Poll} = require('../models/Poll')
const {User} = require('../models/User')

const pollController = {

    async createPoll (req, res) {
        const {question, options} = req.body
       // const {id} = req.decoded
        try {
            //const user = await User.findById(id)
            let poll = new Poll({
                question,
                //user,
                options: options.map(option => ({option, votes: 0}))
            })
            await poll.save()
            res.status(200).send({success: true, message: 'poll created successfully', poll})
        } catch (error) {
            res.status(400).send(error.message)
        }
    },
    
    async getPolls (req, res) {
        try {
            const polls = await Poll.find({})
            if(polls) res.status(201).send(polls)
            
        } catch (error) {
            res.status(400).send(error.message)
        }
    },

    async getPoll (req, res) {
        try {
            const {id} = req.params
            const poll = await Poll.findById(id)
            if(!poll) {
                return res.status(404).send('sorry, blog not found')
            }
            res.status(200).send(poll)
            
        } catch (error) {
            res.status(400).send(error.message)
        }
    },

    async votePoll (req, res) {
        const { id: pollId } = req.params;
        const userId  = req.body.userId;
        const { answer } = req.body;
        try {
          if (answer) {
            const poll = await Poll.findById(pollId);
            if (!poll) throw new Error('No poll found');
      
            const vote = poll.options.map(
              option =>
                option.option === answer
                  ? {
                      option: option.option,
                      _id: option._id,
                      votes: option.votes + 1,
                    }
                  : option,
            );

      
            console.log('VOTE: USERID ', userId);
            console.log('VOTE: poll.voted ', poll.voted);
            console.log(
              'VOTE: vote filter',
              poll.voted.filter(user => user.toString() === userId._id).length,
            );
      
            if (poll.voted.filter(user => user.toString() === userId._id).length <= 0) {
              poll.voted.push(userId);
              poll.options = vote;
              await poll.save();
      
              return res.status(202).json(poll);
            } else {
              throw new Error('Already voted');
            }
          } else {
            throw new Error('No Answer Provided');
          }
        } catch (err) {
          res.send(err.message)
        }
      }

}

module.exports = { pollController }
