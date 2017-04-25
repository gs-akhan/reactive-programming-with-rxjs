import {helper} from "./helper";
export module zip{
    export function init(){
        let menuItem = helper.menu.replace(/\$\{NAME\}/i, "Zip");
        return {
            menuItem
        };
    }
}