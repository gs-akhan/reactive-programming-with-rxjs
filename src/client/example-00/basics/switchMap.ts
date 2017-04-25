import {helper} from "./helper";
export module switchMap{
    export function init(){
        let menuItem = helper.menu.replace(/\$\{NAME\}/i, "Switch Map");
        return {
            menuItem
        };
    }
}