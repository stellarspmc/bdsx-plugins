"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onrrank = exports.admrank = exports.mvplrank = exports.plplrank = exports.plusrank = exports.defaultrank = exports.getUser = exports.setRank = exports.getRank = exports.sendMessage = exports.rankData = exports.xuidd = exports.address = exports.ranks = exports.words = void 0;
const json_1 = require("@bdsx/ckclib/json");
const packets_1 = require("bdsx/bds/packets");
exports.words = ["§1", "§2", "§3", "§4", "§5", "§6", "§7", "§8", "§9", "§0", "§a", "§b", "§c", "§d", "§e", "§f", "§k", "§l", "§m", "§n", "§o", "§r"];
exports.ranks = new Map();
exports.address = new Map();
exports.xuidd = new Map();
exports.rankData = (0, json_1.parseJSON)("../scriptData/rank.json");
function sendMessage(actor, message, type = 1) {
    const packet = packets_1.TextPacket.create();
    packet.message = message;
    packet.type = type;
    packet.sendTo(actor.getNetworkIdentifier());
    packet.dispose();
}
exports.sendMessage = sendMessage;
function getRank(player) {
    const user = exports.ranks.get(player);
    var name = player.getName().toLowerCase();
    exports.words.forEach((bw) => {
        name = name.replace(bw, '');
    });
    if (!user) {
        if (!exports.rankData[name]) {
            exports.rankData[name] = exports.defaultrank;
            return exports.defaultrank;
        }
        return exports.rankData[name];
    }
    (0, json_1.writeJSON)("../scriptData/rank.json", exports.rankData);
    return user.getRank();
}
exports.getRank = getRank;
function setRank(player, rank) {
    const user = exports.ranks.get(player);
    var name = player.getName().toLowerCase();
    if (rank >= 6) {
        return;
    }
    exports.words.forEach((bw) => {
        name = name.replace(bw, '');
    });
    exports.rankData[name] = rank;
    (0, json_1.writeJSON)("../scriptData/rank.json", exports.rankData);
    return;
}
exports.setRank = setRank;
function getUser(player) {
    const user = exports.ranks.get(player);
    if (!user) {
        return null;
    }
    return user;
}
exports.getUser = getUser;
class RankUser {
    constructor(player, rank) {
        this.player = player;
        this.rank = rank;
    }
    getRank() {
        return this.rank;
    }
    getPlayer() {
        return this.player;
    }
    setRank(rank) {
        this.rank = rank;
    }
}
exports.defaultrank = 0;
exports.plusrank = 1;
exports.plplrank = 2;
exports.mvplrank = 3;
exports.admrank = 4;
exports.onrrank = 5;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFua3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyYW5rcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw0Q0FBeUQ7QUFFekQsOENBQThDO0FBQ2pDLFFBQUEsS0FBSyxHQUFHLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDN0ksUUFBQSxLQUFLLEdBQUcsSUFBSSxHQUFHLEVBQW9CLENBQUM7QUFDcEMsUUFBQSxPQUFPLEdBQUcsSUFBSSxHQUFHLEVBQWtCLENBQUM7QUFDcEMsUUFBQSxLQUFLLEdBQUcsSUFBSSxHQUFHLEVBQWtCLENBQUM7QUFDcEMsUUFBQSxRQUFRLEdBQUcsSUFBQSxnQkFBUyxFQUFDLHlCQUF5QixDQUFDLENBQUM7QUFFM0QsU0FBZ0IsV0FBVyxDQUFDLEtBQWEsRUFBRSxPQUFlLEVBQUUsSUFBSSxHQUFHLENBQUM7SUFDaEUsTUFBTSxNQUFNLEdBQUcsb0JBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNuQyxNQUFNLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztJQUN6QixNQUFNLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUNuQixNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxvQkFBb0IsRUFBRSxDQUFDLENBQUM7SUFDNUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBQ3JCLENBQUM7QUFORCxrQ0FNQztBQUVELFNBQWdCLE9BQU8sQ0FBQyxNQUFjO0lBQ2xDLE1BQU0sSUFBSSxHQUFHLGFBQUssQ0FBQyxHQUFH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