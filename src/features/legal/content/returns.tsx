import type { LegalSection } from "../components/LegalLayout";

export const returnSections: LegalSection[] = [
  {
    id: "return-window",
    title: "14-Day Return Window",
    body: (
      <p>
        We want you to love what you buy. If you are not satisfied, you can
        return most products within <strong>14 days</strong> of receiving your
        order.
      </p>
    ),
  },
  {
    id: "eligibility",
    title: "What Can Be Returned",
    body: (
      <>
        <p>To be eligible for a return, the product must be:</p>
        <ul>
          <li>Unused and in the same condition you received it.</li>
          <li>In its original packaging, with all tags and accessories.</li>
          <li>Accompanied by your order number or proof of purchase.</li>
        </ul>
      </>
    ),
  },
  {
    id: "non-returnable",
    title: "Non-Returnable Items",
    body: (
      <ul>
        <li>Personal care and beauty products that have been opened or used.</li>
        <li>Underwear and swimwear, for hygiene reasons.</li>
        <li>Items marked as final sale.</li>
      </ul>
    ),
  },
  {
    id: "how-to-return",
    title: "How to Return a Product",
    body: (
      <ul>
        <li>
          Open <strong>My Orders</strong> from your account and find the order.
        </li>
        <li>Contact our support team with your order number and the reason for the return.</li>
        <li>Pack the product securely and hand it to our delivery representative.</li>
      </ul>
    ),
  },
  {
    id: "refunds",
    title: "Refunds",
    body: (
      <>
        <p>
          Once we receive and inspect your return, we will notify you of the
          result. Approved refunds are issued to your original payment method
          within <strong>5 to 10 business days</strong>. For cash on delivery
          orders, we will arrange the refund with you directly.
        </p>
      </>
    ),
  },
  {
    id: "damaged-items",
    title: "Damaged or Wrong Items",
    body: (
      <p>
        If your product arrives damaged or you received the wrong item, contact
        us within 48 hours of delivery with a photo and we will replace it or
        refund you in full, including shipping.
      </p>
    ),
  },
];