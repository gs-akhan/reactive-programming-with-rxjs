import * as Rx from "rxjs";
declare var EventSource;
import {getEvents, getData} from "./promise-way";
import {getDataRxWay, getEventsRxWay} from "./rxjs-way";

function init() {    
    //getData().then(console.info).catch(console.error);
    //getEvents().then(console.info).catch(console.error);

    getDataRxWay().subscribe(console.info, console.error);
    getEventsRxWay().subscribe(console.info, console.error);
    
}
export = init;