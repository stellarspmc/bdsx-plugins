// ckclol's code, DO NOT TAKE CREDIT
// Lisenced 2021
import { parseJSON, writeJSON } from '@bdsx/ckclib/json';
import { Player } from 'bdsx/bds/player';
import { TextPacket } from 'bdsx/bds/packets';
export const words = ["§1", "§2", "§3", "§4", "§5", "§6", "§7", "§8", "§9", "§0", "§a", "§b", "§c", "§d", "§e", "§f", "§k", "§l", "§m", "§n", "§o", "§r"];
export const ranks = new Map<Player, RankUser>();
export const address = new Map<string, string>();
export const xuidd = new Map<string, string>();
export var rankData = parseJSON("../scriptData/rank.json");

export function sendMessage(actor: Player, message: string, type = 1) {
    const packet = TextPacket.create();
    packet.message = message;
    packet.type = type;
    packet.sendTo(actor.getNetworkIdentifier());
    packet.dispose();
}

export function getRank(player: Player) {
    const user = ranks.get(player);
    var name = player.getName().toLowerCase();
    words.forEach((bw) => {
        name = name.replace(bw, '');
    });
    if (!user) {
        if (!rankData[name]) {
            rankData[name] = defaultrank;
            return defaultrank;
        }
        return rankData[name];
    }
    writeJSON("../scriptData/rank.json", rankData);
    return user.getRank();
}

export function setRank(player: Player, rank: number) {
    const user = ranks.get(player);
    var name = player.getName().toLowerCase();
    if (rank >= 6) {
        return;
    }
    words.forEach((bw) => {
        name = name.replace(bw, '');
    });
    rankData[name] = rank;
    writeJSON("../scriptData/rank.json", rankData);
    return;
}

export function getUser(player: Player) {
    const user = ranks.get(player);
    if (!user) {
        return null;
    }
    return user;
}
class RankUser {

	player: Player;
	rank: number;

        constructor(player: Player, rank: number) {
		this.player = player;
		this.rank = rank;
	}
	getRank() {
		return this.rank;
	}
	getPlayer() {
		return this.player;
	}
	setRank(rank: number) {
	        this.rank = rank;
	}
}
export const defaultrank = 0;
export const plusrank = 1;
export const plplrank = 2;
export const mvplrank = 3;
export const admrank = 4;
export const onrrank = 5;