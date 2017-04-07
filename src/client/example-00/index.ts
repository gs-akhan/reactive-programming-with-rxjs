import {Observable, Scheduler} from "rxjs";
declare var EventSource;
import {getEvents, getData, upperCase} from "./promise-way/index";
import {getDataRxWay, getEventsRxWay} from "./rxjs-way";

function init() {    
    //getData().then(console.info).catch(console.error);
    //getEvents().then(console.info).catch(console.error);

    //getDataRxWay().subscribe(console.info, console.error);
    //getEventsRxWay().subscribe(console.info, console.error);

    let alphabets = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
    
    
    let trigger = Observable.interval(1000).take(alphabets.length);
        trigger.map(v=>[v, upperCase(alphabets[v])])
        //.subscribe(console.info, console.error);

        Observable
            .from(alphabets)
            .zip(trigger)
            .merge(v=>upperCase(alphabets[v[0]]))
            //.subscribe(console.info, console.error, ()=>console.info("Complete"));

        /*trigger
            .mergeMap(v=>{
                return Observable
                            .fromPromise(upperCase(alphabets[v]))
                            .map(a=>[v,a])
            })
            .subscribe((v)=>{
                console.info(v);                              
            }, console.error, ()=>console.info("Complete"));*/

            Observable
            .zip(trigger, trigger.mergeMap(v=>upperCase(alphabets[v])))            
            .bufferTime(2000)            
            .subscribe((v)=>{
                console.info(v);                              
            }, console.error, ()=>console.info("Complete"));
    
}
export = init;

/**
 1. example on login logout
 2. example com bining several interactions to enable disable features
 3. live text filtering
 4. twitter stream mapping

 */