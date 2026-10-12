
   import type { LegalSection } from "../components/LegalLayout";
export const termsSections: LegalSection[] = [
  {
    id: "acceptance",
    title: "Acceptance of Terms",
    body: (
      <p>
        By accessing or using FreshCart, you agree to these Terms of Service. If
        you do not agree with any part of them, please do not use the website.
      </p>
    ),
  },
  {
    id: "your-account",
    title: "Your Account",
    body: (
      <>
        <p>To place orders you need to create an account. You agree to:</p>
        <ul>
          <li>Provide accurate and up-to-date information.</li>
          <li>Keep your password confidential.</li>
          <li>Be responsible for all activity that happens under your account.</li>
        </ul>
      </>
    ),
  },
  {
    id: "orders-and-payment",
    title: "Orders and Payment",
    body: (
      <>
        <p>
          All prices are shown in Egyptian Pounds (EGP). An order is confirmed
          once it has been placed successfully, and we may cancel an order if a
          product is unavailable or a pricing error occurs.
        </p>
        <p>
          You can pay <strong>cash on delivery</strong> or{" "}
          <strong>online by card</strong> through our secure payment provider.
        </p>
      </>
    ),
  },
  {
    id: "shipping-and-delivery",
    title: "Shipping and Delivery",
    body: (
      <>
        <p>
          Shipping is <strong>free on orders over 500 EGP</strong>. A delivery
          fee applies to smaller orders and is shown clearly before you confirm
          your order.
        </p>
        <p>
          Delivery times are estimates and may vary depending on your location
          and product availability.
        </p>
      </>
    ),
  },
  {
    id: "returns",
    title: "Returns and Refunds",
    body: (
      <p>
        You may return eligible products within 14 days of delivery. Please see
        our Return Policy page for the full details.
      </p>
    ),
  },
  {
    id: "acceptable-use",
    title: "Acceptable Use",
    body: (
      <>
        <p>You agree not to:</p>
        <ul>
          <li>Use the website for any unlawful or fraudulent purpose.</li>
          <li>Attempt to gain unauthorized access to our systems or other accounts.</li>
          <li>Copy or resell our content without written permission.</li>
        </ul>
      </>
    ),
  },
  {
    id: "liability",
    title: "Limitation of Liability",
    body: (
      <p>
        FreshCart is provided on an &quot;as is&quot; basis. To the fullest
        extent permitted by law, we are not liable for indirect or consequential
        losses arising from the use of the website or from delays beyond our
        reasonable control.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to These Terms",
    body: (
      <p>
        We may update these Terms from time to time. The latest version will
        always be available on this page, and continued use of the website means
        you accept the updated Terms.
      </p>
    ),
  },
];