import { MapPin } from "lucide-react";
import type { Venue } from "./venues";

interface VenueCardProps {
	venue: Venue;
}

// The photo only repeats what the facility name says, so it stays out of the
// accessible name and the link reads as the name alone.
export const VenueCard = ({ venue }: VenueCardProps) => (
	<li className="group relative flex overflow-hidden rounded-2xl border border-zinc-200 bg-white transition-shadow duration-200 hover:shadow-md has-focus-visible:outline-2 has-focus-visible:outline-brand-600 has-focus-visible:outline-offset-2 sm:flex-col">
		<img
			src={venue.imageSrc}
			alt=""
			width={800}
			height={600}
			loading="lazy"
			decoding="async"
			className="aspect-4/3 w-28 shrink-0 object-cover sm:w-full"
		/>
		<div className="flex min-w-0 flex-1 flex-col justify-center gap-1 p-4">
			<h4 className="font-bold leading-snug">
				<a
					href={venue.mapUrl}
					target="_blank"
					rel="noopener noreferrer"
					className="after:absolute after:inset-0 focus-visible:outline-none"
				>
					{venue.facility}
					<span className="sr-only">（Google マップを新しいタブで開く）</span>
				</a>
			</h4>
			<p className="flex items-center gap-1 text-sm text-zinc-600">
				<MapPin aria-hidden className="size-3.5 shrink-0 text-brand-700" />
				{venue.city}
			</p>
		</div>
	</li>
);
