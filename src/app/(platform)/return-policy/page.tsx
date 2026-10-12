import { IconRefresh } from "@tabler/icons-react";
import LegalLayout from "@/features/legal/components/LegalLayout";
import { returnSections } from "@/features/legal/content/returns";

export const metadata = { title: "Return Policy | FreshCart" };

export default function ReturnPolicyPage() {
  return (
    <LegalLayout
      icon={IconRefresh}
      title="Return Policy"
      subtitle="Easy 14-day returns on eligible products"
      updated="October 12, 2026"
      current="/return-policy"
      sections={returnSections}
    />
  );
}