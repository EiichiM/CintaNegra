
const Event = require('../../models/Events');

const getAllEvents = async (obj, args) => {
    const events = await Event.find();
    if(!events) throw new Error('No hay eventos');
    return events;
}

const getIdEvent = async (obj, args) => {
    const params = args.id;
    const event = await Event.findById(params);
    if(!event) throw new Error('No se encontro el evento')
    return event;
}

module.exports = {
    getAllEvents,
    getIdEvent
}