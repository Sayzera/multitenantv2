"use client";
import { SearchInput } from "./search-input";
import { Categories } from "./categories";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { DEFAULT_BG_COLOR } from "@/modules/home/constants";
import {BreadcrumbNavigation} from "./breadcrumb-navigation";

interface SearchFiltersProps {}
export const SearchFilters = ({}: SearchFiltersProps) => {
  const params = useParams();
  const categoryParam = params.category as string ||undefined;
  const activeCategory = categoryParam || 'all';


  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.categories.getMany.queryOptions());
 
 
  const activeCategoryData = data.find((category) => category.slug === activeCategory);

  const activeCategoryColor = activeCategoryData?.color as string || DEFAULT_BG_COLOR;
  const activeCategoryName = activeCategoryData?.name || null;

  const activeSubcategory = params.subcategory as string | undefined;
  const activeSubcategoryName = activeCategoryData?.subcategories?.find(
    (subcategory) => subcategory.slug === activeSubcategory
  )?.name || null;



  return (
    <div className="px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full" style={{
      backgroundColor: activeCategoryColor,
    }}>
      <SearchInput disabled={false} data={data} />
      <div className="hidden lg:block">
        <Categories data={data} />
      </div>

      <BreadcrumbNavigation
        activeCategory={activeCategory}
        activeCategoryName={activeCategoryName}
        activeSubcategoryName={activeSubcategoryName} 
      />
    </div>
  );
};

export const SearchFiltersSkeleton = () => {
  return (
    <div
      className="px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full"
      style={{
        backgroundColor: "#F5F5F5",
      }}
    >
      <SearchInput disabled={false} />

      <div className="hidden lg:block">
        <div className="h-11"></div>
      </div>
    </div>
  );
};
