import { VenueCard } from "./venue-card";
import { PREFECTURES, type Venue } from "./venues";

interface VenueListProps {
	venues: readonly Venue[];
}

export const VenueList = ({ venues }: VenueListProps) => (
	<div className="flex flex-col gap-10">
		{PREFECTURES.map((prefecture) => {
			const local = venues.filter((venue) => venue.prefecture === prefecture);
			if (local.length === 0) return null;

			return (
				<div key={prefecture}>
					<h3 className="flex items-center gap-3 font-bold text-lg">
						{prefecture}
						<span aria-hidden className="h-px flex-1 bg-zinc-200" />
					</h3>
					<ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
						{local.map((venue) => (
							<VenueCard key={venue.id} venue={venue} />
						))}
					</ul>
				</div>
			);
		})}
	</div>
);
