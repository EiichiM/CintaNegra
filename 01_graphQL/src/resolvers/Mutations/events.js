const Event = require('../../models/Events');

const createEvent = async (obj, args) => {
   const params = args.data;
   const newEvent = Event({
       ...params
   }) 
   const miEvent = await newEvent.save();
   const event = await Event.findOne({_id:miEvent._id}).populate('user')
   return event
}

module.exports = {
    createEvent
}