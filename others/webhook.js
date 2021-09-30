"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const packetids_1 = require("bdsx/bds/packetids");
const event_1 = require("bdsx/event");
const discord_webhook_ts_1 = (0, tslib_1.__importDefault)(require("discord-webhook-ts"));
const hook = new discord_webhook_ts_1.default('https://discord.com/api/webhooks/876805405739733012/lBQPahi9RwP0Lc5gKcSbJ1m4-WOrJTdytIi9V0Eobo5EpE3LPEp5Vt63WK_DhlwXxUMt');
event_1.events.packetBefore(packetids_1.MinecraftPacketIds.CommandRequest).on((p, netId) => {
    var actor = netId.getActor();
    if (actor != null) {
        try {
            hook.execute({
                content: `${actor.getName()}: ${p.command}`
            });
        }
        catch (_a) {
        }
    }
});
event_1.events.packetBefore(packetids_1.MinecraftPacketIds.Text).on((p, netId) => {
    var actor = netId.getActor();
    if (actor != null) {
        try {
            hook.execute({
                content: `${actor.getName()}: ${p.message}`
            });
        }
        catch (_a) {
        }
    }
});
event_1.events.serverClose.on(() => {
    try {
        hook.execute({
            content: `Hej, server is closed.`
        });
    }
    catch (_a) {
    }
});
event_1.events.serverOpen.on(() => {
    try {
        hook.execute({
            content: `Hej, server is on.`
        });
    }
    catch (_a) {
    }
});
event_1.events.playerJoin.on((e) => {
    try {
        hook.execute({
            content: `Hej, ${e.player.getName()} joined the server.`
        });
    }
    catch (_a) {
    }
});
event_1.events.networkDisconnected.on((ni) => {
    var actor = ni.getActor();
    if (actor != null) {
        try {
            hook.execute({
                content: `Hej, ${actor.getName()} left the game.`
            });
        }
        catch (_a) { }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2ViaG9vay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIndlYmhvb2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsa0RBQXdEO0FBQ3hELHNDQUFvQztBQUNwQyx5RkFBZ0Q7QUFFaEQsTUFBTSxJQUFJLEdBQUcsSUFBSSw0QkFBYyxDQUFDLDBIQUEwSCxDQUFDLENBQUM7QUFFNUosY0FBTSxDQUFDLFlBQVksQ0FBQyw4QkFBa0IsQ0FBQyxjQUFjLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUU7SUFDL0QsSUFBSSxLQUFLLEdBQUcsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQzdCLElBQUksS0FBSyxJQUFJLElBQUksRUFBRTtRQUNmLElBQUk7WUFDQSxJQUFJLENBQUMsT0FBTyxDQUFDO2dCQUNMLE9BQU8sRUFBRSxHQUFHLEtBQUssQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUMsT0FBTyxFQUFFO2FBQ2xELENBQUMsQ0FBQztTQUNWO1FBQUMsV0FBTTtTQUVQO0tBQ0E7QUFDVCxDQUFDLENBQUMsQ0FBQztBQUVILGNBQU0sQ0FBQyxZQUFZLENBQUMsOEJBQWtCLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBQyxFQUFFO0lBQ3BELElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUM3QixJQUFJLEtBQUssSUFBSSxJQUFJLEVBQUU7UUFDZixJQUFJO1lBQ0EsSUFBSSxDQUFDLE9BQU8sQ0FBQztnQkFDTCxPQUFPLEVBQUUsR0FBRyxLQUFLLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDLE9BQU8sRUFBRTthQUNsRCxDQUFDLENBQUM7U0FDVjtRQUFDLFdBQU07U0FFUDtLQUNBO0FBQ1QsQ0FBQyxDQUFDLENBQUM7QUFFSCxjQUFNLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUU7SUFDbkIsSUFBSTtRQUNJLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDTCxPQUFPLEVBQUUsd0JBQXdCO1NBQ3hDLENBQUMsQ0FBQztLQUNWO0lBQUMsV0FBTTtLQUVQO0FBQ1QsQ0FBQyxDQUFDLENBQUM7QUFDSCxjQUFNLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUU7SUFDbEIsSUFBSTtRQUNJLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDTCxPQUFPLEVBQUUsb0JBQW9CO1NBQ3BDLENBQUMsQ0FBQztLQUNWO0lBQUMsV0FBTTtLQUVQO0FBQ1QsQ0FBQyxDQUFDLENBQUM7QUFFSCxjQUFNLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO0lBQ25CLElBQUk7UUFDSSxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ0wsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUscUJBQXFCO1NBQy9ELENBQUMsQ0FBQztLQUNWO0lBQUMsV0FBTTtLQUVQO0FBQ1QsQ0FBQyxDQUFDLENBQUM7QUFFSCxjQUFNLENBQUMsbUJBQW1CLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUU7SUFDN0IsSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQzFCLElBQUksS0FBSyxJQUFJLElBQUksRUFBRTtRQUNuQixJQUFJO1lBQ0ksSUFBSSxDQUFDLE9BQU8sQ0FBQztnQkFDTCxPQUFPLEVBQUUsUUFBUSxLQUFLLENBQUMsT0FBTyxFQUFFLGlCQUFpQjthQUN4RCxDQUFDLENBQUM7U0FDVjtRQUFDLFdBQU0sR0FBRTtLQUFDO0FBQ25CLENBQUMsQ0FBQyxDQUFDIn0=