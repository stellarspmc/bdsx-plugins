// ckclol's code, DO NOT TAKE CREDIT
// Lisenced 2021

import { writeJSON } from "@bdsx/ckclib/json";
import { MinecraftPacketIds } from "bdsx/bds/packetids";
import { events } from "bdsx/event";
import { address, getRank, rankData, xuidd } from "./ranks";

events.serverOpen.on(() => {
        writeJSON("../scriptData/rank.json", rankData);
    });
    events.serverClose.on(() => {
        writeJSON("../scriptData/rank.json", rankData);
    });
    events.packetAfter(MinecraftPacketIds.Login).on((packet, networkIdentifier) => {
        const ip = networkIdentifier.getAddress();
        console.log(ip);
        let xuid, name;
        var actor = networkIdentifier.getActor();
        name = actor?.getName();
        if (packet.connreq == null)
            return;
        xuid = packet.connreq.cert.toString();
        if (name != null && actor != null) {
            address.set(ip.toLowerCase(), name.toLowerCase());
            xuidd.set(name.toLowerCase(), xuid);
            var p2 = networkIdentifier.getActor();
            if (p2 == null)
                return;
            else {
                rankData[name] = getRank(p2);
            }
        }
        writeJSON("../scriptData/rank.json", rankData);
    });
    events.packetAfter(MinecraftPacketIds.Disconnect).on((p, networkIdentifier) => {
        writeJSON("../scriptData/rank.json", rankData);
        const name = address.get(networkIdentifier.getAddress().toLowerCase());
        if (!name) {
            return;
        }
        var p2 = networkIdentifier.getActor();
        if (p2 == null)
            return;
        else {
            rankData[name.toLowerCase()] = getRank(p2);
        }
        console.log(rankData);
        address.delete(name);
        if (xuidd.has(name.toLowerCase())) {
            xuidd.delete(name.toLowerCase());
        }
    });