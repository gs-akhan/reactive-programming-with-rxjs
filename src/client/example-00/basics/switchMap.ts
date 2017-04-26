import {helper} from "./helper";
import {Observable} from "rxjs";

export module switchMap{
    
    let _start = false;   
    let _name = "Switch Map (map + switch)";
    
    export function init(){        
        let menuItem = helper.menu.replace(/\$\{NAME\}/ig, _name);
        return {
            name:_name,
            menuItem,
            start(){
                _start = true;
                return switchMapExample();
            },
            stop(){
                _start = false;
            }
        };
    }

    function switchMapExample(){  

        return Observable.timer(0, 6000).take(5)
            .switchMap(s=>{
                s = s+1;
                return  Observable
                            .timer(0, 1000+Math.random()*1000)
                            .map(v=>helper.alphabet[v].toUpperCase())
                            .map(v=>({color:helper.getRandomColor(), x:s*80, txt:"S"+s+":"+v}))
                            .takeWhile(v=>_start)                             
                            .take(10);
            });

    }
}