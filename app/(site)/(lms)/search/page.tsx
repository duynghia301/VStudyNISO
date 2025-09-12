import { Suspense } from "react";
import { db } from "@/lib/db";
import { Categories } from "./_components/categories";
import { SearchInput } from "@/components/searchI-input";
import { getCourses } from "@/actions/get-courses";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { CoursesList } from "@/components/courses-list";

export const dynamic = "force-dynamic";

const Search = async ({
  searchParams,
}: {
  searchParams: Promise<{ title?: string; categoryId?: string }>;
}) => {
  const resolvedSearchParams = await searchParams;
  const { userId } = await auth();
  if (!userId) {
    redirect("/");
  }
  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const courses = await getCourses({
    userId,
    ...resolvedSearchParams,
  });

  return (
    <>
      <div className="px-6 pt-6 md:hidden md:mb-0 block">
        <Suspense>
          <SearchInput />
        </Suspense>
      </div>
      <div className="p-6 space-y-4">
        <Categories items={categories} />
        <CoursesList items={courses} />
      </div>
    </>
  );
};

export default Search;