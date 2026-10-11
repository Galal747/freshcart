import { getAllCategories } from "@/features/categories/services/getAllCategories";
import CategoriesSlider from "./CategoriesSlider"; 


const skeletonVisibility = [
  "",
  "",
  "hidden min-[480px]:block",
  "hidden md:block",
  "hidden lg:block",
  "hidden lg:block",
];

export function CategoriesSkeleton() {
  return (
    <section aria-busy="true" className="py-10 sm:py-12 lg:py-14">
      <div className="container mx-auto">
        <div className="mb-6 sm:mb-8">
          <div className="h-7 w-48 animate-pulse rounded-md bg-gray-200" />
          <div className="mt-2 h-4 w-64 animate-pulse rounded-md bg-gray-100" />
        </div>

        <div className="grid grid-cols-2 gap-3 min-[480px]:grid-cols-3 md:grid-cols-4 md:gap-4 lg:grid-cols-6">
          {skeletonVisibility.map((visibility, index) => (
            <div
              key={index}
              className={`rounded-2xl border border-gray-200 bg-white p-3 sm:p-4 ${visibility}`}
            >
              <div className="aspect-square w-full animate-pulse rounded-xl bg-gray-200" />
              <div className="mx-auto mt-3 h-4 w-2/3 animate-pulse rounded-md bg-gray-200" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


export default async function HomeCategories() {
  let categories: Awaited<ReturnType<typeof getAllCategories>>["data"] = [];

  try {
    const categoriesResponse = await getAllCategories();
    categories = categoriesResponse.data;
  } catch (error) {
    console.error("Failed to load categories:", error);

    return (
      <section className="py-10 sm:py-12">
        <div className="container mx-auto">
          <div
            role="alert"
            className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-center text-sm font-medium text-red-700"
          >
            We couldn&apos;t load the categories right now. Please try again
            later.
          </div>
        </div>
      </section>
    );
  }

  if (!categories?.length) return null;

  return <CategoriesSlider categories={categories} />;
}