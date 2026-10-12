import { IconFileText } from "@tabler/icons-react";
import LegalLayout from "@/features/legal/components/LegalLayout";
import { termsSections } from "@/features/legal/content/terms";

export const metadata = { title: "Terms of Service | FreshCart" };

export default function TermsOfServicePage() {
  return (
    <LegalLayout
      icon={IconFileText}
      title="Terms of Service"
      subtitle="The rules for using FreshCart"
      updated="October 12, 2026"
      current="/terms-of-service"
      sections={termsSections}
    />
  );
}