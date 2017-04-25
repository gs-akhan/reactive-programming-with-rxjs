import {helper} from "./helper";
export module merge{
    export function init(){
        let menuItem = helper.menu.replace(/\$\{NAME\}/i, "Merge");
        return {
            menuItem
        };
    }
}