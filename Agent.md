# Design Task — Clickable Figma Prototype for an Iranian Goodreads MVP

You are a **Senior Product Designer, UX Designer, and UI Designer**.

Design a complete **high-fidelity, clickable Figma-style prototype** for an Iranian social network for book lovers.

The product is inspired by the core concept of Goodreads, but it must have its own visual identity and should feel like a modern Iranian product rather than a copy.

The entire interface must be designed in **Persian (Farsi), RTL, and mobile-first**, while also providing a polished desktop experience.

---

# 1. Product Concept

The product is a social platform where people can:

- Discover books
- Search for books and authors
- View book details
- Rate books from 1–5 stars
- Write reviews
- Add books to reading shelves
- Track their reading status
- Follow other readers
- See friends' reading activity
- Explore popular books
- Manage their personal profile
- Create custom shelves

The core product loop is:

```text
Discover a book
        ↓
Open book
        ↓
Add to shelf
        ↓
Read
        ↓
Rate / Review
        ↓
Share activity
        ↓
Discover another book
```

The prototype must communicate this loop visually.

---

# 2. Important Requirement

This is NOT a static collection of screens.

Create a **clickable prototype**.

Interactive elements should navigate between screens or open overlays.

For example:

```text
Search
→ Search Results
→ Book Details
→ Add to Shelf
→ Shelf Selection
→ Updated Book State

Profile
→ User Profile
→ User Shelf
→ Book Details

Activity
→ Activity Item
→ Book Details

Review
→ Write Review
→ Submit
→ Updated Review List
```

Every major CTA must have a logical interaction.

---

# 3. Design Direction

The visual language should feel:

- Modern
- Warm
- Premium
- Friendly
- Calm
- Bookish
- Social
- Minimal
- Trustworthy

Avoid:

- Corporate dashboard aesthetics
- Excessive gradients
- Generic SaaS UI
- Excessive glassmorphism
- Overly colorful interfaces
- Visually noisy layouts

Think:

> A modern Persian social network designed around books and reading.

---

# 4. Brand

Temporary product name:

# «کتاب‌خون»

English internal name:

`Ketabkhoon`

Create a simple wordmark/logo concept.

The logo should work in:

- Navbar
- Mobile header
- App icon
- Empty states

Logo direction:

A minimal combination of:

```text
Book + bookmark + subtle Persian character
```

Do not create a complicated mascot.

---

# 5. Color System

Create a complete color system.

Primary:

```text
Deep Purple
#6D4AFF
```

Secondary:

```text
Warm Amber
#F4B740
```

Background:

```text
#FAF9F6
```

Surface:

```text
#FFFFFF
```

Primary text:

```text
#202124
```

Secondary text:

```text
#6B7280
```

Success:

```text
#22A06B
```

Error:

```text
#D64545
```

Border:

```text
#E8E5DF
```

Use color tokens rather than hardcoded colors.

---

# 6. Typography

Use a Persian-friendly modern font such as:

```text
Vazirmatn
```

Typography should have:

```text
Display
H1
H2
H3
Body Large
Body
Body Small
Caption
Button
```

Create a clear hierarchy.

Do not make everything bold.

---

# 7. Layout System

Use a consistent grid.

Desktop:

```text
1440px
```

Main content max width:

```text
1200–1280px
```

Tablet:

```text
768px
```

Mobile:

```text
375px
390px
430px
```

Spacing should follow an 8px-based system.

---

# 8. Navigation

## Desktop Navbar

Create:

```text
Logo

خانه
کتاب‌ها
نویسندگان
فعالیت‌ها

[ جستجوی کتاب، نویسنده... ]

[ اعلان ]
[ پروفایل ]
```

Because the UI is RTL, navigation should feel natural for Persian users.

---

# 9. Mobile Navigation

Create a mobile bottom navigation:

```text
خانه
کشف
قفسه‌ها
فعالیت
پروفایل
```

Use icons + Persian labels.

The active state must be visually obvious.

---

# 10. Home Page

Create a polished homepage.

Structure:

### Hero

Large headline:

> کتاب بعدی‌ات را پیدا کن.

Supporting text:

> کتاب بخوان، نظر بده و با آدم‌هایی که مثل تو عاشق کتاب‌اند آشنا شو.

Large search box:

> نام کتاب، نویسنده یا ISBN را جستجو کنید...

CTA:

```text
کشف کتاب‌ها
```

---

## Popular Books

Section title:

> کتاب‌های محبوب

Horizontal book cards.

Each card:

```text
Book Cover
Title
Author
Rating
Rating count
```

---

## Continue Reading

If user has books in progress:

```text
ادامه مطالعه
```

Show:

```text
Book cover
Book title
Author
Reading progress
```

---

## Community Activity

Show cards such as:

> سارا به «بیگانه» امتیاز ۵ داد.

> علی «سمفونی مردگان» را به قفسه «می‌خواهم بخوانم» اضافه کرد.

Use avatars and book thumbnails.

---

# 11. Discover Page

Create a discovery experience.

Header:

> کشف کتاب

Tabs:

```text
محبوب
جدید
بیشترین امتیاز
ترند
```

Filters:

```text
ژانر
نویسنده
سال انتشار
امتیاز
```

Book grid.

Desktop:

```text
5 columns
```

Tablet:

```text
3 columns
```

Mobile:

```text
2 columns
```

---

# 12. Search Experience

Create a search overlay/modal.

When user clicks the search field:

Open:

```text
Search Overlay
```

Show:

```text
جستجو کنید...

کتاب‌ها
نویسندگان
```

Recent searches:

```text
ملت عشق
هری پاتر
بوف کور
```

After typing:

```text
Search Results
```

Group results:

### کتاب‌ها

Book result cards.

### نویسندگان

Author result cards.

---

# 13. Search Results Page

Example query:

```text
هری پاتر
```

Header:

> نتایج جستجو برای «هری پاتر»

Tabs:

```text
همه
کتاب‌ها
نویسندگان
```

Filters and sorting.

Book result cards.

---

# 14. Book Details

This is one of the most important screens.

Create a premium book details page.

Desktop layout:

```text
Cover

Title
Author
Rating
Rating count
Review count

Description

[ + افزودن به قفسه ]
[ امتیاز دادن ]
```

Show:

```text
نویسنده
ناشر
تاریخ انتشار
تعداد صفحات
ISBN
ژانر
```

---

# 15. Add to Shelf Interaction

When user clicks:

```text
+ افزودن به قفسه
```

Open a bottom sheet / modal.

Options:

```text
○ می‌خواهم بخوانم

○ در حال خواندن

○ خوانده‌ام

────────────────

+ ساخت قفسه جدید
```

After selection:

Show success state:

> کتاب به «می‌خواهم بخوانم» اضافه شد.

Button changes to:

```text
✓ در قفسه من
```

---

# 16. Rating Interaction

Click:

```text
امتیاز دادن
```

Open modal:

> به این کتاب چه امتیازی می‌دهید؟

Large interactive stars:

```text
☆ ☆ ☆ ☆ ☆
```

When hovering/tapping:

```text
★ ★ ★ ★ ☆
```

Display:

```text
4 از 5
```

CTA:

```text
ثبت امتیاز
```

After submission:

Show:

> امتیاز شما ثبت شد.

---

# 17. Review Screen

Create a review modal/page.

Title:

> نقد و نظر شما درباره این کتاب

Show:

```text
Book Cover
Book Title

Your Rating

[ Textarea ]

☐ این نقد شامل اسپویل است.

[ انتشار نقد ]
```

After submission:

Display the new review at the top of the review list.

---

# 18. Reviews Section

Create beautiful review cards.

Each card:

```text
Avatar
Username
Rating
Date

Review text

[ مفید بود ]
[ ... ]
```

Spoiler review:

Blur/hide text.

Display:

> ⚠️ این نقد شامل اسپویل است.

Button:

```text
نمایش نقد
```

---

# 19. Rating Distribution

Create a visual rating breakdown:

```text
۵ ★  ███████████████  68%

۴ ★  █████████        21%

۳ ★  ███               7%

۲ ★                   3%

۱ ★                   1%
```

Use elegant bars.

---

# 20. Author Page

Create:

```text
Author Profile
```

Example:

```text
الیف شافاک
```

Show:

```text
Avatar
Name
Bio
Number of books
```

Then:

> کتاب‌های این نویسنده

Book grid.

---

# 21. User Profile

Create a social profile.

Header:

```text
Avatar

مریم احمدی
@marya

کتاب‌خوانی برای من یعنی...

[ دنبال کردن ]
```

Stats:

```text
۳۴ کتاب خوانده
۳ کتاب در حال خواندن
۱۲ کتاب در لیست مطالعه
۱۸ نقد
```

---

# 22. Profile Tabs

Create:

```text
فعالیت
کتاب‌ها
قفسه‌ها
نقدها
```

---

# 23. Shelves Page

Title:

> قفسه‌های من

Main shelves:

```text
📖 می‌خواهم بخوانم
12 کتاب

📚 در حال خواندن
3 کتاب

✓ خوانده‌ام
34 کتاب
```

Custom shelves:

```text
کتاب‌های دانشگاه
8 کتاب

کتاب‌های مورد علاقه
15 کتاب
```

CTA:

```text
+ ساخت قفسه
```

---

# 24. Shelf Details

Example:

```text
کتاب‌های مورد علاقه

15 کتاب
```

Book grid.

Allow:

```text
Sort
Remove
Move to another shelf
```

---

# 25. Activity Feed

Create a social feed.

Activity cards:

```text
Avatar

مریم احمدی
به «صد سال تنهایی» امتیاز ۵ داد.

★★★★★

2 ساعت پیش
```

Another:

```text
علی رضایی
«بوف کور» را به
«می‌خواهم بخوانم» اضافه کرد.
```

Clicking the book should open the Book Details page.

---

# 26. Follow Interaction

On another user's profile:

```text
[ دنبال کردن ]
```

Click:

```text
[ دنبال می‌کنید ✓ ]
```

Click again:

Open confirmation:

> مطمئنید می‌خواهید دنبال کردن را متوقف کنید؟

Buttons:

```text
انصراف
لغو دنبال کردن
```

---

# 27. Notifications

Create notification dropdown.

Examples:

```text
مریم نقد شما را پسندید.

علی شما را دنبال کرد.

کتابی که در لیست مطالعه شماست محبوب شده است.
```

Unread state should be visually distinct.

---

# 28. Login

Create a beautiful authentication page.

Layout:

```text
Brand

به کتاب‌خون خوش آمدید.

Email
Password

[ ورود ]

رمز عبور را فراموش کرده‌اید؟

حساب ندارید؟
ثبت‌نام کنید
```

---

# 29. Register

Fields:

```text
نام
نام کاربری
ایمیل
رمز عبور
تکرار رمز عبور
```

CTA:

```text
ساخت حساب
```

---

# 30. Onboarding

After registration, create a simple onboarding flow.

Step 1:

> چه کتاب‌هایی دوست دارید؟

Categories:

```text
رمان
فلسفه
روانشناسی
تاریخ
علم
کسب‌وکار
فانتزی
جنایی
```

Step 2:

> چند کتاب را برای شروع انتخاب کنید.

Step 3:

> حالا آماده‌ایم.

CTA:

```text
شروع کنیم
```

The onboarding should feel lightweight and skippable.

---

# 31. Settings

Create:

```text
حساب کاربری
ویرایش پروفایل
حریم خصوصی
امنیت
اعلان‌ها
```

Privacy options:

```text
نمایش عمومی پروفایل
نمایش فعالیت‌ها
```

---

# 32. Empty States

Design custom empty states.

Examples:

### Empty Shelf

> هنوز کتابی اینجا نیست.

CTA:

> پیدا کردن کتاب

### Empty Activity

> هنوز فعالیتی وجود ندارد.

CTA:

> پیدا کردن کتاب‌خوان‌ها

### No Search Results

> کتابی پیدا نکردیم.

Suggestion:

> نام کتاب یا نویسنده را بررسی کنید.

---

# 33. Loading States

Design skeleton screens for:

- Book cards
- Book details
- Profile
- Activity
- Reviews
- Search

---

# 34. Error States

Create:

```text
404 Book Not Found
404 User Not Found
Search Error
Network Error
```

Persian copy should be friendly.

---

# 35. Admin UI

Create a minimal admin interface.

Important:

The admin should look visually related to the main product but clearly be an admin environment.

Screens:

```text
Dashboard
Books
Authors
Users
Reviews
Categories
```

Dashboard cards:

```text
تعداد کتاب‌ها
تعداد کاربران
تعداد نقدها
تعداد امتیازها
```

---

# 36. Component Library

Create reusable components.

At minimum:

```text
Button
Input
SearchInput
Avatar
Badge
BookCard
BookGrid
RatingStars
RatingDistribution
ReviewCard
ActivityCard
ShelfCard
AuthorCard
UserCard
Modal
BottomSheet
Dropdown
Tabs
Toast
Skeleton
EmptyState
Pagination
Navbar
MobileNavbar
```

---

# 37. Book Card Variations

Create at least:

### Default

```text
Cover
Title
Author
Rating
```

### Compact

```text
Small cover
Title
Author
Rating
```

### Horizontal

```text
Cover
Title
Author
Description
Rating
CTA
```

### Activity

Book thumbnail inside activity.

---

# 38. Responsive Behavior

The prototype must have separate responsive layouts.

Desktop:

```text
1440px
```

Mobile:

```text
390px
```

Do not simply shrink desktop.

Mobile should have:

- Bottom navigation
- Bottom sheets
- Larger touch targets
- Simplified navbar
- 2-column book grids
- Full-width CTAs

---

# 39. Prototype Connections

Create actual prototype links.

At minimum:

```text
Home
→ Search

Search
→ Search Results

Search Results
→ Book Details

Book Details
→ Add to Shelf

Add to Shelf
→ Shelf Selected State

Book Details
→ Rating Modal

Rating Modal
→ Rating Submitted State

Book Details
→ Reviews

Profile
→ Shelves

Profile
→ Activity

Activity
→ Book Details

User Profile
→ Follow State

Shelf
→ Book Details

Author
→ Book Details

Navbar
→ Home / Discover / Activity / Profile
```

---

# 40. Prototype Interaction Rules

Use:

### Navigation

```text
On Click → Navigate To
```

### Modals

```text
On Click → Open Overlay
```

### Bottom Sheets

Use on mobile.

### Buttons

Create proper:

```text
Default
Hover
Pressed
Disabled
Loading
Success
```

states.

---

# 41. Prototype Starting Point

Set:

```text
Home / Desktop
```

as the prototype starting point.

Also create:

```text
Home / Mobile
```

as a second starting point.

---

# 42. Micro Interactions

Add subtle interactions:

- Heart/bookmark animation
- Rating star hover
- Follow button transition
- Add-to-shelf confirmation
- Toast
- Modal transitions
- Bottom sheet transitions
- Search overlay
- Tab transitions

Keep animations subtle.

Do not make the UI gimmicky.

---

# 43. Persian Content

Use realistic Persian content instead of lorem ipsum.

Examples:

Books:

```text
ملت عشق
سمفونی مردگان
بوف کور
صد سال تنهایی
1984
بیگانه
شازده کوچولو
جنایت و مکافات
انسان در جستجوی معنا
کیمیاگر
```

Authors:

```text
الیف شافاک
عباس معروفی
صادق هدایت
گابریل گارسیا مارکز
جورج اورول
آلبر کامو
آنتوان دو سنت اگزوپری
فئودور داستایفسکی
```

Use realistic Persian names for users.

---

# 44. Content Density

Do not create empty-looking screens.

The prototype should feel like a real product with realistic:

- Book covers
- User avatars
- Ratings
- Reviews
- Activity
- Counts
- Categories

Use placeholder imagery where necessary, but keep the visual hierarchy realistic.

---

# 45. Design Tokens

Create:

```text
Colors
Typography
Spacing
Radius
Shadows
Borders
Icons
```

as a reusable design system.

---

# 46. Border Radius

Use a modern but restrained radius system:

```text
Small: 8px
Medium: 12px
Large: 16px
XL: 24px
```

Cards should generally use:

```text
12–16px
```

---

# 47. Shadows

Use subtle shadows only.

Avoid heavy floating-card effects.

---

# 48. Book Covers

Book covers are a major visual element.

They should have:

- consistent aspect ratio
- rounded corners
- subtle shadow
- clear hierarchy

Book cover ratio:

```text
2 : 3
```

---

# 49. Desktop Homepage Composition

Create a polished composition similar to:

```text
┌─────────────────────────────────────────────┐
│ Logo  Nav  Search                 Profile   │
├─────────────────────────────────────────────┤
│                                             │
│        کتاب بعدی‌ات را پیدا کن              │
│                                             │
│       [ جستجوی کتاب... ]                    │
│                                             │
├─────────────────────────────────────────────┤
│ کتاب‌های محبوب                              │
│                                             │
│ [Book] [Book] [Book] [Book] [Book]         │
│                                             │
├─────────────────────────────────────────────┤
│ ادامه مطالعه                                │
│                                             │
│ [Book] [Book] [Book]                        │
│                                             │
├─────────────────────────────────────────────┤
│ فعالیت کتاب‌خوان‌ها                         │
│                                             │
│ Activity cards                              │
└─────────────────────────────────────────────┘
```

But make the actual design visually sophisticated rather than literally following this wireframe.

---

# 50. Mobile Homepage Composition

```text
Header

Greeting

Search

Popular Books
Horizontal scroll

Continue Reading

Activity

Bottom Navigation
```

Keep mobile content vertically scannable.

---

# 51. Important UX Principle

The user should always understand:

1. What book am I looking at?
2. What is its rating?
3. What are people saying?
4. Can I add it to my shelf?
5. What should I read next?

These five questions should be visually obvious.

---

# 52. Figma Prototype Quality

The final result should feel like a **real product design presentation**, not a collection of random UI screens.

Maintain:

- consistent spacing
- consistent components
- consistent typography
- consistent interaction patterns
- consistent colors
- consistent iconography

---

# 53. Deliverables

Create the following:

## Design System

```text
Colors
Typography
Buttons
Inputs
Cards
Navigation
Icons
Components
```

## Desktop Screens

At minimum:

```text
Home
Discover
Search
Search Results
Book Details
Author Details
Profile
Shelves
Shelf Details
Activity
Notifications
Settings
Login
Register
Onboarding
Admin Dashboard
Admin Books
Admin Users
Admin Reviews
```

## Mobile Screens

At minimum:

```text
Home
Discover
Search
Book Details
Add to Shelf
Rating
Review
Profile
Shelves
Activity
Settings
```

---

# 54. Prototype Scenarios

Create these complete clickable scenarios:

## Scenario A — Discover a Book

```text
Home
→ Search
→ Search Results
→ Book
→ Add to Shelf
→ Want to Read
→ Success
```

## Scenario B — Review a Book

```text
Book
→ Rate
→ Select 5 stars
→ Write Review
→ Submit
→ Review appears
```

## Scenario C — Social Discovery

```text
Activity
→ User Profile
→ Follow
→ Followed State
→ User Shelf
→ Book
```

## Scenario D — Personal Library

```text
Profile
→ Shelves
→ Read
→ Book
```

---

# 55. Final Quality Check

Before finishing, verify:

### Visual

- No broken layouts
- No inconsistent spacing
- No unreadable Persian text
- No unnecessary components
- No excessive colors

### UX

- Every major CTA has a destination
- Back navigation makes sense
- Modals can close
- Mobile navigation works
- Search flow works
- Shelf flow works
- Rating flow works
- Review flow works
- Profile flow works

### RTL

Check:

- Alignment
- Icons
- Text direction
- Numbers
- Search
- Forms
- Navigation
- Cards

---

# 56. Final Instruction

Do not design this as a generic Goodreads clone.

Create a distinctive **Iranian reading community product** with its own visual identity.

The prototype must communicate the product idea within the first 10 seconds:

> «اینجا جایی است که کتاب پیدا می‌کنم، درباره‌اش می‌خوانم، نظر می‌دهم و کتاب‌خوان‌های دیگر را پیدا می‌کنم.»

Prioritize the quality of these screens above everything else:

1. Home
2. Discover
3. Search
4. Book Details
5. Add to Shelf
6. Rating / Review
7. Profile
8. Shelves
9. Activity

Make all of these screens **high-fidelity, visually polished, responsive, RTL, and connected through a clickable prototype**.

Do not stop at wireframes.

Do not use lorem ipsum.

Do not create fake interaction descriptions instead of actual prototype interactions.

Build the actual clickable design/prototype.