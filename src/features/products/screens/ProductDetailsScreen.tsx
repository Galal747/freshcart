import Productinfo from "../components/productDetails/Productinfo";
import { getSpecificProduct } from "../services/getSpecificProduct";
import Reveal from "@/components/Animations/Reveal";

export default async function ProductDetailsScreen({ id }: { id: string }) {
  const productDetailsResponse = await getSpecificProduct(id);

  return (
    <section className="min-h-screen bg-gray-50 py-8 sm:py-12">
      <div className="container mx-auto px-4">
        <Reveal from="bottom">
          <Productinfo productInfo={productDetailsResponse.data} />
        </Reveal>
      </div>
    </section>
  );
}