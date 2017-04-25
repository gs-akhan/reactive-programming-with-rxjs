import {helper} from "./helper";
export module combineLatest{
    export function init(){
        let menuItem = helper.menu.replace(/\$\{NAME\}/i, "Combine Latest");
        return {
            menuItem
        };
    }
}