declare var EventSource;

export function getData():Promise<any>{

    let resolve, reject;
    
    let promise = new Promise(function(res, rej){
       resolve = res;
       reject = rej; 
    });

    let request = new XMLHttpRequest();
    request.open("GET", "/some_api");
    request.onreadystatechange = (evt: Event): any => {
        if (request["readyState"] === 4 && request.status === 200) {            
            console.info("Received api data..");
            console.warn("Finished..");
            resolve(request.responseText);
        }
    }
    
    request.onerror = (evt)=>{
        (evt)=>reject(evt);
    }    
    request.send();

    return promise;

}

export function getEvents():Promise<any> {

    let resolve, reject;
    
    let promise = new Promise(function(res, rej){
       resolve = res;
       reject = rej; 
    });

    var source = new EventSource('/events');
    
    //events can be multiple. For this case promises can not be used..
    //since the promise is resolved for the first time and it stays as it is.
    //it can not be re-resolved to send the new event getData
    //hence the out put is always one and the fist one.. Remaining events are gone..
    source.onmessage = (evt)=> {console.info("Received event data.."); resolve(evt.data);}
    source.onerror = (evt)=> {
        reject(evt.data);
    }

    source.addEventListener('end', function (event) {
        this.close();
        console.warn("Finished..");
    });

    return promise;
}