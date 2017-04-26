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

        return Observable.timer(0, 6000).take(5).map(s=>{
               s = s+1;
               return  Observable
                        .interval(1000)
                        .map(v=>helper.alphabet[v].toUpperCase())
                        .map(v=>({color:helper.getRandomColor(), x:s*80, txt:"S"+s+":"+v}))
                        .takeWhile(v=>_start)                             
                        .take(10);
        }).concatAll();

    }
}