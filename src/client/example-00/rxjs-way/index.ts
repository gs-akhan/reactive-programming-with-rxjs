declare var EventSource;
import {Observable, Observer} from "rxjs";

export function getData(url?:string):Observable<any>{

    return Observable.create(function(obs:Observer<any>){

        let request = new XMLHttpRequest();
            request.open("GET", url || "/some_api");
            request.onreadystatechange = (evt: Event): any => {
                if (request["readyState"] === 4 && request.status === 200) {            
                    console.info("Received api data..");
                    console.warn("Finished..");
                    
                    //resolve(request.responseText);
                    obs.next(request.responseText);
                    obs.complete();
                }
            }
            
            /*request.onerror = (evt)=>{
                (evt)=>reject(evt);
            } */
            request.onerror = (evt)=>{
                obs.next(Observable.throw(evt));
            };
            request.send();

            //tear down unsubscibe..
            return ()=> obs.complete();
    });

}

export function getEvents():Observable<any>{

    return Observable.create(function(obs:Observer<any>){

        var source = new EventSource('/events');
        
        source.onmessage = (evt)=> {
            console.info("Received event data.."); 
            //resolve(evt.data);
            obs.next(evt.data);
        }
        source.onerror = (evt)=> {
            //reject(evt.data);
            obs.next(Observable.throw(evt));
        };

        source.addEventListener('end', function (event) {
            this.close();
            console.warn("Finished..");
            obs.complete();
        });

        //tear down on unsubscibe..
        return ()=> obs.complete();

    });
}