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
                return mergeExample();
            },
            stop(){
                _start = false;
            }
        };
    }

    function mergeExample(){        
        let source1$ =  Observable
                            .interval(1000)
                            .map(i=>helper.alphabet[i])
                            .takeWhile(v=>_start)
                            .take(10);

        let source2$ = Observable
                            .interval(500)
                            .map(i=>helper.alphabet[i].toUpperCase())
                            .takeWhile(v=>_start)
                            .take(10);

          return source1$.merge(source2$);
    }
}