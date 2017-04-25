import {helper} from "./helper";
import {getEventsRxWay} from "../rxjs-way/index";
import {Observable} from "rxjs"; 

export module concat{
    let _start = false;
    export function init(){
        let menuItem = helper.menu.replace(/\$\{NAME\}/i, "Concat");
        return {
            menuItem,
            start(){
                _start = true;
                return Observable
                            .interval(1000)
                            .takeWhile(v=>_start);
            },
            stop(){
                _start = false;
            }
        };
    }
}

function doSomething(){

}