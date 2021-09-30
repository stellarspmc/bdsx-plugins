"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.translateRank = exports.sendBroadcast = void 0;
const timesjoined_1 = require("./timesjoined");
const common_1 = require("bdsx/common");
const event_1 = require("bdsx/event");
require("./rank");
require("./discord-hooking");
require("./cmds");
require("./webhook");
require("./2913Module");
require("./interval");
require("./slapper");
const msg_1 = require("@bdsx/ckclib/msg");
const form_1 = require("@bdsx/ckclib/form");
const packetids_1 = require("bdsx/bds/packetids");
const economy_1 = require("@bdsx/economy/economy");
const ranks_1 = require("./ranks");
const server_1 = require("bdsx/bds/server");
const func_1 = require("./func");
const inventory_1 = require("bdsx/bds/inventory");
const music_1 = require("./music");
var save;
event_1.events.networkDisconnected.on(netId => {
    var a = netId.getActor();
    if (a != null) {
        sendBroadcast("§c- §f§b" + a.getName());
    }
});
event_1.events.packetBefore(packetids_1.MinecraftPacketIds.Text).on((p, netId) => {
    var actor = netId.getActor();
    if (p.needsTranslation) {
        return common_1.CANCEL;
    }
    if (actor != null) {
        console.log(actor.getName() + " : " + p.message);
        sendBroadcast(addColorCodeToName(actor) + " : " + p.message);
        return common_1.CANCEL;
    }
    return;
});
function sendBroadcast(text) {
    server_1.serverInstance.minecraft.getLevel().getPlayers().forEach(p => {
        (0, msg_1.sendMessage)(p, text);
    });
}
exports.sendBroadcast = sendBroadcast;
event_1.events.playerJoin.on((e) => {
    var p = e.player;
    var m = (0, economy_1.getMoney)(p);
    sendBroadcast("§a+ §b§f" + p.getName());
    p.setFakeScoreboard("spmc.ml/bugreport", [` ${m}`, ` ${addColorCodeToName(p)} `, ` ${translateRank((0, ranks_1.getRank)(p))} `, ` spmc.ml/discord `]);
    var skin = (0, func_1.getSkin)(p);
    console.log(skin);
    if (p.getName() == "chaukachun edu") {
        save = skin;
    }
    else {
        (0, func_1.setSkin)(p, save, 0);
    }
    if (timesjoined_1.timesData[p.getName()] == null || timesjoined_1.timesData[p.getName()] == 1) {
        (0, form_1.formSend)(p.getNetworkIdentifier(), {
            "type": "form",
            "title": "Hello!",
            "content": "Here is your gift.",
            "buttons": [
                {
                    "text": "Your gift",
                    "image": {
                        "type": "path",
                        "data": "textures/items/diamond_block"
                    }
                }
            ]
        }, ((data) => {
            switch (data) {
                case 0:
                    var inv = p.getInventory();
                    inv.addItem(inventory_1.ItemStack.create("diamond_block", 2), true);
                    p.sendInventory();
                    (0, music_1.playSound)(p, "random.levelup", 75);
                    break;
            }
        }));
    }
});
function translateRank(rank) {
    switch (rank) {
        case 0:
            return "Default";
        case 1:
            return "Plus";
        case 2:
            return "Plus+";
        case 3:
            return "MVP";
        case 4:
            return "MVP+";
        case 5:
            return "Admin";
    }
}
exports.translateRank = translateRank;
event_1.events.packetSend(packetids_1.MinecraftPacketIds.StartGame).on((p, netId) => {
    p.settings.seed = 69420;
});
function addColorCodeToName(p) {
    switch ((0, ranks_1.getRank)(p)) {
        case 1:
            var name = p.getName();
            ranks_1.words.forEach((bw) => {
                name = name.replace(bw, '');
            });
            return "§a" + name + "§r";
        case 2:
            var name = p.getName();
            ranks_1.words.forEach((bw) => {
                name = name.replace(bw, '');
            });
            return "§3" + name + "§r";
        case 3:
            var name = p.getName();
            ranks_1.words.forEach((bw) => {
                name = name.replace(bw, '');
            });
            return "§6" + name + "§r";
        case 4:
            var name = p.getName();
            ranks_1.words.forEach((bw) => {
                name = name.replace(bw, '');
            });
            return "§c" + name + "§r";
        case 5:
            var name = p.getName();
            ranks_1.words.forEach((bw) => {
                name = name.replace(bw, '');
            });
            return "§4" + name + "§r";
        default:
            var name = p.getName();
            ranks_1.words.forEach((bw) => {
                name = name.replace(bw, '');
            });
            return "§7" + name + "§r";
    }
}
event_1.events.packetBefore(packetids_1.MinecraftPacketIds.CommandRequest).on((p, netId) => {
    var actor = netId.getActor();
    if (actor != null) {
        console.log(actor.getName() + " : " + p.command);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwrQ0FBMEM7QUFFMUMsd0NBQXFDO0FBQ3JDLHNDQUFvQztBQUNwQyxrQkFBZ0I7QUFDaEIsNkJBQTJCO0FBQzNCLGtCQUFnQjtBQUNoQixxQkFBbUI7QUFDbkIsd0JBQXNCO0FBQ3RCLHNCQUFvQjtBQUNwQixxQkFBbUI7QUFDbkIsMENBQStDO0FBQy9DLDRDQUE2QztBQUM3QyxrREFBd0Q7QUFDeEQsbURBQWlEO0FBQ2pELG1DQUF5QztBQUN6Qyw0Q0FBaUQ7QUFDakQsaUNBQTBDO0FBRTFDLGtEQUErQztBQUMvQyxtQ0FBb0M7QUFFcEMsSUFBSSxJQUFxQixDQUFDO0FBRTFCLGNBQU0sQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUU7SUFDbEMsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3pCLElBQUksQ0FBQyxJQUFJLElBQUksRUFBRTtRQUNYLGFBQWEsQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7S0FDM0M7QUFDTCxDQUFDLENBQUMsQ0FBQztBQUVILGNBQU0sQ0FBQyxZQUFZLENBQUMsOEJBQWtCLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBQyxFQUFFO0lBQ3hELElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUM3QixJQUFJLENBQUMsQ0FBQyxnQkFBZ0IsRUFBRTtRQUNwQixPQUFPLGVBQU0sQ0FBQztLQUNqQjtJQUNELElBQUksS0FBSyxJQUFJLElBQUksRUFBRTtRQUNmLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxHQUFHLEtBQUssR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDakQsYUFBYSxD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