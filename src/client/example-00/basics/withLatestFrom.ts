import {helper} from "./helper";
export module withLatestFrom{
    export function init(){
        let menuItem = helper.menu.replace(/\$\{NAME\}/i, "With Latest From");
        return {
            menuItem
        };
    }
}