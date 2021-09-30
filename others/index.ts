import { timesData } from './timesjoined';
import { ServerPlayer } from 'bdsx/bds/player';
import { CANCEL } from 'bdsx/common';
import { events } from "bdsx/event";
import "./rank";
import "./discord-hooking";
import "./cmds";
import "./webhook";
import "./2913Module";
import "./interval";
import "./slapper";
import { sendMessage } from '@bdsx/ckclib/msg';
import { formSend } from '@bdsx/ckclib/form';
import { MinecraftPacketIds } from "bdsx/bds/packetids";
import { getMoney } from "@bdsx/economy/economy";
import { getRank, words } from './ranks';
import { serverInstance } from 'bdsx/bds/server';
import { getSkin, setSkin } from './func';
import { SerializedSkin } from 'bdsx/bds/skin';
import { ItemStack } from 'bdsx/bds/inventory';
import { playSound } from './music';

var save : SerializedSkin;

events.networkDisconnected.on(netId =>{
    var a = netId.getActor();
    if (a != null) {
        sendBroadcast("§c- §f§b" + a.getName());
    }
});

events.packetBefore(MinecraftPacketIds.Text).on((p, netId)=>{
    var actor = netId.getActor();
    if (p.needsTranslation) {
        return CANCEL;
    }
    if (actor != null) {
        console.log(actor.getName() + " : " + p.message);
        sendBroadcast(addColorCodeToName(actor) + " : " + p.message);
        return CANCEL;
    }
    return;
});

export function sendBroadcast(text: string) {
    serverInstance.minecraft.getLevel().getPlayers().forEach(p => {
        sendMessage(p, text);
    });
}

events.playerJoin.on((e) => {
    var p = e.player as ServerPlayer;
    var m = getMoney(p);
    sendBroadcast("§a+ §b§f" + p.getName());
    p.setFakeScoreboard("spmc.ml/bugreport", [` ${m}`, ` ${addColorCodeToName(p)} `, ` ${translateRank(getRank(p))} `, ` spmc.ml/discord `]);
    var skin = getSkin(p);
    console.log(skin);
    if (p.getName() == "chaukachun edu") {
        save = skin;
    } else {
        setSkin(p, save, 0);
    }
    if (timesData[p.getName()] == null || timesData[p.getName()] == 1) {
        formSend(p.getNetworkIdentifier(), {
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
    }, ((data: any) => {
            switch (data) {
                case 0:
                    var inv = p.getInventory();
                    inv.addItem(ItemStack.create("diamond_block", 2), true);
                    p.sendInventory();
                    playSound(p, "random.levelup", 75);
                    break;

            }
    }));
}});
export function translateRank(rank: number) {
    switch(rank) {
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

events.packetSend(MinecraftPacketIds.StartGame).on((p, netId) => {
    p.settings.seed = 69420;
});

function addColorCodeToName(p: ServerPlayer) {
    switch (getRank(p)) {
        case 1:
            var name = p.getName();
            words.forEach((bw) => {
                name = name.replace(bw, '');
            });
            return "§a" + name + "§r";
        case 2:
            var name = p.getName();
            words.forEach((bw) => {
                name = name.replace(bw, '');
            });
            return "§3" + name + "§r";
        case 3:
            var name = p.getName();
            words.forEach((bw) => {
                name = name.replace(bw, '');
            });
            return "§6" + name + "§r";
        case 4:
            var name = p.getName();
            words.forEach((bw) => {
                name = name.replace(bw, '');
            });
            return "§c" + name + "§r";
        case 5:
            var name = p.getName();
            words.forEach((bw) => {
                name = name.replace(bw, '');
            });
            return "§4" + name + "§r";
        default:
            var name = p.getName();
            words.forEach((bw) => {
                name = name.replace(bw, '');
            });
            return "§7" + name + "§r";
    }
}

events.packetBefore(MinecraftPacketIds.CommandRequest).on((p, netId) => {
    var actor = netId.getActor();
    if (actor != null) {
        console.log(actor.getName() + " : " + p.command);
    }
});
