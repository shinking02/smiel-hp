import { BlogCard } from "@/components/blog-card";
import { microCMSClient } from "@/lib/microCMSClient";
import { For, Heading, SimpleGrid, Stack } from "@chakra-ui/react";

const PAGE_SIZE = 10;

export default async function Blogs({ searchParams }: { searchParams: { page: string } }) {
    const page = Number(searchParams.page) || 1;
    const blogs: { contents: { id: string; title: string; date: string; eyecatch: { url: string } }[] } = await microCMSClient.get({
        endpoint: "blogs",
        queries: { offset: (page - 1) * PAGE_SIZE, limit: PAGE_SIZE, fields: "id,title,date,eyecatch" },
    });

    return (
        <Stack maxW={1200} p={4} gap={6} pt={16} mx="auto">
            <Heading size={{ base: "2xl", md: "3xl" }}>ブログ一覧</Heading>
            <SimpleGrid minChildWidth="3xs" gap={4}>
                <For each={blogs.contents}>
                    {(item, index) => (
                        <BlogCard key={index} id={item.id} title={item.title} date={item.date} eyecatchUrl={item.eyecatch.url} />
                    )}
                </For>
            </SimpleGrid>
        </Stack>
    );
}
