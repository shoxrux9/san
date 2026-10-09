# Verification

- Imported 111/111 books, with original titles, cover images, descriptions, author and ISBN fields where provided by the source.
- Imported 10 equipment records, 9 certificate images and 19 partner logos.
- Source download report: `data/migration-report.json`.
- Node integration test passed: authentication, CSRF, persisted orders, idempotency, server-side stock checks, hidden-product rejection, upload format restriction, draft isolation and persistence across restart.
- Real Chromium checks passed: desktop and 390 px mobile layouts, no horizontal overflow, UZ/RU/EN UI, theme switching, cart and checkout submission, admin login, every admin section, saving a draft without changing the public record, and publishing changes. No browser page errors observed.
- Desktop and mobile screenshots inspected.

## Boundaries

This is an independently runnable ZIP, not a deployment to sano.uz. It requires Node.js 24 and a persistent disk. No live payment gateway, notification provider or automatic delivery-pricing service is connected. Source book descriptions retain their original language; editorial translations can be entered in admin. Stock is validated per order but is manually adjusted by a manager, not automatically reserved. Legacy contact details and document validity require owner review. The admin supports structured JSON editing for advanced site settings; it is not a visual page builder.
