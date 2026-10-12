export const PREFECTURES = ["東京都", "埼玉県"] as const;

export type Prefecture = (typeof PREFECTURES)[number];

export interface Venue {
	id: string;
	prefecture: Prefecture;
	city: string;
	facility: string;
	mapUrl: string;
	imageSrc: string;
}

/** Images are 800px wide at 4:3, the ratio the card crops to. */
export const VENUES: readonly Venue[] = [
	{
		id: "chuo",
		prefecture: "東京都",
		city: "中央区",
		facility: "月島社会教育会館",
		mapUrl: "https://goo.gl/maps/Eai2HNUNq7Rnqi8VA",
		imageSrc: "/images/venues/chuo.webp",
	},
	{
		id: "suginami",
		prefecture: "東京都",
		city: "杉並区",
		facility: "高円寺ゆうゆう館",
		mapUrl: "https://goo.gl/maps/9yvzsq6NLwpt7DSk6",
		imageSrc: "/images/venues/suginami.webp",
	},
	{
		id: "kodaira",
		prefecture: "東京都",
		city: "小平市",
		facility: "美園地域センター ほか",
		mapUrl: "https://goo.gl/maps/DXwji5U968diq2VC9",
		imageSrc: "/images/venues/kodaira.webp",
	},
	{
		id: "kita",
		prefecture: "東京都",
		city: "北区",
		facility: "カルチャースペースミュー",
		mapUrl: "https://maps.app.goo.gl/LWy3Gsbd11oiRc6e8",
		imageSrc: "/images/venues/kita.webp",
	},
	{
		id: "souka",
		prefecture: "埼玉県",
		city: "草加市",
		facility: "草加市民体育館",
		mapUrl: "https://goo.gl/maps/yhsRrDe9LpWU8enw7",
		imageSrc: "/images/venues/souka.webp",
	},
	{
		id: "koshigaya",
		prefecture: "埼玉県",
		city: "越谷市",
		facility: "越谷市北部市民会館",
		mapUrl: "https://goo.gl/maps/azti3qa1uvxXeK4b9",
		imageSrc: "/images/venues/koshigaya.webp",
	},
	{
		id: "satte",
		prefecture: "埼玉県",
		city: "幸手市",
		facility: "幸手市中央公民館",
		mapUrl: "https://goo.gl/maps/XWmymw9pbkTJ5E4z7",
		imageSrc: "/images/venues/satte.webp",
	},
];
