import ProductDetailsScreen from "@/features/products/screens/ProductDetailsScreen";

type Props = {params: Promise<{id:string}>}

export default async function ProductDetailsPage({params}: Props) {
  const {id} = await params;

  return <>
    <ProductDetailsScreen id={id}/>
  </>
}