import {helper} from "./helper";
export module concatMap{
    export function init(){
        let menuItem =  helper.menu.replace(/\$\{NAME\}/i, "Concat Map");
        return {
            menuItem
        };
    }
}