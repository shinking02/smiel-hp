import type { ReactNode } from "react";

type Tone = "plain" | "muted";

const TONES: Record<Tone, string> = {
	plain: "bg-white",
	muted: "bg-zinc-50",
};

interface SectionProps {
	/** Doubles as the in-page anchor and the prefix of the heading id. */
	id: string;
	title: string;
	/** Sits opposite the heading, e.g. a link to the full listing. */
	action?: ReactNode;
	tone?: Tone;
	children: ReactNode;
}

export const Section = ({
	id,
	title,
	action,
	tone = "plain",
	children,
}: SectionProps) => {
	const titleId = `${id}-title`;

	return (
		<section
			id={id}
			aria-labelledby={titleId}
			className={`scroll-mt-16 ${TONES[tone]}`}
		>
			<div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
				<div className="flex flex-wrap items-end justify-between gap-4">
					<h2 id={titleId} className="font-bold text-2xl md:text-3xl">
						{title}
					</h2>
					{action}
				</div>
				<div className="mt-8 md:mt-12">{children}</div>
			</div>
		</section>
	);
};
