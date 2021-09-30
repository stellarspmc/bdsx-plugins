import { getMoney } from "@bdsx/economy/economy";
import { Block } from "bdsx/bds/block";
import { Vec3 } from "bdsx/bds/blockpos";
import { serverInstance } from "bdsx/bds/server";
import { events } from "bdsx/event";
import { sleep } from '@bdsx/ckclib';
import { translateRank } from ".";
import { getRank, sendMessage } from "./ranks";
import { CANCEL } from "bdsx/common";
import { ScorePacketInfo, SetDisplayObjectivePacket } from "bdsx/bds/packets";

var interval: NodeJS.Timeout;

events.serverOpen.on(() => {
    interval = setInterval((() => {
        serverInstance.minecraft.getLevel().getPlayers().forEach(plr => {
            if (plr.isPlayer()) {
                var m = getMoney(plr);
                var oldVar = getRank(plr);
                if (oldVar != getRank(plr)) {
                }
                plr.setFakeScoreboard("spmc.ml/bugreport", [` ${m}`, ` ${plr.getName()} `, ` ${translateRank(getRank(plr))} `, ` spmc.ml/discord `]);
                var inv = plr.getInventory();
                var slot = inv.getSlots();
                for (var i = 0; i > 35; i++) {
                    var rlslot = slot.get(i);
                    if (rlslot.getDamageValue() == 5) {
                        sendMessage(plr, `§4Your ${rlslot.getName()} is breaking! Repair it before it "breaks"!`);
                    }
                    else if (rlslot.getDamageValue() == 1) {
                        rlslot.setAuxValue(200);
                        rlslot.setCustomLore(["It is broken. You may never use it.", "Please repair it."]);
                    }
                    switch (rlslot.getId()) {
                        case 523:
                        case 76:
                        case 50:
                        case 169:
                        case 89:
                        case 91:
                        case 348:
                        case 116:
                        case 120:
                        case 10:
                        case 51:
                        case 11:
                        case 464:
                        case 465:
                        case 492:
                        case 630:
                        case 631:
                        case 666:
                        case 667:
                        case 668:
                        case 669:
                        case 670:
                        case 671:
                        case 672:
                        case 673:
                        case 674:
                        case 675:
                        case 676:
                        case 677:
                        case 678:
                        case 679:
                        case 680:
                        case 681:
                        case 682:
                        case 683:
                        case 684:
                        case 685:
                        case 686:
                        case 687:
                        case 688:
                        case 689:
                        case 690:
                        case 691:
                        case 692:
                        case 693:
                        case 694:
                        case 695:
                        case 696:
                        case 697:
                        case 698:
                        case 699:
                        case 700:
                            var reigon = plr.getRegion();
                            var pos = plr.getPosition();
                            var ls = Block.create('light_block', 15);
                            var air = Block.create('air');
                            if (ls != null && air != null)
                                if (reigon.getBlock(pos) != Block.create('air')) {
                                    if (reigon.getBlock(Vec3.create(pos.x, pos.y + 1, pos.z)) != air) {
                                        sendMessage(plr, `How are you in a block (unless you in portal), couldn't place light source.`);
                                    }
                                    else {
                                        reigon.setBlock(Vec3.create(pos.x, pos.y + 1, pos.z), ls);
                                        sleep(100);
                                        reigon.setBlock(Vec3.create(pos.x, pos.y + 1, pos.z), air);
                                    }
                                }
                                else {
                                    reigon.setBlock(pos, ls);
                                    sleep(100);
                                    reigon.setBlock(pos, air);
                                }
                            break;
                        default:
                        //nothin
                    }
                }
            }
        });
}), 1);
})



events.blockDestroy.on(e => {
        var plr = e.player;
        var slot = plr.getInventory().getSlots();
        for (var i = 0; i > 35; i++) {
            var rlslot = slot.get(i);
            var aux = rlslot.getAuxValue();
            if (aux == 200) {
                return CANCEL;
            }
        }
});
    events.playerUseItem.on(e => {
        var plr = e.player;
        var slot = plr.getInventory().getSlots();
        for (var i = 0; i > 35; i++) {
            var rlslot = slot.get(i);
            var aux = rlslot.getAuxValue();
            if (aux == 200) {
                return CANCEL;
            }
        }
    });
    events.entityHealthChange.on((e) => {
        var entity = e.entity;
        const displaypacket = SetDisplayObjectivePacket.create();
        displaypacket.displaySlot = 'belowname';
        displaypacket.objectiveName = 'health';
        displaypacket.displayName = '§cHealth: ';
        displaypacket.criteriaName = 'dummy';
        displaypacket.sendTo(entity.getNetworkIdentifier());
        displaypacket.dispose();
        const entry = ScorePacketInfo.construct();
        entry.scoreboardId.idAsNumber = 1;
        entry.type = ScorePacketInfo.Type.PLAYER;
        entry.playerEntityUniqueId = entity.getUniqueIdBin();
        entry.score = e.newHealth;
    });
