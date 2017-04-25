import {helper} from "./helper";
import {Observable} from "rxjs";

export module zip{
    
    let _start = false;   
    let _name = "Zip";
    
    export function init(){        
        let menuItem = helper.menu.replace(/\$\{NAME\}/ig, _name);
        return {
            name:_name,
            menuItem,
            start(){
                _start = true;
                return zipExample();
            },
            stop(){
                _start = false;
            }
        };
    }

    function zipExample(){        
        let source1$ =  Observable
                            .interval(1000)
                            .map(i=>helper.alphabet[i])
                            .takeWhile(v=>_start)
                            .take(10);

        let source2$ = Observable
                            .interval(5000)
                            .map(i=>helper.alphabet[i].toUpperCase())
                            .takeWhile(v=>_start)
                            .take(10);

          return source1$.zip(source2$);
    }
}