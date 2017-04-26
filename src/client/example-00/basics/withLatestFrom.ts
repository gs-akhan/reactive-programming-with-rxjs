import {helper} from "./helper";
import {Observable} from "rxjs";
import {Drawing} from "../../visualisation/index";

export module withLatestFrom{
    
    let _start = false;   
    let _name = "With Latest From"
    
    export function init(){        
        let menuItem = helper.menu.replace(/\$\{NAME\}/ig, _name);
        return {
            name:_name,
            menuItem,
            start(){
                _start = true;
                return withLatestFromExample()
            },
            stop(){
                _start = false;
            }
        };
    }

    function withLatestFromExample(){        
        
        let colors1 = helper.colors.concat([]);
        let colors2 = helper.colors.concat([]);

        let source1$ =  Observable
                            .interval(1000)
                            .map(v=>({color:helper.getRandomColor(), x:20, txt:"S1:"+v}))
                            .takeWhile(v=>_start)
                            .take(15);

        let source2$ = Observable
                            .interval(500)
                            .map(v=>helper.alphabet[v].toUpperCase())
                            .map(v=>({color:helper.getRandomColor(), x:80, txt:"S2:"+v}))
                            .takeWhile(v=>_start)
                            .take(15);

          return source1$.withLatestFrom(source2$);
    }
}