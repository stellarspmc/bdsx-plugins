"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const msg_1 = require("@bdsx/ckclib/msg");
const ckclib_1 = require("@bdsx/ckclib");
const economy_1 = require("@bdsx/economy/economy");
const block_1 = require("bdsx/bds/block");
const blockpos_1 = require("bdsx/bds/blockpos");
const server_1 = require("bdsx/bds/server");
const event_1 = require("bdsx/event");
const ranks_1 = require("./ranks");
const _1 = require(".");
const common_1 = require("bdsx/common");
const packets_1 = require("bdsx/bds/packets");
var interval;
interval = setInterval((() => {
    server_1.serverInstance.minecraft.getLevel().getPlayers().forEach(plr => {
        if (plr.isPlayer()) {
            var m = (0, economy_1.getMoney)(plr);
            var oldVar = (0, ranks_1.getRank)(plr);
            if (oldVar != (0, ranks_1.getRank)(plr)) {
            }
            plr.setFakeScoreboard("spmc.ml/bugreport", [` ${m}`, ` ${plr.getName()} `, ` ${(0, _1.translateRank)((0, ranks_1.getRank)(plr))} `, ` spmc.ml/discord `]);
            var inv = plr.getInventory();
            var slot = inv.getSlots();
            for (var i = 0; i > 35; i++) {
                var rlslot = slot.get(i);
                if (rlslot.getDamageValue() == 5) {
                    (0, msg_1.sendMessage)(plr, `§4Your ${rlslot.getName()} is breaking! Repair it before it "breaks"!`);
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
                        var ls = block_1.Block.create('light_block', 15);
                        var air = block_1.Block.create('air');
                        if (ls != null && air != null)
                            if (reigon.getBlock(pos) != block_1.Block.create('air')) {
                                if (reigon.getBlock(blockpos_1.Vec3.create(pos.x, pos.y + 1, pos.z)) != air) {
                                    (0, msg_1.sendMessage)(plr, `How are you in a block (unless you in portal), couldn't place light source.`);
                                }
                                else {
                                    reigon.setBlock(blockpos_1.Vec3.create(pos.x, pos.y + 1, pos.z), ls);
                                    (0, ckclib_1.sleep)(100);
                                    reigon.setBlock(blockpos_1.Vec3.create(pos.x, pos.y + 1, pos.z), air);
                                }
                            }
                            else {
                                reigon.setBlock(pos, ls);
                                (0, ckclib_1.sleep)(100);
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
event_1.events.serverClose.on(() => {
    clearInterval(interval);
});
event_1.events.blockDestroy.on(e => {
    var plr = e.player;
    var slot = plr.getInventory().getSlots();
    for (var i = 0; i > 35; i++) {
        var rlslot = slot.get(i);
        var aux = rlslot.getAuxValue();
        if (aux == 200) {
            return common_1.CANCEL;
        }
    }
});
event_1.events.playerUseItem.on(e => {
    var plr = e.player;
    var slot = plr.getInventory().getSlots();
    for (var i = 0; i > 35; i++) {
        var rlslot = slot.get(i);
        var aux = rlslot.getAuxValue();
        if (aux == 200) {
            return common_1.CANCEL;
        }
    }
});
event_1.events.entityHealthChange.on((e) => {
    var entity = e.entity;
    const displaypacket = packets_1.SetDisplayObjectivePacket.create();
    displaypacket.displaySlot = 'belowname';
    displaypacket.objectiveName = 'health';
    displaypacket.displayName = '§cHealth: ';
    displaypacket.criteriaName = 'dummy';
    displaypacket.sendTo(entity.getNetworkIdentifier());
    displaypacket.dispose();
    const entry = packets_1.ScorePacketInfo.construct();
    entry.scoreboardId.idAsNumber = 1;
    entry.type = packets_1.ScorePacketInfo.Type.PLAYER;
    entry.playerEntityUniqueId = entity.getUniqueIdBin();
    entry.score = e.newHealth;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZXJ2YWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbnRlcnZhbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDBDQUErQztBQUMvQyx5Q0FBcUM7QUFDckMsbURBQWlEO0FBQ2pELDBDQUF1QztBQUN2QyxnREFBeUM7QUFDekMsNENBQWlEO0FBQ2pELHNDQUFvQztBQUNwQyxtQ0FBa0M7QUFDbEMsd0JBQWtDO0FBQ2xDLHdDQUFxQztBQUNyQyw4Q0FBOEU7QUFFOUUsSUFBSSxRQUF3QixDQUFDO0FBQzdCLFFBQVEsR0FBRyxXQUFXLENBQUMsQ0FBQyxHQUFHLEVBQUU7SUFDekIsdUJBQWMsQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLENBQUMsVUFBVSxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1FBQzNELElBQUksR0FBRyxDQUFDLFFBQVEsRUFBRSxFQUFFO1lBQ2hCLElBQUksQ0FBQyxHQUFHLElBQUEsa0JBQVEsRUFBQyxHQUFHLENBQUMsQ0FBQztZQUN0QixJQUFJLE1BQU0sR0FBRyxJQUFBLGVBQU8sRUFBQyxHQUFHLENBQUMsQ0FBQztZQUMxQixJQUFJLE1BQU0sSUFBSSxJQUFBLGVBQU8sRUFBQyxHQUFHLENBQUMsRUFBRTthQUMzQjtZQUNELEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUUsS0FBSyxHQUFHLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRSxLQUFLLElBQUEsZ0JBQWEsRUFBQyxJQUFBLGVBQU8sRUFBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsbUJBQW1CLENBQUMsQ0FBQyxDQUFDO1lBQ3hJLElBQUksR0FBRyxHQUFHLEdBQUcsQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUM3QixJQUFJLElBQUksR0FBRyxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDMUIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDekIsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDekIsSUFBSSxNQUFNLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxFQUFFO29CQUM5QixJQUFBLGlCQUFXLEVBQUMsR0FBRyxFQUFFLFVBQVUsTUFBTSxDQUFDLE9BQU8sRUFBRSw2Q0FBNkMsQ0FBQyxDQUFDO2lCQUM3RjtxQkFDSSxJQUFJLE1BQU0sQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLEVBQUU7b0JBQ25DLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ3hCLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQyxxQ0FBcUMsRUFBRSxtQkFBbUIsQ0FBQyxDQUFDLENBQUM7aUJBQ3RGO2dCQUNELFFBQVEsTUFBTSxDQUFDLEtBQUssRUFBRSxFQUFFO29CQUNwQixLQUFLLEdBQUcsQ0FBQztvQkFDVCxLQUFLLEVBQUUsQ0FBQztvQkFDUixLQUFLLEVBQUUsQ0FBQztvQkFDUixLQUFLLEdBQUcsQ0FBQztvQkFDVCxLQUFLLEVBQUUsQ0FBQztvQkFDUixLQUFLLEVBQUUsQ0FBQztvQkFDUixLQUFLLEdBQUcsQ0FBQztvQkFDVCxLQUFLLEdBQUcsQ0FBQztvQkFDVCxLQUFLLEdBQUcsQ0FBQztvQkFDVCxLQUFLLEVBQUUsQ0FBQztvQkFDUixLQUFLLEVBQUUsQ0FBQztvQkFDUixLQUFLLEVBQUUsQ0FBQztvQkFDUixLQUFLLEdBQUcsQ0FBQztvQkFDVCxLQUFLLEdBQUcsQ0FBQztvQkFDVCxLQUFLLEdBQUcsQ0FBQztvQkFDVCxLQUFLLEdBQUcsQ0FBQztvQkFDVCxLQUFLLEdBQUcsQ0FBQztvQkFDVCxLQUFLLEdBQUcsQ0FBQztvQkFDVCxLQUFLLEdBQUcsQ0FBQztvQkFDVCxLQUFLLEdBQUcsQ0FBQztvQkFDVCxLQUFLLEdBQUcsQ0FBQztvQkFDVCxLQUFLLEdBQUcsQ0FBQztvQkFDVCxLQUFLLEdBQUcsQ0FBQztvQkFDVCxLQUFLLEdBQUcsQ0FBQztvQkFDVCxLQUFLLEdBQUcsQ0FBQztvQkFDVCxLQUFLLEdBQUcsQ0FBQztvQkFDVCxLQUFLLEdBQUcsQ0FBQztvQkFDVCxLQUFLLEdBQUcsQ0FBQztvQkFDVCxLQUFLLEdBQUcsQ0FBQztvQkFDVCxLQUFLLEdBQUcsQ0FBQztvQkFDVCxLQUFLLEdBQUcsQ0FBQztvQkFDVCxLQUFLLEdBQUcsQ0FBQztvQkFDVCxLQUFLLEdBQUcsQ0FBQztvQkFDVCxLQUFLLEdBQUcsQ0FBQztvQkFDVCxLQUFLLEdBQUcsQ0FBQztvQkFDVCxLQUFLLEdBQUcsQ0FBQztvQkFDVCxLQUFLLEdBQUcsQ0FBQztvQkFDVCxLQUFLLEdBQUcsQ0FBQztvQkFDVCxLQUFLLEdBQUcsQ0FBQztvQkFDVCxLQUFLLEdBQUcsQ0FBQztvQkFDVCxLQUFLLEdBQUcsQ0FBQztvQkFDVCxLQUFLLEdBQUcsQ0FBQztvQkFDVCxLQUFLLEdBQUcsQ0FBQztvQkFDVCxLQUFLLEdBQUcsQ0FBQztvQkFDVCxLQUFLLEdBQUcsQ0FBQztvQkFDVCxLQUFLLEdBQUcsQ0FBQztvQkFDVCxLQUFLLEdBQUcsQ0FBQztvQkFDVCxLQUFLLEdBQUcsQ0FBQztvQkFDVCxLQUFLLEdBQUcsQ0FBQztvQkFDVCxLQUFLLEdBQUcsQ0FBQztvQkFDVCxLQUFLLEdBQUcsQ0FBQztvQkFDVCxLQUFLLEdBQUc7d0JBQ0osSUFBSSxNQUFNLEdBQUcsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFDO3dCQUM3QixJQUFJLEdBQUcsR0FBRyxHQUFHLENBQUMsV0FBVyxFQUFFLENBQUM7d0JBQzVCLElBQUksRUFBRSxHQUFHLGFBQUssQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFLEVBQUUsQ0FBQyxDQUFDO3dCQUN6QyxJQUFJLEdBQUcsR0FBRyxhQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO3dCQUM5QixJQUFJLEVBQUUsSUFBSSxJQUFJLElBQUksR0FBRyxJQUFJLElBQUk7NEJBQ3pCLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFH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