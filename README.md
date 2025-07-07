# CertWorld

## Product Overview

**Product Name:** CertWorld  
**Version:** MVP 1.0  
**Owner:** Erin Taylor, Esmit Perez  
**Date:** May 14, 2025

### Purpose
To define the functional and technical requirements for CertWorld, a simple course builder and online platform for bilingual (EN–ES) courses with one-time payments, mobile optimization, and course certificate generation.

## User Personas

### Learner
- Needs to purchase, access, and complete a course easily
- Prioritizes mobile-friendly design
- May be bilingual or Spanish-first
- Wants a certificate to fulfill a requirement

### Course Creator
- Enters and edits bilingual course content, including quizzes, images, videos, text
- Manages pass/fail settings, including minimum time per module, exam grade to pass
- Manages course structure (sections, modules)
- Creates, edits, publishes, unpublishes, deletes courses

### Admin / Analyst
- Views overall sales 
- Tracks learner course performance and completion rates
- Contacts learners for refunds, upsells, to provide support
- Exports reports (CSV or dashboard view)

## Goals & Success Metrics

| Goal | Metric |
|------|--------|
| Learners complete courses smoothly | Pages render within 2 seconds; pages are responsive (Green lighthouse rating) |
| Easy buyflow | 3-5 clicks from course selection to course start |
| Easy course creation/editing | 3-5 clicks from course conception to publication |
| Admin has visibility into user activity | CSV export capability, working dashboard |

## Features & Requirements

| Feature | Description | Release |
|---------|-------------|---------|
| Course Catalog | Browse, sort, and filter course offerings by topic, country/state, duration, cost | v1 |
| Bilingual Lessons | View content in our 'EchoLines' bilingual format | v1 |
| Sign Up / Sign In | Auth with email + password | v1 |
| One-Time Payment | Stripe or Outseta-based payment system | v1 |
| Progress Tracking* | Resume where left off on any device; see courses purchased with progress overview of each | v1 |
| Quiz Engine | Auto-graded quizzes, pass thresholds (e.g. 80%) | v1 |
| Certificate Generation* | PDF or image download/email on completion with course verification URL (see appendix) | v1 |
| Admin Dashboard | View, filter, sort, and export user and course data | v1 |
| Course Creation | Simple, tabular input for metadata (title, cost, min duration, pass thresholds, etc), English, Spanish, course assets (images, video links) and quizzes, and final exam | v1 |
| Disable New Enrollments | Removes buy option, keeps access for current users | v1 |
| Disable Access | Customers who request refunds automatically lose course access; it's removed from their course tracker. | v1 |
| Course Management | Ability to return to tabular input to edit the course. Ability to publish, unpublish course. | v1 |
| Asset Upload* | Ability to upload and reference images to be used in courses | v1 |
| Custom 404 | 404 page that directs users to explore the course catalog | v1 |
| Add or Remove Learners from Courses | Admin can remove users from courses and add them to other courses. | v2 |
| Bulk Enrollment | Admin can bulk add a list of users to courses. | v2 |
| Access/Discount Codes | Learners can sign up via a one-use code with an expiration date. | v2 |
| Course Review | Ability to mark an unpublished course as 'in review' / 'approved' | v2 |
| AI-assisted course content creation | Ability to use a built-in AI assistant to draft and modify course content in development. | v2 |

## UI/UX Notes

- Mobile-first design*
- Accessible font sizes and contrast
- Use collapsible EchoLines format*
- Avoid heavy animations or JS blockers
- Clean, functional design

## Technical Requirements

| Component | Tech Stack | Notes |
|-----------|------------|-------|
| Frontend (Course player)* | React | Tailwind UI preferred |
| Frontend (Course creator dashboard)* | AirTable | Stores course info needed to generate the course (images stored in DB) |
| Auth / CRM* | Auth0/Outseta | Bundled with email & CRM |
| Database | Supabase | Stores users, progress, etc. |
| Hosting | Vercel / Netlify | Preferably serverless |
| Payments | Stripe / Outseta | For one-time course purchases |
| Analytics | Outseta native / Supabase queries | MVP phase; Looker later optional |

## Timeline (To be determined at future meeting)

| Phase | Dates | Milestone |
|-------|-------|-----------|
| Planning & Design | [Date–Date] | Vision finalized, user stories complete |
| Dev Sprint 0 | May 26 – June 2 | Accounts and configuration, initial repository and planning sprints + deliverables. |
| Dev Sprint 1 | [Date–Date] | Learner flow: catalog, payment, content access |
| Dev Sprint 2 | [Date–Date] | Course creator flow: content entry, quizzes |
| Dev Sprint 3 | [Date–Date] | Admin flow + polish, testing |
| Launch | [Target Launch Date] | MVP live with 2 courses |

## Out of Scope (MVP)

- Subscriptions or bundled purchases
- Multi-instructor support
- Mobile apps (web and mobile web only)
- AI or dynamic translations
- Advanced analytics 

## Appendix

**Figma** (work in progress - estimated completion is May 25): https://www.figma.com/design/1OxpbmuGlPEG5N4VZjwT1Q/CertWorld?node-id=0-1&t=HYja01afgPXEXxCW-1 

**Course verification URL example:**