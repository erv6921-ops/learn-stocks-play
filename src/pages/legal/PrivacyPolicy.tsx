import LegalLayout from "./LegalLayout"

// Contact address surfaced throughout the legal pages. Update in one place.
const CONTACT_EMAIL = "privacy@investiplay.app"

export default function PrivacyPolicy() {
  return (
    <LegalLayout title="Privacy Policy" lastUpdated="September 5, 2026">
      <p>
        InvestiPlay ("InvestiPlay," "we," "us," or "our") provides a game-based financial-literacy
        learning platform used by students and teachers, typically through their schools. This Privacy
        Policy explains what information we collect, how we use it, and the choices available to students,
        parents, and schools. It is written to reflect our obligations under the Children's Online Privacy
        Protection Act (COPPA), the Family Educational Rights and Privacy Act (FERPA), and applicable U.S.
        state student-privacy laws.
      </p>

      <h2>1. Who controls the data</h2>
      <p>
        When InvestiPlay is used as part of a school program, the school directs our collection and use of
        student personal information. In that context, the school acts as the entity that provides consent
        on behalf of parents for the educational use of the service, consistent with COPPA's school-consent
        provisions and FERPA's "school official" exception. We use student data only to provide the service
        to the school and for no other commercial purpose.
      </p>

      <h2>2. Information we collect</h2>
      <ul>
        <li><strong>Account information</strong> — email address, first and last name, role (student or teacher), and, where provided, school name and grade level.</li>
        <li><strong>Learning activity</strong> — lessons started and completed, quiz and assessment responses, benchmark results, adaptive-difficulty signals, reflections, and free-response answers submitted for teacher review.</li>
        <li><strong>In-app economy</strong> — balances and transaction history for our virtual currencies, <em>InvestiCoins</em> and <em>Jeffs</em>. These are points used inside the app and have no real-world monetary value.</li>
        <li><strong>Simulation activity</strong> — actions taken in the stock-market and micro-business simulations. These simulations use virtual balances only; no real securities are bought or sold and no brokerage account is created.</li>
        <li><strong>Tutor interactions</strong> — messages you send to "Jeff," our in-app AI tutor, so it can respond and so teachers can support learning.</li>
        <li><strong>Technical and usage data</strong> — basic product-analytics events (for example, feature usage and session activity) used to operate and improve the service.</li>
      </ul>
      <p>
        We do <strong>not</strong> collect precise geolocation, we do <strong>not</strong> require any real
        financial or payment information from students, and we do <strong>not</strong> use student data for
        behavioral advertising.
      </p>

      <h2>3. How we use information</h2>
      <ul>
        <li>To deliver lessons, assessments, simulations, and the adaptive curriculum.</li>
        <li>To power teacher dashboards so educators can see progress and support their students.</li>
        <li>To operate the in-app economy, leaderboards (within a class or program), and gameplay features.</li>
        <li>To maintain security, prevent abuse, and debug and improve the product.</li>
      </ul>

      <h2>4. Service providers (subprocessors)</h2>
      <p>
        We share information with a limited set of vendors who process data on our behalf, under contract, to
        run the service. These include our cloud hosting and authentication provider (Supabase), our
        text-to-speech provider used to narrate lessons (ElevenLabs), providers of market data used to power
        the educational stock simulation, and the AI provider that powers the Jeff tutor. These vendors are
        permitted to use the information only to provide services to us and are prohibited from using student
        data for their own purposes. We do not sell student personal information, and we do not permit our
        vendors to do so.
      </p>

      <h2>5. Advertising</h2>
      <p>
        InvestiPlay does not display third-party behavioral advertising to students and does not build
        advertising profiles. We do not use student data to target ads.
      </p>

      <h2>6. Data retention and deletion</h2>
      <p>
        We retain student personal information for as long as the account is active or as needed to provide
        the service to the school, and we delete or de-identify it when it is no longer needed. Students,
        teachers, and schools can request deletion at any time. Account holders can permanently delete their
        own account from the in-app settings, which removes their profile and associated learning records. A
        school may also request deletion of its students' data by contacting us.
      </p>

      <h2>7. Security</h2>
      <p>
        We use industry-standard measures — including encryption in transit, access controls, and row-level
        database security — to protect personal information. No system is perfectly secure, but we work to
        protect data commensurate with its sensitivity.
      </p>

      <h2>8. Parents' and students' rights</h2>
      <p>
        Parents may review their child's personal information, ask us to correct or delete it, and refuse
        further collection, generally by working through their child's school. Because schools administer the
        program, we ask that parents direct these requests to the school, which can then coordinate with us.
        Schools and parents may also contact us directly using the address below.
      </p>

      <h2>9. Changes to this policy</h2>
      <p>
        If we make material changes to how we handle student personal information, we will notify the schools
        that use InvestiPlay and update the "Last updated" date above before the changes take effect.
      </p>

      <h2>10. Contact us</h2>
      <p>
        Questions about this policy or requests regarding student data can be sent to{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>
    </LegalLayout>
  )
}
