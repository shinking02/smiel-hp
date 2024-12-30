import { BlogCard } from "@/components/ui/blog-card";
import { Button } from "@/components/ui/button";
import { microCMSClient } from "@/lib/microCMSClient";
import { Box, Card, Center, Flex, For, Heading, Highlight, Image, Link, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import NextImage from "next/image";
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

const ACTIVITY_BASES: {
    imageSrc: string;
    imageAlt: string;
    locationName: string;
    placeName: string;
    prefecture: string;
    mapUrl: string;
}[] = [
    {
        imageSrc: "/base/chuo.webp",
        imageAlt: "中央区の活動場所",
        locationName: "中央区",
        placeName: "月島社会教育会館",
        prefecture: "東京都",
        mapUrl: "https://goo.gl/maps/Eai2HNUNq7Rnqi8VA",
    },
    {
        imageSrc: "/base/suginami.webp",
        imageAlt: "杉並区の活動場所",
        locationName: "杉並区",
        placeName: "高円寺ゆうゆう館",
        prefecture: "東京都",
        mapUrl: "https://goo.gl/maps/9yvzsq6NLwpt7DSk6",
    },
    {
        imageSrc: "/base/kodaira.webp",
        imageAlt: "小平市の活動場所",
        locationName: "小平市",
        placeName: "美園地域センター他",
        prefecture: "東京都",
        mapUrl: "https://goo.gl/maps/DXwji5U968diq2VC9",
    },
    {
        imageSrc: "/base/kita.webp",
        imageAlt: "北区の活動場所",
        locationName: "北区",
        placeName: "カルチャースペースミュー",
        prefecture: "東京都",
        mapUrl: "https://maps.app.goo.gl/LWy3Gsbd11oiRc6e8",
    },
    {
        imageSrc: "/base/souka.webp",
        imageAlt: "草加市の活動場所",
        locationName: "草加市",
        placeName: "草加市民体育館",
        prefecture: "埼玉県",
        mapUrl: "https://goo.gl/maps/yhsRrDe9LpWU8enw7",
    },
    {
        imageSrc: "/base/koshigaya.webp",
        imageAlt: "越谷市の活動場所",
        locationName: "越谷市",
        placeName: "越谷市北部市民会館",
        prefecture: "埼玉県",
        mapUrl: "https://goo.gl/maps/azti3qa1uvxXeK4b9",
    },
    {
        imageSrc: "/base/satte.webp",
        imageAlt: "幸手市の活動場所",
        locationName: "幸手市",
        placeName: "幸手市中央公民館",
        prefecture: "埼玉県",
        mapUrl: "https://goo.gl/maps/XWmymw9pbkTJ5E4z7",
    },
];

export default async function Home() {
    const latestBlogs: { contents: { id: string; title: string; date: string; eyecatch: { url: string } }[] } = await microCMSClient.get({
        endpoint: "blogs",
        queries: { limit: 4, fields: "id,title,date,eyecatch" },
    });

    return (
        <Stack maxW={1200} p={4} gap={20} pt={12} mx="auto">
            <Flex
                w="100%"
                h="calc(100vh - 48px)"
                gap={12}
                alignItems="center"
                justifyContent="center"
                flexDir={{ base: "column", sm: "row" }}
            >
                <Box w={{ base: "100%", sm: "64%" }}>
                    <Image borderRadius="md" src="/main-visual.webp" alt="レッスン中の画像" />
                </Box>
                <Flex alignItems="center" flexDir="column">
                    <Box>
                        <Heading size={{ base: "3xl", md: "5xl" }}>
                            <Highlight query={["手話", "踊"]} styles={{ color: "cyan.solid", fontSize: { base: "4xl", md: "6xl" } }}>
                                手話で踊ろう
                            </Highlight>
                        </Heading>
                        <Text mt={2}>
                            私たち「スマイル」は60人程度で活動している手話ダンスグループです。
                            <br />
                            名前のように笑顔で、楽しく活動しています。
                        </Text>
                    </Box>
                </Flex>
            </Flex>
            <Box w="100%">
                <Heading size={{ base: "2xl", md: "3xl" }}>ブログ</Heading>
                <SimpleGrid minChildWidth="3xs" mt={4} gap={4}>
                    <For each={latestBlogs.contents}>
                        {(item, index) => (
                            <BlogCard key={index} id={item.id} title={item.title} date={item.date} eyecatchUrl={item.eyecatch.url} />
                        )}
                    </For>
                </SimpleGrid>
                <Center>
                    <Link href="/blogs">
                        <Button mt={4}>
                            ブログ一覧 <LuArrowRight />
                        </Button>
                    </Link>
                </Center>
            </Box>
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
                                flexDir={{ base: "column-reverse", sm: "row" }}
                            >
                                <Box w="100%">
                                    <Heading size="lg">{item.title}</Heading>
                                    <Text>{item.description}</Text>
                                </Box>
                                <Image
                                    src={item.imageSrc}
                                    alt={item.imageAlt}
                                    w={{ base: "100%", sm: "260px", md: "400px" }}
                                    borderRadius="md"
                                />
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
                <Center>
                    <Link href="/contact">
                        <Button mt={4}>
                            お問い合わせ <LuArrowRight />
                        </Button>
                    </Link>
                </Center>
            </Box>
            <Box w="100%">
                <Heading size={{ base: "2xl", md: "3xl" }}>活動場所</Heading>
                <SimpleGrid minChildWidth="3xs" mt={4} gap={4}>
                    <For each={ACTIVITY_BASES}>
                        {(item, index) => (
                            <Link href={item.mapUrl} target="_blank">
                                <Card.Root key={index} size="sm" w="100%" overflow="hidden" flexDir={{ base: "row", sm: "column" }}>
                                    <Box position="relative" w={{ base: "32%", sm: "auto" }} h={{ base: "auto", sm: "180px" }}>
                                        <NextImage
                                            src={item.imageSrc}
                                            fill
                                            sizes="(max-width: 278px) 30vw, (max-width: 278px) 30vw"
                                            style={{
                                                objectFit: "cover",
                                            }}
                                            alt={item.imageAlt}
                                        />
                                    </Box>
                                    <Card.Body>
                                        <Card.Title>{item.placeName}</Card.Title>
                                        <Card.Description>
                                            {item.prefecture} {item.locationName}
                                        </Card.Description>
                                    </Card.Body>
                                </Card.Root>
                            </Link>
                        )}
                    </For>
                </SimpleGrid>
            </Box>
        </Stack>
    );
}
