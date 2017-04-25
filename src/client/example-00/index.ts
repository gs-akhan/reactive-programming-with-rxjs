import {Observable, Scheduler} from "rxjs";
declare var EventSource;
import {getEvents, getData, upperCase} from "./promise-way/index";
import {getDataRxWay, getEventsRxWay} from "./rxjs-way/index";

import {concat} from "./basics/concat";
import {concatMap} from "./basics/concatMap";
import {concatAll} from "./basics/concatAll";

import {merge} from "./basics/merge";
import {mergeMap} from "./basics/mergeMap";
import {mergeAll} from "./basics/mergeAll";

import {zip} from "./basics/zip";
import {zipAll} from "./basics/zipAll";

import {combineLatest} from "./basics/combineLatest";
import {withLatestFrom} from "./basics/withLatestFrom";

function init(){
    
    let modules = [concat, concatMap,concatAll,merge, mergeMap, mergeAll,zip, zipAll,combineLatest,withLatestFrom];
    let instances = [] as {
                        menuItem:string,
                        start:()=>Observable<any>,
                        stop:()=>void
                    }[];
    
    modules.forEach(module=>{
        instances.push(module.init());
        document.querySelector(".list-group").innerHTML += instances[instances.length-1].menuItem;
    });    
}

export = init;