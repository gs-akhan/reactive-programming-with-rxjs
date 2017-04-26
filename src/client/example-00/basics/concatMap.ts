import {helper} from "./helper";
import {Observable} from "rxjs";

export module concatMap{
    
    let _start = false;   
    let _name = "Concat Map (map + concatAll)";
    
    export function init(){        
        let menuItem = helper.menu.replace(/\$\{NAME\}/ig, _name);
        return {
            name:_name,
            menuItem,
            start(){
                _start = true;
                return concatMapExample();
            },
            stop(){
                _start = false;
            }
        };
    }

    function concatMapExample(){  

        return Observable.timer(0, 3000).take(5)
            .concatMap(s=>{
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