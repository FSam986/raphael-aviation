import { LegalPage } from "@/app/components/LegalPage";

export const metadata = { title: "Terms of Use · Raphael Aviation" };

// NOTE FOR THE OWNER: replace every [bracketed] item before launch, and have the
// final text reviewed by a legal adviser (including the refund terms once billing exists).
export default function TermsPage() {
  return (
    <LegalPage title="Terms of Use" updated="21 November 2026">
      <p>
        These terms apply to your use of the Raphael Aviation study app, operated by <strong>[registered company name and number]</strong>.
        By creating an account you agree to them.
      </p>

      <h2>Not an official SACAA product</h2>
      <p>
        Raphael Aviation is an independent study aid. It is <strong>not affiliated with, endorsed by or approved by the South African Civil
        Aviation Authority (SACAA)</strong>. The official Civil Aviation Regulations, SA-CATS, the AIP and SACAA examination material always take
        precedence over anything in this app.
      </p>

      <h2>No guarantee of results</h2>
      <p>
        We work hard to keep the content accurate and aligned with the SACAA syllabus, but we cannot guarantee that it is complete or
        error-free, or that using the app will lead to passing any examination. Readiness scores are an estimate to guide your study, not
        a prediction of your exam result.
      </p>

      <h2>Not for operational use</h2>
      <p>
        The content is for exam preparation only. Never use it for flight planning, navigation or any real flight. Always use the
        aircraft&apos;s approved flight manual and current official publications.
      </p>

      <h2>Your account</h2>
      <ul>
        <li>Keep your password private. An account is for one person and must not be shared.</li>
        <li>You must not copy, scrape, resell or republish the questions, notes or illustrations.</li>
        <li>We may suspend accounts that break these terms.</li>
      </ul>

      <h2>Paid courses</h2>
      <p>
        Prices, what each course includes and how long access lasts are shown before you buy. Refunds: <strong>[refund policy, e.g. a full refund
        within 7 days if you have used less than 10% of the course]</strong>. This does not affect your rights under the Consumer Protection Act.
      </p>

      <h2>Our content</h2>
      <p>
        The app&apos;s software, text, questions and original illustrations belong to us or our licensors. Material from official sources
        remains the property of its owners.
      </p>

      <h2>Liability</h2>
      <p>
        To the extent the law allows, we are not liable for any loss arising from your use of the app or reliance on its content. Our total
        liability is limited to the amount you paid us in the 12 months before the claim.
      </p>

      <h2>General</h2>
      <p>
        These terms are governed by the law of the Republic of South Africa. We may update them and will show the date of the latest version
        above. Questions: <strong>[support@yourdomain]</strong>.
      </p>
    </LegalPage>
  );
}
