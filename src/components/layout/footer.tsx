import { Box, Flex, Image, Link, Text } from "@chakra-ui/react";

export const Footer: React.FC = () => {
    return (
        <Flex w="100%" mt={16} bg="bg.inverted" py={4} justifyContent="center" color="fg.inverted" fontSize="xs">
            <Box textAlign="center">
                <Link href="/">
                    <Image w={8} h={8} src="/logo-white.svg" alt="手話ダンススマイルのロゴ" color="fg.inverted" />
                    <Text fontWeight="bold" hideBelow="sm" color="fg.inverted">
                        手話ダンススマイル
                    </Text>
                </Link>
                <Text>© 2024 手話ダンス スマイル All rights reserved.</Text>
            </Box>
        </Flex>
    );
};
