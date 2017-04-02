import * as Rx from "rxjs";
declare var EventSource;

function init() {
    var source = new EventSource('/events');
    
    source.onmessage = function (event) {
        document.getElementsByTagName("body")[0].innerHTML += event.data + "<br>";
    };
    source.addEventListener('end', function (event) {
        this.close();
    });
}
export = init;