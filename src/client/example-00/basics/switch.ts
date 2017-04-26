import {helper} from "./helper";
import {Observable} from "rxjs";

export module _switch{
    
    let _start = false;   
    let _name = "Switch";
    
    export function init(){        
        let menuItem = helper.menu.replace(/\$\{NAME\}/ig, _name);
        return {
            name:_name,
            menuItem,
            start(){
                _start = true;
                return switchExample();
            },
            stop(){
                _start = false;
            }
        };
    }

    function switchExample(){    

        let colors1 = helper.colors.concat([]);
        let colors2 = helper.colors.concat([]);

        let source1$ =  Observable
                            .interval(1000)
                            .map(v=>({color:colors1.shift(), x:20, txt:"S1:"+v}))
                            .takeWhile(v=>_start)
                            .take(10);

        let source2$ = Observable
                            .interval(1000)
                            .map(v=>helper.alphabet[v].toUpperCase())
                            .map(v=>({color:colors2.shift(), x:80, txt:"S2:"+v}))
                            .takeWhile(v=>_start)                             
                            .take(10);

        let tmp = [source1$, source2$, source1$];

        return Observable.timer(0, 2000).take(3).map(v=>tmp[v]).switch();
        
    }
}