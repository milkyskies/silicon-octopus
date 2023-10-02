import { REST, Routes, Client, GatewayIntentBits } from 'discord.js';

const TOKEN = Bun.env.DISCORD_TOKEN;
const CLIENT_ID = Bun.env.DISCORD_CLIENT_ID;

if (!TOKEN) {
  throw new Error('Missing DISCORD_TOKEN');
}

if (!CLIENT_ID) {
  throw new Error('Missing DISCORD_CLIENT_ID');
}

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const commands = [
  {
    name: 'ping',
    description: 'Replies with Pong!',
  },
];

const rest = new REST({ version: '10' }).setToken(TOKEN);

try {
  console.log('Started refreshing application (/) commands.');

  await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });

  console.log('Successfully reloaded application (/) commands.');
} catch (error) {
  console.error(error);
}

client.on('ready', () => {
  if (!client.user) return;

  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'ping') {
    await interaction.reply('Pong!');
  }
});

client.login(TOKEN);
