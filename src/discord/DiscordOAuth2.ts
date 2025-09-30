type Scope =
	| 'identify'
	| 'email'
	| 'connections'
	| 'guilds'
	| 'guilds.join'
	| 'gdm.join'
	| 'messages.read'
	| 'rpc'
	| 'rpc.api'
	| 'rpc.notifications.read'
	| 'webhook.incoming';

type DiscordOAuth2Options = {
	scopes: Scope[];
	clientId?: string;
	clientSecret?: string;
	redirectUri?: string;
}

class DiscordOAuth2 {
	authorizeUrl = 'https://discord.com/api/oauth2/authorize'
	tokenUrl = 'https://discord.com/api/oauth2/token'
	constructor(public options: DiscordOAuth2Options) {
		const { scopes, clientId, clientSecret, redirectUri } = options;
		if (!clientId) {
			if (!process.env.DISCORD_CLIENT_ID) throw new Error('No clientId provided');
			this.options.clientId = process.env.DISCORD_CLIENT_ID;
		}
		if (!clientSecret) {
			if (!process.env.DISCORD_CLIENT_SECRET) throw new Error('No clientSecret provided');
			this.options.clientSecret = process.env.DISCORD_CLIENT_SECRET;
		}
		if (!redirectUri) {
			if (!process.env.DISCORD_REDIRECT_URI) throw new Error('No redirectUri provided');
			this.options.redirectUri = process.env.DISCORD_REDIRECT_URI;
		}
	}

	getAuthorizeUrl(state?: string) {
		const url = new URL(this.authorizeUrl);
		url.searchParams.append('client_id', this.options.clientId!);
		url.searchParams.append('redirect_uri', this.options.redirectUri!);
		url.searchParams.append('response_type', 'code');
		url.searchParams.append('scope', this.options.scopes.join(' '));
		if (state) url.searchParams.append('state', state);
		return url.toString();
	}

	async getToken(code: string) {
		const params = new URLSearchParams();
		params.append('client_id', this.options.clientId!);
		params.append('client_secret', this.options.clientSecret!);
		params.append('grant_type', 'authorization_code');
		params.append('code', code);
		params.append('redirect_uri', this.options.redirectUri!);
		const res = await fetch(this.tokenUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: params.toString(),
		});
		if (!res.ok) {
			const error = await res.json();
			throw new Error(`Error fetching token: ${error.error} - ${error.error_description}`);
		}
		return res.json();
	}

	async refreshToken(refreshToken: string) {
		const params = new URLSearchParams();
		params.append('client_id', this.options.clientId!);
		params.append('client_secret', this.options.clientSecret!);
		params.append('grant_type', 'refresh_token');
		params.append('refresh_token', refreshToken);
		const res = await fetch(this.tokenUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: params.toString(),
		});
		if (!res.ok) {
			const error = await res.json();
			throw new Error(`Error refreshing token: ${error.error} - ${error.error_description}`);
		}
		return res.json();
	}

	async revokeToken(token: string) {
		const params = new URLSearchParams();
		params.append('client_id', this.options.clientId!);
		params.append('client_secret', this.options.clientSecret!);
		params.append('token', token);
		const res = await fetch('https://discord.com/api/oauth2/token/revoke', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: params.toString(),
		});

		if (!res.ok) {
			const error = await res.json();
			throw new Error(`Error revoking token: ${error.error} - ${error.error_description}`);
		}
		return res.json();
	}

	async getUser(token: string) {
		const res = await fetch('https://discord.com/api/users/@me', {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		if (!res.ok) {
			const error = await res.json();
			throw new Error(`Error fetching user: ${error.message}`);
		}
		return res.json();
	}
}

export { DiscordOAuth2 };