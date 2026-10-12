import type { Activity } from "./activities";

interface ActivityListProps {
	activities: readonly Activity[];
}

export const ActivityList = ({ activities }: ActivityListProps) => (
	<ul className="flex flex-col gap-12 md:gap-20">
		{activities.map((activity) => (
			<li
				key={activity.id}
				className="group grid items-center gap-6 md:grid-cols-2 md:gap-12"
			>
				<img
					src={activity.image.src}
					alt={activity.image.alt}
					width={activity.image.width}
					height={activity.image.height}
					loading="lazy"
					decoding="async"
					className="aspect-video w-full rounded-2xl object-cover md:group-even:order-last"
				/>
				<div>
					<h3 className="font-bold text-xl md:text-2xl">{activity.title}</h3>
					<p className="mt-3 text-zinc-700 leading-loose">
						{activity.description}
					</p>
				</div>
			</li>
		))}
	</ul>
);
