import { microCMSClient } from "@/lib/microCMSClient";
import { Box, Center, Heading, Stack, Text } from "@chakra-ui/react";
import NextImage from "next/image";
import React from "react";
import BlogBackButton from "./blog-back-button";

type BlogParams = Promise<{ id: string }>;

// HTML内の画像をNext.js Imageに変換する関数
const optimizeImagesInHTML = (html: string): React.ReactNode => {
    if (!html) return null;

    const imgRegex = /<img.*?src="([^"]*)".*?>/g;
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    let match;
    let key = 0;

    while ((match = imgRegex.exec(html)) !== null) {
        if (match.index > lastIndex) {
            const beforeContent = html.slice(lastIndex, match.index);
            if (beforeContent.trim()) {
                parts.push(<div key={`html-${key++}`} dangerouslySetInnerHTML={{ __html: beforeContent }} />);
            }
        }

        const src = match[1];
        const fullMatch = match[0];
        const altMatch = fullMatch.match(/alt="([^"]*)"/);
        const alt = altMatch ? altMatch[1] : "";

        parts.push(
            <Box key={`img-${key++}`} position="relative" w="100%" h="auto" my={6} borderRadius="md" overflow="hidden">
                <NextImage
                    src={src}
                    alt={alt}
                    width={800}
                    height={400}
                    style={{
                        width: "100%",
                        height: "auto",
                        borderRadius: "var(--chakra-radii-md)",
                    }}
                />
            </Box>,
        );

        lastIndex = imgRegex.lastIndex;
    }

    // 残りのHTML部分を追加
    if (lastIndex < html.length) {
        const remainingContent = html.slice(lastIndex);
        if (remainingContent.trim()) {
            parts.push(<div key={`html-${key++}`} dangerouslySetInnerHTML={{ __html: remainingContent }} />);
        }
    }

    return parts.length > 0 ? parts : <div dangerouslySetInnerHTML={{ __html: html }} />;
};

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
            <Box css={{ "& p": { marginY: 4 } }}>{optimizeImagesInHTML(blog.content)}</Box>
            <Center>
                <BlogBackButton />
            </Center>
        </Stack>
    );
}
