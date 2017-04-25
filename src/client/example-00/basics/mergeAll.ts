import {helper} from "./helper";
export module mergeAll{
    export function init(){
        let menuItem = helper.menu.replace(/\$\{NAME\}/i, "Merge All");
        return {
            menuItem
        };
    }
}