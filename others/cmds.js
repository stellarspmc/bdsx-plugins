"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("bdsx/bds/command");
const command_2 = require("bdsx/command");
const nativetype_1 = require("bdsx/nativetype");
const event_1 = require("bdsx/event");
const CustomItems_1 = require("@bdsx/CustomItems");
const enchant_1 = require("@bdsx/CustomItems/enchant");
const ranks_1 = require("./ranks");
const _1 = require(".");
// import { Game } from "./amogus/game";
// import { getPercentage } from "./amogus/percent";
// import { vent } from "./amogus/vents";
// var game: Game;
event_1.events.serverOpen.on(() => {
    command_2.command.register('broadcast', 'Broadcast a message', command_1.CommandPermissionLevel.Operator).overload((args) => {
        (0, _1.sendBroadcast)(args.message.text);
    }, {
        message: command_1.CommandRawText
    });
    command_2.command.register('enchantop', 'Op enchants.', command_1.CommandPermissionLevel.Operator).overload((p, o) => {
        for (const actor of p.plr.newResults(o)) {
            if (actor.isPlayer()) {
                (0, enchant_1.enchant)(actor.getMainhandSlot(), p.enchant, p.lvl, true);
            }
        }
    }, {
        plr: command_1.ActorWildcardCommandSelector,
        enchant: nativetype_1.int32_t,
        lvl: nativetype_1.int32_t
    });
    command_2.command.register('trophyi', 'Give you a trophy', command_1.CommandPermissionLevel.Operator).overload((p, o) => {
        var t = o.getEntity();
        if (t != null && (t === null || t === void 0 ? void 0 : t.isPlayer()))
            (0, CustomItems_1.giveCEItem)(t, "Your own Trophy", 69, "command_block", 18, -32767, true, ["This is only for you.", `${t.getName()}, you deserve this.`]);
    }, {});
    command_2.command.register('trophyc', 'Give you a chain trophy', command_1.CommandPermissionLevel.Operator).overload((p, o) => {
        var t = o.getEntity();
        if (t != null && (t === null || t === void 0 ? void 0 : t.isPlayer()))
            (0, CustomItems_1.giveCEItem)(t, "Your own Trophy", 69, "chain_command_block", 18, -32767, true, ["This is only for you.", `${t.getName()}, you are super.`]);
    }, {});
    command_2.command.register('trophyr', 'Give you a repeating trophy', command_1.CommandPermissionLevel.Operator).overload((p, o) => {
        var t = o.getEntity();
        if (t != null && (t === null || t === void 0 ? void 0 : t.isPlayer()))
            (0, CustomItems_1.giveCEItem)(t, "Your own Trophy", 69, "repeating_command_block", 18, -32767, true, ["This is only for you.", `${t.getName()}, you are a legend.`]);
    }, {});
    command_2.command.register('rank', 'Rank people.', command_1.CommandPermissionLevel.Operator).overload((p, o) => {
        for (const a of p.plr.newResults(o)) {
            if (a === null || a === void 0 ? void 0 : a.isPlayer())
                (0, ranks_1.setRank)(a, p.rank);
        }
    }, {
        plr: command_1.ActorWildcardCommandSelector,
        rank: nativetype_1.int32_t
    });
    /*
    game = Game.create(1);
    command.register("finishedtaskpersentage", "Gets the finished task percentage", CommandPermissionLevel.Operator).overload((p, o) => {
            var plr = o.getEntity();
            if (plr?.isPlayer()) {
                    sendMessage(plr, `${getPercentage(game)}%`);
            }
            return;
    }, {
            gameid: int16_t
    });
    command.register("task", "Finish task", CommandPermissionLevel.Operator).overload((p, o) => {
            for (var actor of p.plr.newResults(o)) {
                    switch (p.tasklocation) {
                            // admin
                            case "fixwiring3":
                            case "adminswipe":
                            case "admindata":
                            // cafe
                            case "cafeuploaddata":
                            // weapon
                            case "weapon":
                            case "weapondivpower":
                            case "weaponuploaddata":
                            // medbay
                            case "scan":
                            case "sample":
                            // up engine
                            case "updivpower":
                            case "fuel3":
                            // security
                            case "secudivpower":
                            // reactor
                            case "startreactor":
                            case "unlockmani":
                                    // low engine
                            case "lowdivpower":
                            case "fuel2":
                            // elect
                            case "divpower":
                            case "calib":
                            case "fixwire1":
                            case "electuploaddata":
                            // storage
                            case "fuel":
                            case "fixwire2":
                            case "rubbish2":
                            // comms
                            case "commsuploaddata":
                            case "commsdivpower":
                            // shields
                            case "pshields":
                            case "shieldsdivpower":
                            // nav
                            case "fixwire3":
                            case "stabilsteer":
                            case "navdivpower":
                            case "chartcourse":
                            case "navuploaddata":
                            // o2
                            case "o2rubbish":
                            case "o2divpower":
                    }
            }
    }, {
         tasklocation: CxxString,
         plr: ActorWildcardCommandSelector
    });
    command.register("fixsabatoge", "Fix sabatoge", CommandPermissionLevel.Operator).overload((p, o) => {
            switch (p.sabatoge) {
                    case "o2fst":
                    case "o2sec":
                    case "comms":
                    case "light":
                    case "reactor":
                    case "reactor2":
            }
    }, {
         sabatoge: CxxString
    });
    command.register("sabatoge", "Sabatoges people", CommandPermissionLevel.Operator).overload((p, o) => {
            switch (p.sabatoge) {
                    case "o2fst":
                    case "o2sec":
                    case "comms":
                    case "light":
                            actorList.forEach((plr) => {
                                    if (plr?.isPlayer()) {
                                            if (plr.hasTag("crewmate")) {
                                                    plr.addTag("light");
                                            }
                                    }
                            });
                            break;
                    case "reactor":
                    case "reactor2":
            }
    }, {
         sabatoge: CxxString
    });
    command.register("vent", "Vent to somewhere", CommandPermissionLevel.Normal).overload((p, o) => {
            var plr = o.getEntity();
            if (plr?.isPlayer() && p.secret == 4343513) vent(plr)}, {secret: int16_t}); */
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY21kcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNtZHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw4Q0FBd0c7QUFDeEcsMENBQXVDO0FBQ3ZDLGdEQUEwQztBQUMxQyxzQ0FBb0M7QUFDcEMsbURBQStDO0FBQy9DLHVEQUFvRDtBQUNwRCxtQ0FBa0M7QUFDbEMsd0JBQWtDO0FBQ2xDLHdDQUF3QztBQUN4QyxvREFBb0Q7QUFDcEQseUNBQXlDO0FBRXpDLGtCQUFrQjtBQUVsQixjQUFNLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxHQUFFLEVBQUU7SUFDakIsaUJBQU8sQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLHFCQUFxQixFQUFFLGdDQUFzQixDQUFDLFFBQVEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1FBQ3BHLElBQUEsZ0JBQWEsRUFBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3JDLENBQUMsRUFBRTtRQUNDLE9BQU8sRUFBRSx3QkFBYztLQUMxQixDQUFDLENBQUM7SUFDSCxpQkFBTyxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsY0FBYyxFQUFFLGdDQUFzQixDQUFDLFFBQVEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUM3RixLQUFLLE1BQU0sS0FBSyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ3JDLElBQUksS0FBSyxDQUFDLFFBQVEsRUFBRSxFQUFFO2dCQUNsQixJQUFBLGlCQUFPLEVBQUMsS0FBSyxDQUFDLGVBQWUsRUFBRSxFQUFFLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQzthQUM1RDtTQUNKO0lBQ0wsQ0FBQyxFQUFFO1FBQ0MsR0FBRyxFQUFFLHNDQUE0QjtRQUNqQyxPQUFPLEVBQUUsb0JB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