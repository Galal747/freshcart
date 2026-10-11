import Link from "next/link";
import BrandCard from "../components/BrandCard";
import getAllBrands from "../services/getAllBrands";

export default async function BrandsScreen() {
  const { data: brands } = await getAllBrands();

  return (
    <section className="bg-gray-50 py-8 sm:py-10">
      <div className="container mx-auto px-4">
        <nav className="mb-4 flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="transition hover:text-primary-600">
            Home
          </Link>
          <span>/</span>
          <span className="font-medium text-gray-900">Brands</span>
        </nav>

        <h1 className="text-3xl font-bold text-gray-900">
          Shop by <span className="text-primary-600">Brand</span>
        </h1>
        <p className="mb-8 mt-2 text-gray-500">
          Browse products from your favorite brands
        </p>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
          {brands.map((brand) => (
            <BrandCard key={brand._id} brand={brand} />
          ))}
        </div>
      </div>
    </section>
  );
}