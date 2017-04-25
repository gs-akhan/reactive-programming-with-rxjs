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

interface Module{
    name:string,
    menuItem:string,
    start:()=>Observable<any>,
    stop:()=>void
}

function init(){
    
    let modules = [
                    concat, merge, zip, 
                    concatAll, mergeAll, zipAll, 
                    concatMap, mergeMap, 
                    combineLatest, withLatestFrom
                ];
    let instances:{[key:string]:Module} = {};
    
    modules.forEach(module=>{
                
        let instance = module.init();
        instances[instance.name] = instance;
        document.querySelector(".list-group").innerHTML += instance.menuItem;

    });    

    Observable
            .fromEvent(document.querySelector(".list-group"), "click")            
            .map((evt:any)=>{
                evt.preventDefault();
                return evt.target.attributes.getNamedItem('data-target').value;
            })
            .do(()=>{
                Object.keys(instances).forEach(key=>instances[key].stop());
                console.clear();
            })
            .switchMap(key=>instances[key].start())
            .subscribe(console.info);
            
}

export = init;