import AddressesManager from "@/features/account/components/AddressesManager";
import { getAddresses } from "@/features/account/server/account.action";

export default async function AddressesPage() {
  const res = await getAddresses();

  if (!res.success) {
    return <p className="py-10 text-center text-red-600">{res.message}</p>;
  }

  return <AddressesManager addresses={res.data} />;
}