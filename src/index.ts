import { Client, Events, GatewayIntentBits } from "discord.js";

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});
const wordlePattern = /Wordle (\d{0,3}(,?)\d{1,3}) (🎉 ?)?([X1-6])\/6/;

type WordleResult = {
    discordId: string;  
    userName: string;
    gameNumber: number;
    attempts: string;
};

let wordleResults : WordleResult[] = [];

client.once(Events.ClientReady, async (readyClient) => {
    console.log(`Logged in as ${readyClient.user?.tag}`);
});

client.on(Events.MessageCreate, async (message) => {
    console.log(`${message.author.tag} said ${message.content}`); 
});

await client.login(process.env.DISCORD_BOT_TOKEN);

function parseWordleResult(message: any): WordleResult | undefined {
    const userName = message.author.userName;
    const discordId = message.author.id;
    const match = wordlePattern.exec(message.content);

    if (match) {
        const gameNumber = parseInt(match[1].replace(/,/g, ''));
        const attempts = match[4];
        return {
            discordId,
            userName,
            gameNumber,
            attempts,
        };
    }
    return undefined;
}
