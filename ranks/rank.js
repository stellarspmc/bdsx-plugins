"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const json_1 = require("@bdsx/ckclib/json");
const packetids_1 = require("bdsx/bds/packetids");
const event_1 = require("bdsx/event");
const ranks_1 = require("./ranks");
event_1.events.serverOpen.on(() => {
    (0, json_1.writeJSON)("../scriptData/rank.json", ranks_1.rankData);
});
event_1.events.serverClose.on(() => {
    (0, json_1.writeJSON)("../scriptData/rank.json", ranks_1.rankData);
});
event_1.events.packetAfter(packetids_1.MinecraftPacketIds.Login).on((packet, networkIdentifier) => {
    const ip = networkIdentifier.getAddress();
    console.log(ip);
    let xuid, name;
    var actor = networkIdentifier.getActor();
    name = actor === null || actor === void 0 ? void 0 : actor.getName();
    if (packet.connreq == null)
        return;
    xuid = packet.connreq.cert.toString();
    if (name != null && actor != null) {
        ranks_1.address.set(ip.toLowerCase(), name.toLowerCase());
        ranks_1.xuidd.set(name.toLowerCase(), xuid);
        var p2 = networkIdentifier.getActor();
        if (p2 == null)
            return;
        else {
            ranks_1.rankData[name] = (0, ranks_1.getRank)(p2);
        }
    }
    (0, json_1.writeJSON)("../scriptData/rank.json", ranks_1.rankData);
});
event_1.events.packetAfter(packetids_1.MinecraftPacketIds.Disconnect).on((p, networkIdentifier) => {
    (0, json_1.writeJSON)("../scriptData/rank.json", ranks_1.rankData);
    const name = ranks_1.address.get(networkIdentifier.getAddress().toLowerCase());
    if (!name) {
        return;
    }
    var p2 = networkIdentifier.getActor();
    if (p2 == null)
        return;
    else {
        ranks_1.rankData[name.toLowerCase()] = (0, ranks_1.getRank)(p2);
    }
    console.log(ranks_1.rankData);
    ranks_1.address.delete(name);
    if (ranks_1.xuidd.has(name.toLowerCase())) {
        ranks_1.xuidd.delete(name.toLowerCase());
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFuay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInJhbmsudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw0Q0FBOEM7QUFDOUMsa0RBQXdEO0FBQ3hELHNDQUFvQztBQUNwQyxtQ0FBNEQ7QUFFNUQsY0FBTSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFO0lBQ2xCLElBQUEsZ0JBQVMsRUFBQyx5QkFBeUIsRUFBRSxnQkFBUSxDQUFDLENBQUM7QUFDbkQsQ0FBQyxDQUFDLENBQUM7QUFDSCxjQUFNLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUU7SUFDdkIsSUFBQSxnQkFBUyxFQUFDLHlCQUF5QixFQUFFLGdCQUFRLENBQUMsQ0FBQztBQUNuRCxDQUFDLENBQUMsQ0FBQztBQUNILGNBQU0sQ0FBQyxXQUFXLENBQUMsOEJBQWtCLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxFQUFFLGlCQUFpQixFQUFFLEVBQUU7SUFDMUUsTUFBTSxFQUFFLEdBQUcsaUJBQWlCLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDMUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNoQixJQUFJLElBQUksRUFBRSxJQUFJLENBQUM7SUFDZixJQUFJLEtBQUssR0FBRyxpQkFBaUIsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUN6QyxJQUFJLEdBQUcsS0FBSyxhQUFMLEtBQUssdUJBQUwsS0FBSyxDQUFFLE9BQU8sRUFBRSxDQUFDO0lBQ3hCLElBQUksTUFBTSxDQUFDLE9BQU8sSUFBSSxJQUFJO1FBQ3RCLE9BQU87SUFDWCxJQUFJLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDdEMsSUFBSSxJQUFJLElBQUksSUFBSSxJQUFJLEtBQUssSUFBSSxJQUFJLEVBQUU7UUFDL0IsZUFBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsV0FBVyxFQUFFLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7UUFDbEQsYUFBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDcEMsSUFBSSxFQUFFLEdBQUcsaUJBQWlCLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDdEMsSUFBSSxFQUFFLElBQUksSUFBSTtZQUNWLE9BQU87YUFDTjtZQUNELGdCQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBQSxlQUFPLEVBQUMsRUFBRSxDQUFDLENBQUM7U0FDaEM7S0FDSjtJQUNELElBQUEsZ0JBQVMsRUFBQyx5QkFBeUIsRUFBRSxnQkFBUSxDQUFDLENBQUM7QUFDbkQsQ0FBQyxDQUFDLENBQUM7QUFDSCxjQUFNLENBQUMsV0FBVyxDQUFDLDhCQUFrQixDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxpQkFBaUIsRUFBRSxFQUFFO0lBQzFFLElBQUEsZ0JBQVMsRUFBQyx5QkFBeUIsRUFBRSxnQkFBUSxDQUFDLENBQUM7SUFDL0MsTUFBTSxJQUFJLEdBQUcsZUFBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO0lBQ3ZFLElBQUksQ0FBQyxJQUFJLEVBQUU7UUFDUCxPQUFPO0tBQ1Y7SUFDRCxJQUFJLEVBQUUsR0FBRyxpQkFBaUIsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUN0QyxJQUFJLEVBQUUsSUFBSSxJQUFJO1FBQ1YsT0FBTztTQUNOO1FBQ0QsZ0JBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsR0FBRyxJQUFBLGVBQU8sRUFBQyxFQUFFLENBQUMsQ0FBQztLQUM5QztJQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQVEsQ0FBQyxDQUFDO0lBQ3RCLGVBQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDckIsSUFBSSxhQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxFQUFFO1FBQy9CLGFBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7S0FDcEM7QUFDTCxDQUFDLENBQUMsQ0FBQyJ9