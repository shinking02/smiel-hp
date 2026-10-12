import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ACTIVITIES } from "@/components/activity/activities";
import { ActivityList } from "@/components/activity/activity-list";
import { BlogCardList } from "@/components/blog/blog-card-list";
import { Hero } from "@/components/home/hero";
import { JoinInvitation } from "@/components/home/join-invitation";
import { BLOG_NAV } from "@/components/layout/navigation";
import { Section } from "@/components/ui/section";
import { VenueList } from "@/components/venue/venue-list";
import { VENUES } from "@/components/venue/venues";
import { getLatestPosts } from "@/server/blog";

export const revalidate = 3600;

const LATEST_POST_COUNT = 4;

const BlogIndexLink = () => (
	<Link
		href={BLOG_NAV.href}
		className="group inline-flex items-center gap-1 rounded-sm font-semibold text-brand-700 text-sm hover:text-brand-800"
	>
		{BLOG_NAV.label}一覧
		<ArrowRight
			aria-hidden
			className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
		/>
	</Link>
);

const Home = async () => {
	const posts = await getLatestPosts(LATEST_POST_COUNT);

	return (
		<>
			<Hero />
			<Section id="activities" title="活動内容">
				<ActivityList activities={ACTIVITIES} />
			</Section>
			<Section id="venues" title="活動場所" tone="muted">
				<VenueList venues={VENUES} />
			</Section>
			{posts.length > 0 && (
				<Section id="blog" title="最新のブログ" action={<BlogIndexLink />}>
					<BlogCardList posts={posts} />
				</Section>
			)}
			<JoinInvitation />
		</>
	);
};

export default Home;
