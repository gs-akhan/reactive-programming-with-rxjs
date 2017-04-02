import * as Twit from "twit";
const twitConf = require("../../twitter-conf.json");

var T = new Twit(twitConf);
//var stream = T.stream('statuses/filter', { track: 'bahubali' })

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
                reply["event"]({ data: "Hi " + count });
            }
            count++;
        }, 1000);
    }
};