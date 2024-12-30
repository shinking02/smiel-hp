import { microCMSClient } from "@/lib/microCMSClient";
import { Box, Center, Heading, Stack, Text } from "@chakra-ui/react";
import NextImage from "next/image";
import BlogBackButton from "./blog-back-button";

type BlogParams = Promise<{ id: string }>;

export default async function Blog(props: { params: BlogParams }) {
    const params = await props.params;
    const blog = await microCMSClient.get({ endpoint: `blogs/${params.id}` });
    const date = new Date(new Date(blog.date).toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" }));

    return (
        <Stack maxW={800} p={4} gap={4} pt={16} mx="auto">
            <Box>
                <Heading size={{ base: "2xl", md: "3xl" }}>{blog.title}</Heading>
                <Text color="fg.muted">{`${date.getFullYear()}年 ${date.getMonth() + 1}月${date.getDate()}日`}</Text>
            </Box>
            <Box position="relative" w="100%" h={{ base: 280, sm: 480 }} borderRadius="md" overflow="hidden">
                <NextImage src={blog.eyecatch.url} fill style={{ objectFit: "cover" }} alt={`${blog.title}のサムネイル`} />
            </Box>
            <Box
                dangerouslySetInnerHTML={{ __html: blog.content }}
                css={{ "& img": { marginY: 6, borderRadius: "md" }, "& p": { marginY: 4 } }}
            />
            <Center>
                <BlogBackButton />
            </Center>
        </Stack>
    );
}
