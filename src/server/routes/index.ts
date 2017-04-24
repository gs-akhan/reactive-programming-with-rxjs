import * as Hapi from "hapi";
import * as Twit from "twit";
const twitConf = require("../../twitter-conf.json");

var T = new (Twit as any)(twitConf);


export const SSE = {
    path: "/events",
    method: "GET",
    handler: (req, reply) => {
        //reply["event"]({ id: 1, data: 'my data' });
        let count = 0;
        let id = setInterval(function () {
            if (count > 10) {
                reply["event"](null);
                clearInterval(id);
            } else {
                reply["event"]({ id: count, data: 'hi'+count });
            }
            count++;
        }, 1000);
    }
};

export const SIMPLE_RES = {
    path: "/some_api",
    method: "GET",
    handler: (req, reply) => {
        reply({data:"SOME DATA"});
    }
};

export const UPPERCASE = {
    path: "/uppercase/{char}",
    method: "GET",
    handler: (req:Hapi.Request, reply) => {
        reply(req.params.char.toUpperCase());
    }
};