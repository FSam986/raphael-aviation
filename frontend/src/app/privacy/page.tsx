import { LegalPage } from "@/app/components/LegalPage";

export const metadata = { title: "Privacy Policy · Raphael Aviation" };

// NOTE FOR THE OWNER: replace every [bracketed] item before launch, and have the
// final text reviewed against POPIA by a legal adviser.
export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="21 November 2026">
      <p>
        This policy explains how Raphael Aviation (&ldquo;we&rdquo;, &ldquo;us&rdquo;), operated by <strong>[registered company name and number]</strong>,
        collects and uses your personal information when you use our study app. We process personal information in line with the
        Protection of Personal Information Act, 2013 (POPIA).
      </p>

      <h2>What we collect</h2>
      <ul>
        <li><strong>Account details:</strong> your name, email address and password. Passwords are stored by our authentication provider in hashed form; we never see them.</li>
        <li><strong>Study data:</strong> the courses you study, questions you answer, mock exam scores, readiness and study-plan progress.</li>
        <li><strong>Technical data:</strong> basic information your browser sends, such as device type, and security logs used to protect the service.</li>
      </ul>
      <p>We do not collect ID numbers, payment card numbers or location data.</p>

      <h2>Why we use it</h2>
      <ul>
        <li>To create and secure your account and let you sign in.</li>
        <li>To save your progress so it is available on any device, and to tailor practice to your weak areas.</li>
        <li>To send account emails, such as confirmation and password-reset messages.</li>
        <li>To improve the content, for example by finding questions many students get wrong.</li>
      </ul>
      <p>We do not sell your personal information or use it for third-party advertising.</p>

      <h2>Where it is stored</h2>
      <p>
        Account and study data are stored with our database provider, Supabase, in <strong>[region, e.g. EU (Frankfurt)]</strong>. Because this
        may be outside South Africa, we rely on the provider&apos;s contractual and security safeguards as POPIA requires. Some settings,
        such as night mode, are kept only in your browser.
      </p>

      <h2>How long we keep it</h2>
      <p>We keep your data while your account is open. If you delete your account, we delete your personal information within <strong>[30]</strong> days, except where the law requires us to keep it longer.</p>

      <h2>Your rights</h2>
      <p>Under POPIA you may ask us to:</p>
      <ul>
        <li>confirm what personal information we hold about you and give you a copy;</li>
        <li>correct or delete it;</li>
        <li>stop processing it for a particular purpose.</li>
      </ul>
      <p>
        Contact our Information Officer at <strong>[privacy@yourdomain]</strong>. If you are unhappy with our response, you may complain to the
        Information Regulator (South Africa) at <strong>complaints.IR@justice.gov.za</strong>.
      </p>

      <h2>Children</h2>
      <p>The app is intended for student pilots aged 16 and over. If you are under 18, please use it with a parent or guardian&apos;s consent.</p>

      <h2>Changes</h2>
      <p>We will update this page if our practices change and show the date of the latest version above.</p>
    </LegalPage>
  );
}
