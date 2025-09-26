import { ScrollArea } from "@/components/ui/scroll-area";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { useState } from "react";
import {  ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { CategoriesGetManyOutput, CategoriesGetManyOutputSingle } from "@/modules/categories/types";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
export const CategoriesSidebar = ({ open, onOpenChange }: Props) => {
  const trpc = useTRPC();
  const {data} = useQuery(trpc.categories.getMany.queryOptions())

  const router = useRouter();
  const [parentCategories, setParentCategories] = useState<
    CategoriesGetManyOutput | null 
  >(null);
  const [selectedCategories, setSelectedCategories] =
    useState<CategoriesGetManyOutput[1] | null>(null);

  // if we have parent categories, show those otherwise show root categories

  const currentCategories = parentCategories ?? data ?? [];

  const handleOpenChange = (open:boolean) => {
    setSelectedCategories(null)
    setParentCategories(null)
    onOpenChange(open)
}

  const handleCategoryClick = (category: CategoriesGetManyOutput[1]) => {
    if (category.subcategories && category.subcategories.length > 0) {
      setParentCategories(category.subcategories as unknown as CategoriesGetManyOutput);
      setSelectedCategories(category);
    } else {
      // this is a leaf category (no subcategories)

      if (parentCategories && selectedCategories) {
        // this is a subcategory - navigate to category/subcategory
        router.push(`/${selectedCategories.slug}/${category.slug}`)
      } else {
        // This is a main category - navigate to category
        if(category.slug == 'all') {
            router.push('/')
        } else {
            router.push(`${category.slug}`)
        }
      }

      handleOpenChange(false)
    }
  };

  const handleBackClick = () => {
     if(parentCategories) {
        setParentCategories(null)
        setSelectedCategories(null)

     }
  }

  const backgroundColor = selectedCategories?.color || 'white';



  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="left"
        className="p-0 transition-none"
        style={{  backgroundColor }}
        
      >
        <SheetHeader className="p-4 border-b">
          <SheetTitle>Categories</SheetTitle>
        </SheetHeader>
        <ScrollArea className="flex flex-col overflow-y-auto h-full pb-2">
          {parentCategories && (
            <button
              onClick={() => {
                handleBackClick()
              }}
              className="full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium w-full"
            >
              <ChevronLeftIcon className="size-4 mr-2" />
              Back
            </button>
          )}

          {currentCategories?.map((category) => {
            return (
                 <button
              key={category.slug}
              className="full text-left p-4 hover:bg-black hover:text-white flex text-base  justify-between font-medium w-full"
              onClick={() => {
                handleCategoryClick(category);
              }}
            >
              {category.name}
              {(category.subcategories && category.subcategories.length > 0) && (
                <ChevronRightIcon />
              )}
            </button>
            )
          })}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
