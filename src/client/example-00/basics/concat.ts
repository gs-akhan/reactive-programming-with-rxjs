import {helper} from "./helper";
export module concat{
    export function init(){
        let menuItem = helper.menu.replace(/\$\{NAME\}/i, "Concat");
        return {
            menuItem
        };
    }
}