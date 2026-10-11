import Image from "next/image";
import Link from "next/link";
import { Brand } from "../types/brands.types";

export default function BrandCard({ brand }: { brand: Brand }) {
  return (
    <Link
      href={`/brands/${brand._id}`}
      className="group flex flex-col items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:border-primary-200 hover:shadow-lg"
    >
      <div className="relative h-20 w-full">
        <Image
          src={brand.image}
          alt={brand.name}
          fill
          sizes="(min-width:1280px) 16vw, (min-width:1024px) 20vw, (min-width:640px) 25vw, 50vw"
          className="object-contain transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <span className="text-sm font-medium text-gray-800 transition-colors group-hover:text-primary-600">
        {brand.name}
      </span>
    </Link>
  );
}