import { MinecraftPacketIds } from "bdsx/bds/packetids";
import { events } from "bdsx/event";
import DiscordWebhook from "discord-webhook-ts";

const hook = new DiscordWebhook('https://discord.com/api/webhooks/876805405739733012/lBQPahi9RwP0Lc5gKcSbJ1m4-WOrJTdytIi9V0Eobo5EpE3LPEp5Vt63WK_DhlwXxUMt');

events.packetBefore(MinecraftPacketIds.CommandRequest).on((p, netId) => {
        var actor = netId.getActor();
        if (actor != null) {
            try {
                hook.execute({
                        content: `${actor.getName()}: ${p.command}`
                });
        } catch {

        }
        }
});

events.packetBefore(MinecraftPacketIds.Text).on((p, netId)=>{
        var actor = netId.getActor();
        if (actor != null) {
            try {
                hook.execute({
                        content: `${actor.getName()}: ${p.message}`
                });
        } catch {

        }
        }
});

events.serverClose.on(() => {
        try {
                hook.execute({
                        content: `Hej, server is closed.`
                });
        } catch {

        }
});
events.serverOpen.on(() => {
        try {
                hook.execute({
                        content: `Hej, server is on.`
                });
        } catch {

        }
});

events.playerJoin.on((e) => {
        try {
                hook.execute({
                        content: `Hej, ${e.player.getName()} joined the server.`
                });
        } catch {

        }
});

events.networkDisconnected.on((ni) => {
        var actor = ni.getActor();
        if (actor != null) {
        try {
                hook.execute({
                        content: `Hej, ${actor.getName()} left the game.`
                });
        } catch {}}
});

