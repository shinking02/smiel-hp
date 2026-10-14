export interface Activity {
	id: string;
	title: string;
	description: string;
	image: {
		src: string;
		alt: string;
		width: number;
		height: number;
	};
}

export const ACTIVITIES: readonly Activity[] = [
	{
		id: "practice",
		title: "練習",
		description:
			"月2回（水曜日）に練習を行っており、新しい曲に挑戦しています。叙情歌や最近の曲を交えて楽しく踊っています。",
		image: {
			src: "/images/activities/practice.webp",
			alt: "練習中の様子",
			width: 1200,
			height: 675,
		},
	},
	{
		id: "presentation",
		title: "発表会",
		description:
			"年に一回（秋または春）、各地の会員が集まり、日ごろの練習の成果を発表します。",
		image: {
			src: "/images/activities/presentation.webp",
			alt: "発表会後の集合写真",
			width: 1200,
			height: 676,
		},
	},
	{
		id: "volunteer",
		title: "ボランティア活動",
		description:
			"地域の老人福祉施設、病院、学校や学童などで披露させて頂いています。",
		image: {
			src: "/images/activities/volunteer.webp",
			alt: "ボランティア活動の様子",
			width: 1200,
			height: 675,
		},
	},
];
