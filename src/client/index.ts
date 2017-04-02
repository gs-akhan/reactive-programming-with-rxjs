import * as Rx from "rxjs";


function init(){
    return Rx.Observable.interval(1000);
}
export = init;