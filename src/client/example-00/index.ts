import {Observable, Scheduler} from "rxjs";
declare var EventSource;
import {getEvents, getData, upperCase} from "./promise-way/index";
import {getDataRxWay, getEventsRxWay} from "./rxjs-way/index";

import {concat} from "./basics/concat";
import {merge} from "./basics/merge";
import {zip} from "./basics/zip";

function init(){

    document.querySelector(".list-group").innerHTML = zip.init().menu;
    /*//let users = getDataRxWay("../js/MOCK_DATA.json").map(res=> JSON.parse(res || '[]'));        
    //users.subscribe(console.info, console.error)
    
    //CONCAT

    //MERGE

    //ZIP

    //CONCAT ALL

    //MERGE ALL

    //ZIP ALL

    //FORK JOIN
    
    //CONCAT MAP

    //MERGE MAP (FLAT MAP)    

    //SWITCH MAP

    //COMBINE LATEST
    //Joins any latest value from one observable with most recent value from other 
    //inactive/collecting observables (irrespective source emission)    
    var [x, y] = [1000, 500];
    Observable
        .interval(x)      
        .map(val=>val + " after " + (val*x) +"sec")              
        .combineLatest(Observable.interval(y).map(val=>val + " after " + (val*y) +"sec")    )
        .take(10)
        //.subscribe(console.info, console.error)

    //WITH LATEST FROM
    //whenever the source emits a value, 
    //joins most recent values from all other collecting observables
    //(with respect to source changes..)    
    Observable
        .interval(x)
        .map(val=>val + " after " + (val*x) +"sec")    
        .withLatestFrom(Observable.interval(y).map(val=>val + " after " + (val*y) +"sec"))        
        .take(10)
        //.subscribe(console.info, console.error)

    //FILTER

    //PLUCK

    //REDUCE

    //SCAN


    //START WITH

    //DO*/


    



}

export = init;