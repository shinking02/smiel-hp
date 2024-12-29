import { Box, Button, Flex, For, Heading, Image, Stack, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { LuArrowRight } from "react-icons/lu";

const ACTIVITY_CONTENTS: {
    title: string;
    imageSrc: string;
    imageAlt: string;
    description: string;
}[] = [
    {
        title: "練習",
        imageSrc: "/activity/practice.webp",
        imageAlt: "練習中の画像",
        description: "月2回(水曜日)に練習を行っており、新しい曲に挑戦しています。叙情歌や最近の曲を交えて楽しく踊っています。",
    },
    {
        title: "発表会",
        imageSrc: "/activity/presentation.webp",
        imageAlt: "発表会後の集合写真",
        description: "年に一回(秋または春)、各地の会員が集まり、日ごろの練習の成果を発表します。",
    },
    {
        title: "ボランティア活動",
        imageSrc: "/activity/volunteer.webp",
        imageAlt: "ボランティア活動中の画像",
        description: "地域の老人福祉施設、病院、学校や学童などで披露させて頂いています。",
    },
];

export default function Home() {
    return (
        <Stack maxW={1200} p={4} gap={20} mx="auto">
            <Flex
                w="100%"
                h="calc(100dvh - 48px)"
                mt={12}
                gap={12}
                alignItems="center"
                justifyContent="center"
                flexDir={{ base: "column", lg: "row" }}
            >
                <Box w={{ base: "100%", lg: "64%" }}>
                    <Image borderRadius="md" src="/main-visual.webp" alt="レッスン中の画像" />
                </Box>
                <Flex alignItems="center" flexDir="column">
                    <Box>
                        <Heading size={{ base: "4xl", md: "6xl" }}>手話で踊ろう</Heading>
                        <Text mt={2}>
                            私たち「スマイル」は60人程度で活動している手話ダンスグループです。
                            <br />
                            名前のように笑顔で、楽しく活動しています。
                        </Text>
                    </Box>
                </Flex>
            </Flex>
            <Box w="100%">
                <Heading size={{ base: "2xl", md: "3xl" }}>活動内容</Heading>
                <Flex mt={4} flexDir="column" gap={12}>
                    <For each={ACTIVITY_CONTENTS}>
                        {(item, index) => (
                            <Flex
                                key={index}
                                gap={2}
                                alignItems="center"
                                justifyContent="space-between"
                                flexDir={{ base: "column-reverse", md: "row" }}
                            >
                                <Box w="100%">
                                    <Heading size="lg">{item.title}</Heading>
                                    <Text>{item.description}</Text>
                                </Box>
                                <Image src={item.imageSrc} alt={item.imageAlt} w={{ base: "100%", md: "420px" }} borderRadius="md" />
                            </Flex>
                        )}
                    </For>
                </Flex>
            </Box>
            <Box w="100%">
                <Heading size={{ base: "2xl", md: "3xl" }}>一緒に踊りませんか</Heading>
                <Text mt={4}>
                    手話ダンスは、年齢を問わずどなたでも楽しめます。現在、40代から80代の方々が在籍しており、ほとんどの方が手話もダンスも初めての状態から始めています。
                    <br />
                    「手話」と聞くと難しそうに感じるかもしれませんが、ダンスと一緒に覚えることで、自然と身につけることができます。
                    <br />
                    まずは見学や体験から始めてみませんか？お気軽にお問い合わせください。
                </Text>
                <Flex justifyContent="center">
                    <NextLink href="/contact">
                        <Button mt={4}>
                            お問い合わせ <LuArrowRight />
                        </Button>
                    </NextLink>
                </Flex>
            </Box>
        </Stack>
    );
}
