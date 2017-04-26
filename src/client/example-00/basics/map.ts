import {helper} from "./helper";
import {Observable} from "rxjs";
import {Drawing} from "../../visualisation/index";

export module map{
    
    let _start = false;   
    let _name = "Map";
    
    export function init(){       
        
        let menuItem = helper.menu.replace(/\$\{NAME\}/ig, _name);
        return {
            name:_name,
            menuItem,
            start(){
                let colors = helper.colors.concat([]); 
                _start = true;
                return Observable
                            .interval(1000)
                            .map(v=>({color:colors.shift(), x:20, txt:"S1:"+v}))
                            .takeWhile(v=>_start)
                            .take(10);                         
            },
            stop(){
                _start = false;
            }
        };
    }
}