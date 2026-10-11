import Productinfo from "../components/productDetails/Productinfo";
import { getSpecificProduct } from "../services/getSpecificProduct";

export default async function ProductDetailsScreen({ id }: { id: string }) {
  const productDetailsResponse = await getSpecificProduct(id);

  return (
    <section className="py-6 sm:py-10">
      <div className="container">
        <Productinfo productInfo={productDetailsResponse.data} />
      </div>
    </section>
  );
}