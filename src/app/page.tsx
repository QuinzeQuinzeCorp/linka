import Image from "next/image";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
		<div>
					<h1>Login with Discord</h1>
		<a href="/api/auth">
			<Image
				src="/vercel.svg"
				alt="Login with Discord"
				width={40}
				height={40}
				className="hover:opacity-80 transition-opacity"
			/>
		</a>

		</div>
    </div>
  );
}
