"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.timesData = void 0;
const event_1 = require("bdsx/event");
const json_1 = require("@bdsx/ckclib/json");
exports.timesData = (0, json_1.parseJSON)("../scriptData/jointimes.json");
event_1.events.playerJoin.on((e) => {
    var plr = e.player;
    if (exports.timesData[plr.getName()] == null) {
        exports.timesData[plr.getName()] = 1;
    }
    else {
        exports.timesData[plr.getName()] = exports.timesData[plr.getName()] + 1;
    }
    (0, json_1.writeJSON)('../scriptData/jointimes.json', exports.timesData);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXNqb2luZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0aW1lc2pvaW5lZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxzQ0FBb0M7QUFDcEMsNENBQXlEO0FBRTlDLFFBQUEsU0FBUyxHQUFHLElBQUEsZ0JBQVMsRUFBQyw4QkFBOEIsQ0FBQyxDQUFDO0FBRWpFLGNBQU0sQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7SUFDbkIsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQztJQUNuQixJQUFJLGlCQUFTLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDLElBQUksSUFBSSxFQUFFO1FBQzlCLGlCQUFTLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ3BDO1NBQU07UUFDQyxpQkFBUyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxHQUFHLGlCQUFTLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQy9EO0lBQ0QsSUFBQSxnQkFBUyxFQUFDLDhCQUE4QixFQUFFLGlCQUFTLENBQUMsQ0FBQztBQUM3RCxDQUFDLENBQUMsQ0FBQyJ9