import {helper} from "./helper";
import {Observable} from "rxjs";
import {Drawing} from "../../visualisation/index";

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

        let colors1 = helper.colors.concat([]);
        let colors2 = helper.colors.concat([]);

        let source1$ =  Observable
                            .interval(2000)
                            .map(v=>({color:colors1.shift(), x:20, txt:"S1:"+v}))
                            .takeWhile(v=>_start)
                            .take(10);

        let source2$ = Observable
                            .interval(1000)
                            .map(v=>helper.alphabet[v].toUpperCase())
                            .map(v=>({color:colors2.shift(), x:80, txt:"S2:"+v}))
                            .takeWhile(v=>_start)
                            .take(10);

          return source1$.merge(source2$);
    }
}