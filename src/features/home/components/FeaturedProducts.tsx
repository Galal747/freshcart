import ProductCard from "@/features/products/components/ProductCard";
import getAllProducts from "@/features/products/services/getAllProducts";
import Reveal from "@/components/Animations/Reveal";

export default async function FeaturedProducts() {
  const productsResponse = await getAllProducts();

  return (
    <section aria-labelledby="featured-heading" className="py-8 sm:py-12">
      <div className="container">
        <Reveal from="left">
          <div className="mb-6 flex items-center gap-3 sm:mb-8">
            <span className="h-8 w-1 rounded-full bg-primary-600 sm:h-9" />
            <div className="min-w-0">
              <h2
                id="featured-heading"
                className="text-xl font-bold text-gray-800 sm:text-2xl lg:text-3xl"
              >
                Featured <span className="text-primary-600">Products</span>
              </h2>
              <p className="mt-1 text-sm text-gray-500 sm:text-base">
                Browse our best picks for you
              </p>
            </div>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5">
          {productsResponse.data.map((product, index) => (
            <Reveal key={product.id} delay={Math.min(index, 10) * 0.05}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}