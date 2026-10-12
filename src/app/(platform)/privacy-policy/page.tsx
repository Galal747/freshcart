import type { LegalSection } from "@/features/legal/components/LegalLayout";
export const privacySections: LegalSection[] = [
  {
    id: "information-we-collect",
    title: "Information We Collect",
    body: (
      <>
        <p>
          We collect information you give us directly when you use FreshCart,
          including:
        </p>
        <ul>
          <li>
            <strong>Account details:</strong> your name, email address, phone
            number, and password.
          </li>
          <li>
            <strong>Delivery details:</strong> the addresses you save and the
            phone numbers you provide for delivery.
          </li>
          <li>
            <strong>Order details:</strong> the products you buy, your cart, and
            your order history.
          </li>
        </ul>
        <p>
          We also collect basic technical information such as your browser type
          and device, to keep the website working properly.
        </p>
      </>
    ),
  },
  {
    id: "how-we-use-information",
    title: "How We Use Your Information",
    body: (
      <>
        <p>We use your information to:</p>
        <ul>
          <li>Create and manage your account.</li>
          <li>Process, deliver, and track your orders.</li>
          <li>Send order updates and respond to support requests.</li>
          <li>Improve our products, website, and customer experience.</li>
          <li>Protect FreshCart and our customers from fraud and abuse.</li>
        </ul>
      </>
    ),
  },
  {
    id: "sharing-information",
    title: "Sharing Your Information",
    body: (
      <>
        <p>We do not sell your personal information. We only share it with:</p>
        <ul>
          <li>Delivery partners, so they can deliver your orders.</li>
          <li>
            Payment providers (such as Stripe) that process online payments
            securely. We never store your full card details.
          </li>
          <li>Authorities, when we are required to by law.</li>
        </ul>
      </>
    ),
  },
  {
    id: "cookies",
    title: "Cookies",
    body: (
      <p>
        We use cookies to keep you signed in, remember your cart, and understand
        how the website is used. You can disable cookies in your browser
        settings, but some features, such as signing in and checkout, may not
        work properly without them.
      </p>
    ),
  },
  {
    id: "data-security",
    title: "Data Security",
    body: (
      <p>
        We take reasonable technical and organizational measures to protect your
        information, including encrypted connections and protected sign-in
        sessions. No method of transmission over the internet is completely
        secure, so we cannot guarantee absolute security.
      </p>
    ),
  },
  {
    id: "your-rights",
    title: "Your Rights",
    body: (
      <>
        <p>You can at any time:</p>
        <ul>
          <li>
            View and update your profile and addresses from{" "}
            <strong>My Account</strong>.
          </li>
          <li>Change your password from the account settings page.</li>
          <li>Ask us to delete your account and personal data.</li>
        </ul>
      </>
    ),
  },
  {
    id: "contact-us",
    title: "Contact Us",
    body: (
      <p>
        If you have questions about this Privacy Policy, email us at{" "}
        <strong>support@freshcart.com</strong> or call{" "}
        <strong>+1 (800) 123-4567</strong>.
      </p>
    ),
  },
];