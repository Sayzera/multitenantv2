'use client';
import { Input } from "@/components/ui/input";
import { BookmarkCheck, BookmarkCheckIcon, ListFilterIcon, SearchIcon } from "lucide-react";
import { CategoriesSidebar } from "./categories-sidebar";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CategoriesGetManyOutput } from "@/modules/categories/types";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

interface Props {
  disabled?: boolean;
  data?:CategoriesGetManyOutput
}
export const SearchInput = ({ disabled,data }: Props) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const trpc = useTRPC()
  const session = useQuery(trpc.auth.session.queryOptions())

  return (
    <div className="flex items-center gap-2 w-full">
      <CategoriesSidebar open={isSidebarOpen} onOpenChange={setIsSidebarOpen} />
      <div className="relative w-full">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-neutral-500" />
        <Input
          className="pl-8"
          placeholder="Search products"
          {...(disabled == true
            ? {
                disabled: true,
              }
            : null)}
        />
      </div>
      <Button variant={'elevated'} 
       className="size-12 shrink-0 flex lg:hidden"
       onClick={() => {
        setIsSidebarOpen(true)
       }}
       asChild
      >
        <ListFilterIcon />

      </Button>
      {
        session.data?.user && !session.isLoading && (
          <Button variant={'elevated'} asChild>
            <Link href={'/library'} prefetch >
            <BookmarkCheckIcon /> Kütüphane
            </Link>
          </Button>
        )
      }
      {/* TODO: Add categories view all button */}
      {/* TODO: Add library button */}
    </div>
  );
};
