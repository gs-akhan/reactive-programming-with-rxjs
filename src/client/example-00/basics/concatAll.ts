import {helper} from "./helper";
export module concatAll{
    export function init(){
        let menuItem = helper.menu.replace(/\$\{NAME\}/i, "Concat All");
        return {
            menuItem
        };
    }
}