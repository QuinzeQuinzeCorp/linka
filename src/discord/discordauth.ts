import { DiscordOAuth2 } from "./DiscordOAuth2";

const discordAuth = new DiscordOAuth2({
	scopes: ['identify', 'guilds'],
	clientId: process.env.DISCORD_CLIENT_ID,
	clientSecret: process.env.DISCORD_CLIENT_SECRET,
	redirectUri: process.env.DISCORD_REDIRECT_URI,
});

export { discordAuth };