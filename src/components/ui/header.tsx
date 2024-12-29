import { Flex, Heading, HStack, Image, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";

export const Header: React.FC = () => {
    return (
        <Flex
            w="100%"
            h={12}
            py={2}
            px={4}
            justifyContent="space-between"
            position="fixed"
            top={0}
            left={0}
            bg="rgba(255, 255, 255, 0.8)"
            backdropFilter="blur(5px)"
            zIndex={100}
        >
            <Link asChild>
                <NextLink href="/">
                    <Image w={8} h={8} src="/logo.svg" alt="手話ダンススマイルのロゴ" />
                    <Text fontWeight="bold" hideBelow="sm">
                        手話ダンススマイル
                    </Text>
                </NextLink>
            </Link>
            <HStack gap={4}>
                <Link asChild>
                    <NextLink href="/blogs">
                        <Heading size="sm">ブログ</Heading>
                    </NextLink>
                </Link>
                <Link asChild>
                    <NextLink href="/contact">
                        <Heading size="sm">お問い合わせ</Heading>
                    </NextLink>
                </Link>
            </HStack>
        </Flex>
    );
};
