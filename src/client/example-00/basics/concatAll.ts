import {helper} from "./helper";
import {Observable} from "rxjs";

export module concatAll{
    
    let _start = false;   
    let _name = "Concat All"
    
    export function init(){        
        let menuItem = helper.menu.replace(/\$\{NAME\}/ig, _name);
        return {
            name:_name,
            menuItem,
            start(){
                _start = true;
                return concatAllExample();
            },
            stop(){
                _start = false;
            }
        };
    }

    function concatAllExample(){        
        let source1$ =  Observable
                            .interval(1000)
                            .map(i=>"S1:"+helper.alphabet[i])
                            .takeWhile(v=>_start)
                            .take(10);

        let source2$ = Observable
                            .interval(500)
                            .map(i=>Observable.of("S2:"+helper.alphabet[i].toUpperCase()).delay(Math.random()*1000))
                            .takeWhile(v=>_start)
                            .take(10)
                            .concatAll();

          return source1$
    }
}