
import * as Hapi from "hapi";
import * as Inert from "inert";
import * as Susie from "susie";
import * as Path from "path";

let server = new Hapi.Server();

server.connection({
    address: "localhost",
    port: process.env.PORT || '8085',
    routes: {
        files: {
            relativeTo: Path.join(__dirname, 'public')
        }
    }
});

let inert = server.register(Inert);
let susie = server.register(Susie);

Promise.all([inert, susie]).then(() => {

    server.route({
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: '.',
                redirectToSlash: true,
                index: true
            }
        }
    });

    server.route({
        path: "/events",
        method: "GET",
        handler: (req, reply) => {
            //reply["event"]({ id: 1, data: 'my data' });
            let count = 0;
            let id = setInterval(function(){
                if(count >10){
                     reply["event"](null);
                     clearInterval(id);
                }else{
                     reply["event"]({data:"Hi " + count});
                }
                count++;
            }, 1000);
        }
    });

    server
        .start()
        .then(() => console.info("Server started.."))
        .catch((err) => console.error(err));

});