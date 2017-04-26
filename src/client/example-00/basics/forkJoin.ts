import {helper} from "./helper";
import {Observable} from "rxjs";

export module forkJoin{
    
    let _start = false;   
    let _name = "Fork Join";
    
    export function init(){        
        let menuItem = helper.menu.replace(/\$\{NAME\}/ig, _name);
        return {
            name:_name,
            menuItem,
            start(){
                _start = true;
                return forkJoinExample()
            },
            stop(){
                _start = false;
            }
        };
    }

    function forkJoinExample(){    

        let colors1 = helper.colors.concat([]);
        let colors2 = helper.colors.concat([]);

        let source1$ =  Observable
                            .interval(2000)
                            .map(v=>({color:colors1.shift(), x:20, txt:"S1:"+v}))
                            .takeWhile(v=>_start)
                            .take(2);

        let source2$ = Observable
                            .interval(1000)
                            .map(v=>helper.alphabet[v].toUpperCase())
                            .map(v=>({color:colors2.shift(), x:80, txt:"S2:"+v}))
                            .takeWhile(v=>_start)
                            .take(2);

          return Observable.forkJoin(source1$, source2$);
    }
}