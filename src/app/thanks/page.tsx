import { Button, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import { LuArrowLeft } from "react-icons/lu";

export default function Thanks() {
    return (
        <Stack maxW={800} p={4} gap={12} pt={12} mx="auto">
            <Stack gap={4}>
                <Heading size={{ base: "2xl", md: "3xl" }}>お問い合わせ完了</Heading>
                <Text mt={4}>
                    このたびはお問い合わせいただき、誠にありがとうございます。
                    <br />
                    通常、3日以内にご連絡を差し上げておりますが、万が一ご連絡がない場合は、迷惑メールフォルダをご確認いただき、お手数をおかけいたしますが、再度お問い合わせいただけますと幸いです。
                </Text>
                <Flex justifyContent="center">
                    <Button>
                        <LuArrowLeft /> トップへ戻る
                    </Button>
                </Flex>
            </Stack>
        </Stack>
    );
}