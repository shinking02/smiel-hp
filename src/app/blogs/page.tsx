import { BlogCard } from "@/components/ui/blog-card";
import { microCMSClient } from "@/lib/microCMSClient";
import { Flex, For, Heading, SimpleGrid, Stack } from "@chakra-ui/react";
import { BlogPagination } from "./blog-pagenation";

const PAGE_SIZE = 12;
type BlogsParams = Promise<{ page?: string }>;

export default async function Blogs(props: { searchParams: BlogsParams }) {
    const searchParams = await props.searchParams;
    const page = Number(searchParams.page) || 1;
    const blogs: { contents: { id: string; title: string; date: string; eyecatch: { url: string } }[]; totalCount: number } =
        await microCMSClient.get({
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
            <Flex w="100%" justify="center">
                <BlogPagination totalCount={blogs.totalCount} page={page} pageSize={PAGE_SIZE} />
            </Flex>
        </Stack>
    );
}
