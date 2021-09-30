import { CommandPermissionLevel, CommandRawText, ActorWildcardCommandSelector } from "bdsx/bds/command";
import { command } from "bdsx/command";
import { int32_t } from "bdsx/nativetype";
import { events } from "bdsx/event";
import { giveCEItem } from "@bdsx/CustomItems";
import { enchant } from "@bdsx/CustomItems/enchant";
import { setRank } from "./ranks";
import { sendBroadcast } from ".";
// import { Game } from "./amogus/game";
// import { getPercentage } from "./amogus/percent";
// import { vent } from "./amogus/vents";

// var game: Game;

events.serverOpen.on(()=>{
        command.register('broadcast', 'Broadcast a message', CommandPermissionLevel.Operator).overload((args) => {
            sendBroadcast(args.message.text);
        }, {
            message: CommandRawText
        });
        command.register('enchantop', 'Op enchants.', CommandPermissionLevel.Operator).overload((p, o) => {
            for (const actor of p.plr.newResults(o)) {
                if (actor.isPlayer()) {
                    enchant(actor.getMainhandSlot(), p.enchant, p.lvl, true);
                }
            }
        }, {
            plr: ActorWildcardCommandSelector,
            enchant: int32_t,
            lvl: int32_t
        });
        command.register('trophyi', 'Give you a trophy', CommandPermissionLevel.Operator).overload((p, o) => {
            var t = o.getEntity();
            if (t != null && t?.isPlayer()) giveCEItem(t, "Your own Trophy", 69, "command_block", 18, -32767, true, ["This is only for you.", `${t.getName()}, you deserve this.`]);
        }, {});
        command.register('trophyc', 'Give you a chain trophy', CommandPermissionLevel.Operator).overload((p, o) => {
            var t = o.getEntity();
            if (t != null && t?.isPlayer()) giveCEItem(t, "Your own Trophy", 69, "chain_command_block", 18, -32767, true, ["This is only for you.", `${t.getName()}, you are super.`]);
        }, {});
        command.register('trophyr', 'Give you a repeating trophy', CommandPermissionLevel.Operator).overload((p, o) => {
            var t = o.getEntity();
            if (t != null && t?.isPlayer()) giveCEItem(t, "Your own Trophy", 69, "repeating_command_block", 18, -32767, true, ["This is only for you.", `${t.getName()}, you are a legend.`]);
        }, {});
        command.register('rank', 'Rank people.', CommandPermissionLevel.Operator).overload((p, o) => {
            for (const a of p.plr.newResults(o)) {
                if (a?.isPlayer()) setRank(a, p.rank);
            }
        }, {
            plr: ActorWildcardCommandSelector,
            rank: int32_t
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