import LegalLayout from "./LegalLayout"

const CONTACT_EMAIL = "support@investiplay.app"

export default function TermsOfService() {
  return (
    <LegalLayout title="Terms of Service" lastUpdated="September 5, 2026">
      <p>
        These Terms of Service ("Terms") govern your access to and use of InvestiPlay, a game-based
        financial-literacy learning platform ("the Service"). By creating an account or using the Service,
        you agree to these Terms. If you are using InvestiPlay through your school, your school's agreement
        with us also applies and, where it conflicts with these Terms for educational use, controls.
      </p>

      <h2>1. Who may use InvestiPlay</h2>
      <p>
        InvestiPlay is intended for students and teachers, generally as part of a school program. If you are
        a student, you may use the Service only where your school or teacher has enrolled you and, where
        required, the appropriate consent has been provided on your behalf. If you are under the age of
        majority in your state, you may use the Service only under the supervision of your school or a parent
        or guardian who agrees to these Terms.
      </p>

      <h2>2. Educational purpose only</h2>
      <p>
        InvestiPlay is an educational product. Its lessons, simulations, and tutor are provided for learning
        and are <strong>not financial, investment, tax, or legal advice</strong>. The stock-market and
        business simulations use virtual money and simulated or delayed market data. Nothing in the Service
        is an offer, solicitation, or recommendation to buy or sell any security, and no real trades are
        placed.
      </p>

      <h2>3. Virtual currency and rewards</h2>
      <p>
        InvestiPlay includes in-app points called <em>InvestiCoins</em> and <em>Jeffs</em>, along with items,
        badges, and leaderboards. These have <strong>no monetary value</strong>, cannot be redeemed for cash
        or transferred outside the Service, and may be adjusted, reset, or removed as part of normal operation
        of the educational program. You do not own them and they are not property.
      </p>

      <h2>4. Your account</h2>
      <p>
        You are responsible for keeping your login credentials confidential and for activity that happens
        under your account. Notify us promptly if you believe your account has been accessed without
        authorization. Teachers are responsible for managing their classes and the assignments they create.
      </p>

      <h2>5. Acceptable use</h2>
      <p>You agree not to:</p>
      <ul>
        <li>Use the Service for anything other than its intended educational purpose.</li>
        <li>Attempt to disrupt, reverse-engineer, overload, or gain unauthorized access to the Service or its data.</li>
        <li>Upload or submit content that is unlawful, harassing, hateful, or infringing, including through messages to the Jeff tutor.</li>
        <li>Attempt to access another user's account or personal information.</li>
      </ul>
      <p>We may suspend or terminate access that violates these Terms or that a school requests we remove.</p>

      <h2>6. AI tutor</h2>
      <p>
        The Jeff tutor generates responses automatically and may occasionally be inaccurate or incomplete. Use
        it as a learning aid, not as a definitive source, and verify important information with your teacher or
        course materials.
      </p>

      <h2>7. Intellectual property</h2>
      <p>
        The Service, including its lessons, characters, software, and design, is owned by InvestiPlay and its
        licensors and is protected by intellectual-property laws. We grant you a limited, non-exclusive,
        non-transferable right to use the Service for its intended educational purpose. You retain rights to
        the responses and reflections you submit, and you grant us permission to process them to operate the
        Service and to make them available to your teacher and school.
      </p>

      <h2>8. Termination</h2>
      <p>
        You may stop using the Service at any time and may delete your account from the in-app settings.
        Schools may remove students from their program. We may suspend or end access to protect the Service,
        comply with the law, or enforce these Terms.
      </p>

      <h2>9. Disclaimers</h2>
      <p>
        The Service is provided "as is" and "as available." To the fullest extent permitted by law, we
        disclaim all warranties, express or implied, including merchantability, fitness for a particular
        purpose, and non-infringement. We do not warrant that the Service will be uninterrupted, error-free,
        or that simulated market data will be accurate or timely.
      </p>

      <h2>10. Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, InvestiPlay will not be liable for any indirect, incidental,
        special, consequential, or punitive damages, or for any loss arising from reliance on the educational
        content or simulations, even if we have been advised of the possibility of such damages.
      </p>

      <h2>11. Changes to these Terms</h2>
      <p>
        We may update these Terms from time to time. If we make material changes, we will update the "Last
        updated" date above and, for school programs, notify the school. Your continued use of the Service
        after changes take effect means you accept the updated Terms.
      </p>

      <h2>12. Contact us</h2>
      <p>
        Questions about these Terms can be sent to{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>
    </LegalLayout>
  )
}
