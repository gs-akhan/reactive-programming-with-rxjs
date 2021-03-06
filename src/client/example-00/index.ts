import {Observable, Scheduler} from "rxjs";
import {Drawing} from "../visualisation/index";
import {getEvents, getData, upperCase} from "./promise-way/index";
import {getData as getDataRxWay, getEvents as getEventsRxWay} from "./rxjs-way/index";

import {map} from "./basics/map";

import {concat} from "./basics/concat";
import {concatMap} from "./basics/concatMap";
import {concatAll} from "./basics/concatAll";

import {merge} from "./basics/merge";
import {mergeMap} from "./basics/mergeMap";
import {mergeAll} from "./basics/mergeAll";

import {zip} from "./basics/zip";
import {zipAll} from "./basics/zipAll";
import {forkJoin} from "./basics/forkJoin";

import {_switch} from "./basics/switch";
import {switchMap} from "./basics/switchMap";

import {combineLatest} from "./basics/combineLatest";
import {withLatestFrom} from "./basics/withLatestFrom";

interface Module{
    name:string,
    menuItem:string,
    start:()=>Observable<any>,
    stop:()=>void
}

declare var createjs:any;

function init(){
    
    let modules = [
                    map, 
                    concat, merge, zip, forkJoin, combineLatest, withLatestFrom,
                    concatAll, mergeAll, _switch, zipAll,
                    concatMap, mergeMap, switchMap                    
                ];
    let instances:{[key:string]:Module} = {};
    
    modules.forEach(module=>{
                
        let instance = module.init();
        instances[instance.name] = instance;
        document.querySelector(".list-group").innerHTML += instance.menuItem;

    });    

    let latest = Observable
                    .fromEvent(document.querySelector(".list-group") as Element, "click")            
                    .map((evt:any)=>{
                        evt.preventDefault();
                        return evt.target.attributes.getNamedItem('data-target').value;
                    })
                    .do(()=>{                
                        reset();
                    })
                    .map(key=>instances[key].start())
                    .switch();
                                        
    
     Drawing.init(latest);
}

function reset(){
    console.clear();
    Drawing.clear();
    Drawing.start();
}

export = init;