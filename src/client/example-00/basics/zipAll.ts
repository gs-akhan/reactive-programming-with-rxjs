import {helper} from "./helper";
export module zipAll{
    export function init(){
        let menuItem = helper.menu.replace(/\$\{NAME\}/i, "Zip All");
        return {
            menuItem
        };
    }
}