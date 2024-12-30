"use client";

import { PaginationItems, PaginationNextTrigger, PaginationPrevTrigger, PaginationRoot } from "@/components/ui/pagination";

interface BlogPaginationProps {
    totalCount: number;
    page: number;
    pageSize: number;
}

export const BlogPagination = (props: BlogPaginationProps) => {
    return (
        <PaginationRoot
            count={props.totalCount}
            page={props.page}
            defaultPage={1}
            pageSize={props.pageSize}
            getHref={(page) => `/blogs?page=${page}`}
        >
            <PaginationPrevTrigger />
            <PaginationItems />
            <PaginationNextTrigger />
        </PaginationRoot>
    );
};
