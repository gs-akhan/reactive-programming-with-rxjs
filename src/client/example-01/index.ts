
import {Observable} from "rxjs";
import {getData} from "../example-00/promise-way/index";

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

function renderAsList(data){
    
    let header = `
            <div class="row">
                <div class="col-sm-1"><strong>Avatar</strong></div>                
                <div class="col-sm-4"><strong>First Name</strong></div>
                <div class="col-sm-3"><strong>Last Name</strong></div>
                <div class="col-sm-1"><strong>Age</strong></div>
                <div class="col-sm-2"><strong>Gender</strong></div>
                <div class="col-sm-1"><strong>Favorite Color</strong></div>                
            </div>
        `;

    return header + data.map(item=>{
                        return `
                            <div class="row">
                                <div class="col-sm-1"><img src="${item.avatar}" width="20" height="20"/></div>             
                                <div class="col-sm-4">${item.first_name}</div>
                                <div class="col-sm-3">${item.last_name}</div>
                                <div class="col-sm-1">${item.age}</div>
                                <div class="col-sm-2">${item.gender}</div>
                                <div class="col-sm-1" style="background-color:${item.favorite_color}">&nbsp;</div>            
                            </div>
                        `;
                }).join("");
}

function renderDetailed(data){

    let header = `
            <tr>
                <th><strong>Avatar</strong></th>                
                <th><strong>First Name</strong></th>
                <th><strong>Last Name</strong></th>
                <th><strong>Age</strong></th>
                <th><strong>Gender</strong></th>
                <th><strong>Favorite Color</strong></th>                
            </tr>
        `;

    return "<table class='table table-striped'>" + 
                header + 
                data.map(item=>{
                        return `
                            <tr>
                                <td><img src="${item.avatar}"  width="20" height="20"/></td>             
                                <td>${item.first_name}</td>
                                <td>${item.last_name}</td>
                                <td>${item.age}</td>
                                <td>${item.gender}</td>
                                <td style="background-color:${item.favorite_color}">&nbsp;</td>            
                            </tr>
                        `;
                }).join("") + 
            "</table>";
}

function renderAsIcons(data){
    return data.map(item=>{
                return `
                    <div class="col-sm-6 col-md-4">
                        <div class="thumbnail">
                            <img src="${item.avatar}">
                            <div class="caption">
                                <h3>${item.first_name} ${item.last_name}</h3>
                                <p>${item.age}, ${item.gender}, <span style="background-color:${item.favorite_color}" class="badge">&nbsp</span></p>
                                <blockquote>
                                    <p>${item.status_msg.substr(0, 20)}...</p>                                    
                                </blockquote>
                            </div>
                        </div>
                    </div>
                `;
        }).join("");
}

function renderItems(data, renderAs):string{
    let html = "";
    switch(renderAs){
        case "LIST": 
            html = renderAsList(data);
            break;
        case "DETAILS": 
            html = renderDetailed(data);
            break;
        case "ICONS": 
            html = renderAsIcons(data);
            break;
    }
    return html;
}

export = init;