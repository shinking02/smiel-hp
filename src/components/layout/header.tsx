import { Flex, Heading, HStack, Image, Link, Text } from "@chakra-ui/react";

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
            bg="linear-gradient(to bottom, rgba(255, 255, 255, 1) 20%, rgba(255, 255, 255, 0.7) 100%)"
            backdropFilter="blur(5px)"
            zIndex={100}
        >
            <Link href="/">
                <Image w={8} h={8} src="/logo.svg" alt="手話ダンススマイルのロゴ" />
                <Text fontWeight="bold" hideBelow="sm">
                    手話ダンススマイル
                </Text>
            </Link>
            <HStack gap={4}>
                <Link href="/blogs">
                    <Heading size="sm">ブログ</Heading>
                </Link>
                <Link href="/contact">
                    <Heading size="sm">お問い合わせ</Heading>
                </Link>
            </HStack>
        </Flex>
    );
};
