"use client";

import { Button } from "@/components/button";
import { Field } from "@/components/field";
import { Flex, Heading, Input, Stack, Text, Textarea } from "@chakra-ui/react";
import { useState } from "react";
import { LuSend } from "react-icons/lu";

export default function Contact() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    return (
        <Stack maxW={800} p={4} gap={12} pt={16} mx="auto">
            <Stack gap={4}>
                <Heading size={{ base: "2xl", md: "3xl" }}>お問い合わせ</Heading>
                <Text mt={4}>
                    興味を持っていただき、ありがとうございます。
                    <br />
                    お問い合わせは下記のフォームよりお願い致します。 なお、入力いただいた情報はお問い合わせ以外には使用しません。
                </Text>
            </Stack>
            <form method="post" action="https://hyperform.jp/api/rdF6BWRW">
                <Stack gap={4}>
                    <Field label="お名前" required>
                        <Input placeholder="山田太郎" value={name} type="text" name="name" onChange={(e) => setName(e.target.value)} />
                    </Field>
                    <Field label="メールアドレス" required>
                        <Input
                            placeholder="example@example.com"
                            value={email}
                            type="email"
                            name="email" // HyperFormでemailで受け取る
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Field>
                    <Field label="お問い合わせ内容" required>
                        <Textarea h={200} value={message} name="message" onChange={(e) => setMessage(e.target.value)} />
                    </Field>
                    <Flex justifyContent="center">
                        <Button type="submit" disabled={!name || !email || !message}>
                            送信 <LuSend />
                        </Button>
                    </Flex>
                </Stack>
            </form>
        </Stack>
    );
}
