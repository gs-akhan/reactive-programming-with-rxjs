import {helper} from "./helper";
import {Observable} from "rxjs";

export module merge{
    
    let _start = false;   
    let _name = "Merge";
    
    export function init(){        
        let menuItem = helper.menu.replace(/\$\{NAME\}/ig, _name);
        return {
            name:_name,
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