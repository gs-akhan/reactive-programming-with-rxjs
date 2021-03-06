
import {Observable} from "rxjs";
import {getData} from "../example-00/promise-way/index";
import {renderAsIcons, renderAsList, renderDetailed, renderItems} from "./renderers";

function init(){
        
    let sortOn  = document.querySelector(".slct") as HTMLSelectElement;
    let asList  = document.querySelector(".btn-group .list") as HTMLButtonElement;
    let details = document.querySelector(".btn-group .details") as HTMLButtonElement;
    let asIcons = document.querySelector(".btn-group .icons") as HTMLButtonElement;

    let sortOn$ = Observable
                    .fromEvent(sortOn, "change")
                    .map((evt:any)=>({sortOn:evt.target.value}))
                    .startWith({sortOn:"first_name"});
    
    let list$ = Observable
                    .fromEvent(asList, "click")
                    .map((evt:any)=>({renderAs:evt.target.value}));

    let details$ = Observable
                    .fromEvent(details, "click")
                    .map((evt:any)=>({renderAs:evt.target.value}));

    let asIcons$ = Observable                    
                    .fromEvent(asIcons, "click")                   
                    .map((evt:any)=>({renderAs:evt.target.value}));

    let renderAs$ = Observable
                    .merge(asIcons$)
                    .merge(list$)                    
                    .merge(details$)                    
                    .startWith({renderAs:"LIST"});
    

    let data = Observable
                    .fromPromise(getData("../js/MOCK_DATA.json"))
                    .map(data=>JSON.parse(data || '[]').slice(0,100));

    let events = Observable.combineLatest(sortOn$, renderAs$);
        
        data
        .combineLatest(events)
        .map(merged => {
            let [order, render] = merged[1];            
            let data = merged[0].sort((a, b)=>{
                if(a[order.sortOn] > b[order.sortOn]){
                    return 1;
                }else if(a[order.sortOn] < b[order.sortOn]){
                    return -1;
                }
                return 0;
            });
            
            return renderItems(data, render.renderAs);
        })
        .subscribe((processed)=>{            
            let ctn = document.querySelector(".user-list");
            ctn.innerHTML = processed;
            console.info("Finished");
        });
}


export = init;