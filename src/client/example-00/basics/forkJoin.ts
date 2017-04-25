import {helper} from "./helper";
export module forkJoin{
    export function init(){
        let menuItem = helper.menu.replace(/\$\{NAME\}/i, "Fork Join");
        return {
            menuItem
        };
    }
}