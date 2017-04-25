import {helper} from "./helper";
export module mergeMap{
    export function init(){
        let menuItem = helper.menu.replace(/\$\{NAME\}/i, "Merge Map");
        return {
            menuItem
        }; 
    }
}