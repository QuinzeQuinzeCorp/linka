import { discordAuth } from "@/discord/discordauth";
import { NextRequest, NextResponse } from "next/server";




async function GET(req: NextRequest, res: NextResponse) {
	if (!process.env.DISCORD_CLIENT_ID || !process.env.DISCORD_CLIENT_SECRET || !process.env.DISCORD_REDIRECT_URI) {
		return NextResponse.json({ error: 'Missing environment variables' }, { status: 500 });
	}
	if (req.nextUrl.searchParams.get("error")) {
		const error = req.nextUrl.searchParams.get("error");
		const errorDescription = req.nextUrl.searchParams.get("error_description");
		return NextResponse.json({ error, errorDescription }, { status: 400 });
	}
	if (req.nextUrl.searchParams.get("code")) {
		const code = req.nextUrl.searchParams.get("code")!;
		return discordAuth.getToken(code)
			.then(token => {
				const url = new URL(process.env.FRONTEND_URL!);
				url.pathname = '/auth/callback';
				url.searchParams.append('access_token', token.access_token);
				url.searchParams.append('refresh_token', token.refresh_token);
				url.searchParams.append('expires_in', token.expires_in.toString());

				
				return NextResponse.redirect(url);
			})
			.catch(err => {
				return NextResponse.json({ error: err.message }, { status: 500 });
			});
	}
	const url = discordAuth.getAuthorizeUrl();
	return NextResponse.redirect(url);
}

export { GET };