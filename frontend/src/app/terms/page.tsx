import { LegalPage } from "@/app/components/LegalPage";
import { TermsBody, TERMS_UPDATED } from "@/app/components/TermsBody";

export const metadata = { title: "Terms of Use · Raphael Aviation" };

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Use" updated={TERMS_UPDATED}>
      <TermsBody />
    </LegalPage>
  );
}
