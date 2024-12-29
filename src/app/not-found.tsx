import { Button, Center, Heading, Link, Text, VStack } from "@chakra-ui/react";
import NextLink from "next/link";
import { LuArrowLeft, LuTelescope } from "react-icons/lu";

export default function NotFound() {
    return (
        <Center h="100dvh" px={4}>
            <VStack>
                <LuTelescope size={64} />
                <Heading>404 Not Found</Heading>
                <Text>お探しのページは見つかりませんでした</Text>
                <Link asChild>
                    <NextLink href="/">
                        <Button>
                            <LuArrowLeft /> トップへ戻る
                        </Button>
                    </NextLink>
                </Link>
            </VStack>
        </Center>
    );
}
