// The Terms of Use text, shared by the public /terms page and the post-sign-in
// /accept-terms page. Bump TERMS_VERSION whenever the text changes in a way users
// must re-accept — everyone is asked again on their next sign-in.
//
// NOTE FOR THE OWNER: replace every [bracketed] item before launch and have the
// final text reviewed by a legal adviser (including refunds once billing exists).

import Link from "next/link";

export const TERMS_VERSION = "2026-11-24";
export const TERMS_UPDATED = "24 November 2026";

export function TermsBody() {
  return (
    <>
      <p>
        These terms apply to your use of the Raphael Aviation study app and website (&ldquo;the app&rdquo;), operated by{" "}
        <strong>[registered company name and number]</strong>. By creating an account or using the app you agree to them. If you do not
        agree, do not use the app.
      </p>

      <h2>1. Not an official SACAA product</h2>
      <p>
        Raphael Aviation is an independent study aid. It is <strong>not affiliated with, endorsed by or approved by the South African Civil
        Aviation Authority (SACAA)</strong>. The official Civil Aviation Regulations, SA-CATS, the AIP and SACAA examination material always
        take precedence over anything in the app.
      </p>

      <h2>2. No guarantee of results</h2>
      <p>
        We work hard to keep the content accurate and aligned with the SACAA syllabus, but we cannot guarantee that it is complete or
        error-free, or that using the app will lead to passing any examination. Readiness scores and plans are estimates to guide your
        study, not a prediction of your exam result.
      </p>

      <h2>3. Not for operational use</h2>
      <p>
        The content is for exam preparation only. Never use it for flight planning, navigation or any real flight. Always use the
        aircraft&apos;s approved flight manual and current official publications.
      </p>

      <h2>4. Your account</h2>
      <ul>
        <li>You must give accurate details when you register and keep your password private.</li>
        <li>An account is for <strong>one person only</strong> and must not be shared, sold or transferred.</li>
        <li>An account can be active on <strong>one device at a time</strong>; signing in elsewhere signs out the other device.</li>
        <li>You are responsible for everything done through your account.</li>
      </ul>

      <h2>5. Screenshots and screen recording</h2>
      <p>
        The questions, notes, flashcards and illustrations are protected content. <strong>Taking screenshots or screen recordings of the
        app is not allowed</strong>, on the website or in the mobile apps.
      </p>
      <ul>
        <li>Each screenshot or screen recording we detect is recorded against your account and you will see a warning.</li>
        <li>You will be warned <strong>up to five (5) times</strong>.</li>
        <li>
          <strong>Any further screenshot or screen recording after five warnings will result in your account being blocked</strong>, and
          you will lose access to the app and any paid courses, without a refund.
        </li>
        <li>Pages may display a watermark that identifies your account, so copied content can be traced.</li>
        <li>Printing or saving pages (for example &ldquo;Save as PDF&rdquo;) is also not allowed.</li>
      </ul>
      <p>
        If you believe your account was blocked in error, contact <strong>[support@yourdomain]</strong> and we will review it.
      </p>

      <h2>6. Acceptable use</h2>
      <p>You must not:</p>
      <ul>
        <li>copy, scrape, download, resell, republish or share the questions, notes, flashcards or illustrations;</li>
        <li>use bots, scripts or other automated means to access or extract content;</li>
        <li>try to bypass the app&apos;s security, access controls, watermark or screenshot protection;</li>
        <li>use the app for anything unlawful, or in a way that harms the app or other users.</li>
      </ul>

      <h2>7. Paid courses</h2>
      <p>
        Prices, what each course includes and how long access lasts are shown before you buy. Refunds:{" "}
        <strong>[refund policy, e.g. a full refund within 7 days if you have used less than 10% of the course]</strong>. Accounts blocked
        for breaking these terms are not refunded. This does not affect your rights under the Consumer Protection Act.
      </p>

      <h2>8. Our content</h2>
      <p>
        The app&apos;s software, text, questions and original illustrations belong to us or our licensors and are protected by copyright.
        You receive a personal, non-transferable licence to use them for your own study while your account is in good standing. Material
        from official sources remains the property of its owners.
      </p>

      <h2>9. Suspension and termination</h2>
      <p>
        We may suspend or block an account that breaks these terms, including the screenshot rules in section 5 and the acceptable-use
        rules in section 6. You may stop using the app and ask us to delete your account at any time.
      </p>

      <h2>10. Privacy</h2>
      <p>
        We handle your personal information as described in our <Link href="/privacy" className="underline">Privacy Policy</Link>, in line with
        the Protection of Personal Information Act (POPIA). This includes recording screenshot warnings against your account.
      </p>

      <h2>11. Liability</h2>
      <p>
        To the extent the law allows, we are not liable for any loss arising from your use of the app or reliance on its content. Our
        total liability is limited to the amount you paid us in the 12 months before the claim.
      </p>

      <h2>12. Changes and general</h2>
      <p>
        We may update these terms; the date of the latest version is shown above, and you may be asked to accept the new version when you
        next sign in. These terms are governed by the law of the Republic of South Africa. Questions: <strong>[support@yourdomain]</strong>.
      </p>
    </>
  );
}
