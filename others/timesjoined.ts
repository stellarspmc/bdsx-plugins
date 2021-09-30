import { events } from 'bdsx/event';
import { parseJSON, writeJSON } from "@bdsx/ckclib/json";

export var timesData = parseJSON("../scriptData/jointimes.json");

events.playerJoin.on((e) => {
        var plr = e.player;
        if (timesData[plr.getName()] == null) {
                timesData[plr.getName()] = 1;
        } else {
                timesData[plr.getName()] = timesData[plr.getName()] + 1;
        }
        writeJSON('../scriptData/jointimes.json', timesData);
});