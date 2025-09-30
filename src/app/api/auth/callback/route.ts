import { NextRequest, NextResponse } from "next/server";

//http://localhost:3000/auth/callback?access_token=OTUzNDExMDc5MzkwNzg5Njk2.JtoKPjCs9ugyhA7esbKq3antW9aAwO&refresh_token=XF1Sn8gnWTwk31kOoyj24XwGDU5ySD&expires_in=604800
async function GET(req: NextRequest, res: NextResponse) {
	const { searchParams } = req.nextUrl;
	const accessToken = searchParams.get("access_token");
	const refreshToken = searchParams.get("refresh_token");
	const expiresIn = searchParams.get("expires_in");

	if (!accessToken || !refreshToken || !expiresIn) {
		return NextResponse.json({ error: "Missing query parameters" }, { status: 400 });
	}

	// Here you would typically handle the tokens, e.g., save them to a database

	return NextResponse.json({ message: "Callback received" });
}