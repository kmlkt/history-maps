import EventService from "../services/implementations/event-service";

async function RunTests(){
    console.log('Test started');
    await TestEventService();
    console.log('Test finished');
}

async function TestEventService(){
    // const service = new EventService();
    // const totalEvents = await service.getAllEvents();
    // console.log('total events', totalEvents);
    
    // const countries = await service.getEventCountries(totalEvents[0]);
    // console.log('countries', countries);

    // const bitmap = await service.getEventBitmapUrl(totalEvents[0]);
    // console.log('bitmap url', bitmap);

    // const points = await service.getEventPoints(totalEvents[0]);
    // console.log('points', points);

    // const colors = await service.getEventColors(totalEvents[0]);
    // console.log('colors', colors);
}

export default RunTests;