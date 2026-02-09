# VANI Product Plan (Implementation-Focused)

## Goals
- Deliver a **preview + hosted deployment** for each business site.
- Keep **code hidden** from customers; management happens in the VANI dashboard.
- Use **template-first** generation with controlled layout variations.
- Provide **real backend** (products/orders/users) with scalable choices based on expected traffic.

---

## Experience & Flow
1. **Business type selection**
   - Users pick a category (e-commerce, services, etc.).
   - VANI suggests a recommended template based on the description.
2. **Business summary confirmation**
   - VANI summarizes the business in plain language.
   - User confirms or corrects the summary.
3. **Structured onboarding questions**
   - Logo upload, brand colors, hero tagline, location, hours, product categories, delivery/booking options.
   - Asset collection is form-based (not voice) to reduce errors.
4. **Preview generation**
   - VANI builds a preview using the selected template.
   - Users request edits via chat or simple UI controls.
5. **Publish confirmation**
   - Explicit confirmation before deployment.
   - Provide a free subdomain by default; offer paid custom domain.

---

## Template & Layout Strategy
- **Fixed template library** per business type.
- **Allowed variations**: hero layout, section ordering, typography pairing, grid density, CTA styles.
- **Limits**: if the requested design exceeds template capabilities, propose a closest alternative first, then offer a custom build option.

---

## AI Behavior & Prompting
- Use a **friendly, calm, supportive** tone (avoid interview-like questioning).
- Always **offer a workaround** before refusing a request.
- If a request is unrealistic, **explain the limitation** and suggest a feasible alternative or a paid custom option.

---

## Asset Collection
- **Upload-first**: logo, brand images, product photos, banners.
- Optional links for existing assets.
- Auto-generated placeholders when assets are missing (with follow-up reminders).

---

## Hosting & Operations
- **Default hosting**: Vercel for free subdomains.
- **Paid upgrades**: custom domain setup or alternate hosting provider.
- **Dashboard**: order tracking, product management, analytics, and payments management.

---

## Backend & Payments
- **Real database** for products, orders, users.
- Payment integration (Stripe/Razorpay) when requested; if manual integration is required, offer it as a paid service.

---

## Next Engineering Tasks
1. Create template metadata registry (business type → template list).
2. Implement onboarding flow with structured questions + asset upload UI.
3. Add template selection UI with AI recommendation.
4. Expand preview-only workspace (remove code export).
5. Build publish flow (confirm → deploy → show live URL).
