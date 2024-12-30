import { EmptyState } from "@/components/ui/empty-state";
import { Button, Center, Link, VStack } from "@chakra-ui/react";
import NextLink from "next/link";
import { LuArrowLeft, LuTelescope } from "react-icons/lu";

export default function NotFound() {
    return (
        <Center h="100dvh" px={4}>
            <VStack>
                <EmptyState icon={<LuTelescope />} title="404 Not Found" description="お探しのページは見つかりませんでした" />
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
