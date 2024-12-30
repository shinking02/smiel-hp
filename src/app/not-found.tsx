import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { Center, Link, VStack } from "@chakra-ui/react";
import { LuArrowLeft, LuTelescope } from "react-icons/lu";

export default function NotFound() {
    return (
        <Center h="100dvh" px={4}>
            <VStack>
                <EmptyState icon={<LuTelescope />} title="404 Not Found" description="お探しのページは見つかりませんでした" />
                <Link href="/">
                    <Button>
                        <LuArrowLeft /> トップへ戻る
                    </Button>
                </Link>
            </VStack>
        </Center>
    );
}
