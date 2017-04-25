import {helper} from "./helper";
import {getEventsRxWay} from "../rxjs-way/index";
import {Observable} from "rxjs"; 

export module concat{
    
    let _start = false;   
    let _name = "Concat"
    
    export function init(){        
        let menuItem = helper.menu.replace(/\$\{NAME\}/ig, _name);
        return {
            name:_name,
            menuItem,
            start(){
                _start = true;
                return concatExample();
            },
            stop(){
                _start = false;
            }
        };
    }

    function concatExample(){        
        let source1$ =  Observable
                            .interval(1000)
                            .map(i=>"S1:"+helper.alphabet[i])
                            .takeWhile(v=>_start)
                            .take(10);

        let source2$ = Observable
                            .interval(500)
                            .map(i=>"S2:"+helper.alphabet[i].toUpperCase())
                            .takeWhile(v=>_start)
                            .take(10);

          return source1$.concat(source2$);

    }

}

