"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { LuArrowLeft } from "react-icons/lu";

export default function BlogBackButton() {
    const router = useRouter();

    const handleBack = () => {
        if (window.history.length > 1) {
            router.back();
        } else {
            router.push("/blogs");
        }
    };

    return (
        <Button onClick={handleBack}>
            <LuArrowLeft /> 戻る
        </Button>
    );
}
