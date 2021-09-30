import { ServerPlayer } from 'bdsx/bds/player';
import { Player } from 'bdsx/bds/player';
import { giveCEItem } from '@bdsx/CustomItems';

export function fedora(plr: Player) {
        giveCEItem(plr as ServerPlayer, "Fedora", 0, "netherite_helmet", 0, 50, true, ["A fedora"]);
}