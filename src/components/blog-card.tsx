import { Box, Card, Link } from "@chakra-ui/react";
import NextImage from "next/image";

interface BlogCardProps {
    id: string;
    title: string;
    date: string;
    eyecatchUrl: string;
}

export const BlogCard = ({ id, title, date, eyecatchUrl }: BlogCardProps) => {
    return (
        <Link href={`/blogs/${id}`}>
            <Card.Root size="sm" w="100%" overflow="hidden" flexDir={{ base: "row", sm: "column" }}>
                <Box position="relative" w={{ base: "32%", sm: "auto" }} h={{ base: "auto", sm: "180px" }}>
                    <NextImage
                        src={eyecatchUrl}
                        fill
                        style={{
                            objectFit: "cover",
                        }}
                        alt={`${title}のサムネイル`}
                    />
                </Box>
                <Card.Body>
                    <Card.Title truncate>{title}</Card.Title>
                    <Card.Description>{new Date(date).toLocaleDateString()}</Card.Description>
                </Card.Body>
            </Card.Root>
        </Link>
    );
};
