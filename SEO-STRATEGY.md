# Local SEO Strategy for Redbird Counseling

## 🎯 Goal

Rank at the top of search results for "counselor in Cincinnati", "therapist in Cincinnati", and related searches.

---

## ✅ Completed Technical SEO Improvements

### 1. Structured Data (JSON-LD Schema)

Added comprehensive structured data markup to help Google understand your business:

- **LocalBusiness Schema**: Includes NAP (Name, Address, Phone), service area, hours, and founder information
- **ProfessionalService Schema**: Details about counseling services offered
- **FAQPage Schema**: Common questions to help appear in featured snippets
- **WebPage Schema**: Page-specific structured data with breadcrumbs

**Location**: `/src/utils/structuredData.ts`

### 2. Enhanced Metadata & Keywords

Updated site-wide metadata with local SEO keywords:

**Primary Keywords Added:**

- counselor Cincinnati
- therapist Cincinnati
- Cincinnati counselor
- Cincinnati therapist
- mental health counselor Cincinnati

**Service-Specific Keywords:**

- trauma therapist Cincinnati
- PTSD therapist Cincinnati
- substance use counselor Cincinnati
- addiction counselor Cincinnati

**Specialty Keywords:**

- veteran counselor Cincinnati
- first responder therapist Cincinnati
- women therapist Cincinnati
- LPCC-S Cincinnati

**Files Updated:**

- `/src/app/(app)/layout.tsx`
- `/src/utils/generateMeta.ts`
- `/src/utils/mergeOpenGraph.ts`

### 3. Geo-Location Meta Tags

Added geographic meta tags to help search engines identify your location:

- `geo.region`: US-OH
- `geo.placename`: Cincinnati
- `geo.position`: Coordinates (39.1431;-84.4280)

### 4. Improved Sitemap

Updated `sitemap.ts` with better priorities:

- Home page: Priority 1.0, Daily updates
- About/Contact: Priority 0.9, Weekly updates
- Services: Priority 0.7, Monthly updates

---

## 🚀 Critical Next Steps (Required for Maximum Local SEO Impact)

### 1. **Create & Verify Google Business Profile** ⭐ HIGHEST PRIORITY

Without a Google Business Profile, you're missing the #1 local SEO opportunity.

**Action Items:**

1. Go to https://business.google.com
2. Create business profile with:
   - **Business Name**: Redbird Counseling and Consulting
   - **Address**: 5725 Dragon Way, Suite 320, Cincinnati, OH 45227
   - **Phone**: (513) 279-8949
   - **Website**: https://www.meetredbirdcounseling.com
   - **Category**: Primary - "Counselor", Secondary - "Mental health service", "Psychotherapist"
   - **Service Area**: Cincinnati, OH + Northern Kentucky
3. Verify your business (via postcard, phone, or email)
4. Complete 100% of your profile:
   - Upload photos (office, logo, team photos)
   - Add business hours
   - Write a compelling description (use local keywords)
   - Add all services
   - Enable messaging
   - Create your first post

**Expected Impact**: This alone can get you into Google's "Map Pack" (the top 3 local results with maps).

### 2. **Google Search Console Setup**

1. Go to https://search.google.com/search-console
2. Add property: `https://www.meetredbirdcounseling.com`
3. Verify ownership using HTML tag method
4. Submit sitemap: `https://www.meetredbirdcounseling.com/sitemap.xml`
5. Monitor performance and fix any crawl errors

**To verify**, add this meta tag to `/src/app/(app)/layout.tsx`:

```tsx
<meta
  name='google-site-verification'
  content='YOUR_VERIFICATION_CODE'
/>
```

### 3. **Bing Places for Business**

1. Go to https://www.bingplaces.com
2. Import from Google Business Profile or manually add
3. Bing powers Yahoo and DuckDuckGo, so you'll appear there too

### 4. **Build Local Citations (NAP Consistency)**

Ensure your Name, Address, Phone (NAP) is consistent across all directories:

**Essential Directories:**

- ✅ Psychology Today (Already listed)
- [ ] TherapyDen.com
- [ ] GoodTherapy.org
- [ ] Zocdoc (if accepting new patients)
- [ ] Healthgrades
- [ ] Vitals
- [ ] WebMD Provider Directory
- [ ] Yelp for Business
- [ ] Better Business Bureau (BBB)
- [ ] Yellow Pages
- [ ] Facebook Business Page

**Local Cincinnati Directories:**

- Cincinnati.com business directory
- Cincinnati Chamber of Commerce
- Local Cincinnati business directories

### 5. **Content Strategy for Local SEO**

#### Create Location-Specific Blog Posts/Pages:

1. **"Finding a Therapist in Cincinnati: Complete Guide"**
   - Target: "find therapist Cincinnati", "how to find counselor Cincinnati"

2. **"Trauma Therapy in Cincinnati: What to Expect"**
   - Target: "trauma therapy Cincinnati", "PTSD treatment Cincinnati"

3. **"Substance Use Counseling in Cincinnati: Your Path to Recovery"**
   - Target: "addiction counselor Cincinnati", "substance abuse treatment Cincinnati"

4. **"Veterans and First Responders: Specialized Counseling in Cincinnati"**
   - Target: "veteran therapist Cincinnati", "first responder counseling Cincinnati"

5. **"Does Insurance Cover Therapy in Cincinnati?"**
   - Target: "therapy insurance Cincinnati", "counseling coverage Cincinnati"

Each post should:

- Include Cincinnati in the title, URL, and naturally throughout
- Have 1000-1500 words minimum
- Include local landmarks/neighborhoods when relevant
- Link to your services pages
- Include clear CTAs to book consultation

### 6. **Get Online Reviews** ⭐ CRITICAL

Reviews are a major ranking factor for local SEO.

**Strategy:**

1. After successful sessions, send follow-up email asking for review
2. Make it easy with direct links:
   - Google Business Profile review link
   - Psychology Today review
3. Respond to ALL reviews (positive and negative)
4. Aim for 20+ Google reviews in first 3 months

**Email Template:**

> "Hi [Name], I hope you're doing well. If you've found our sessions helpful, I'd be grateful if you could share your experience with a brief review. Your feedback helps others in Cincinnati find the support they need. [Link to Google Review]"

### 7. **Local Link Building**

**Opportunities:**

- Partner with local organizations (veteran groups, women's organizations)
- Write guest posts for Cincinnati health/wellness blogs
- Get listed on Xavier University alumni directory (if applicable)
- Sponsor local events or support groups
- Partner with local doctors/psychiatrists for referrals (and backlinks)
- Cincinnati mental health resource pages

### 8. **Technical Optimizations**

**Still To Do:**

- [ ] Add FAQ section to homepage or dedicated FAQ page (leverage the FAQ schema)
- [ ] Ensure fast page load times (already using Next.js - good!)
- [ ] Mobile optimization testing
- [ ] Add alt text to all images with location keywords where appropriate
- [ ] Create video content (rank for video searches)

---

## 📊 Monitoring & Tracking

### Setup Analytics (If Not Already Done):

1. **Google Analytics 4**: Track traffic sources and conversions
2. **Google Search Console**: Monitor search rankings and click-through rates
3. **Google Business Profile Insights**: Track how people find you on Google

### Key Metrics to Track:

- Search impressions for target keywords
- Click-through rate (CTR)
- Average position in search results
- Google Business Profile views
- Phone calls from Google
- Website visits from organic search
- Conversion rate (consultation bookings)

### Monthly Check-ins:

- Review search rankings for target keywords
- Analyze traffic from organic search
- Monitor and respond to reviews
- Post updates on Google Business Profile
- Check for new citation opportunities

---

## 🎯 Target Keywords by Priority

### Tier 1 (Highest Priority - Main Location Keywords):

1. counselor Cincinnati
2. therapist Cincinnati
3. Cincinnati counselor
4. Cincinnati therapist
5. mental health counselor Cincinnati

### Tier 2 (Service + Location):

6. trauma therapist Cincinnati
7. PTSD therapist Cincinnati
8. addiction counselor Cincinnati
9. substance abuse counselor Cincinnati
10. substance use counselor Cincinnati

### Tier 3 (Specialty + Location):

11. veteran counselor Cincinnati
12. first responder therapist Cincinnati
13. women therapist Cincinnati
14. LPCC-S Cincinnati

### Long-Tail Keywords (Lower Competition):

15. "best trauma therapist in Cincinnati"
16. "Cincinnati counselor for PTSD"
17. "substance abuse counselor near me"
18. "veteran mental health Cincinnati"
19. "Cincinnati therapist that accepts insurance"
20. "free consultation therapist Cincinnati"

---

## 💡 Competitive Analysis

### Research Your Competitors:

1. Search for "counselor Cincinnati" and analyze top 3 results
2. Check their:
   - Google Business Profile (reviews, photos, posts)
   - Website content and structure
   - Backlinks (use tools like Ahrefs free backlink checker)
   - Social media presence
3. Identify gaps you can fill

---

## 🔄 Quick Wins (Do These This Week)

1. ✅ **DONE**: Updated site metadata with local keywords
2. ✅ **DONE**: Added structured data
3. ✅ **DONE**: Updated sitemap
4. **TODO**: Create Google Business Profile
5. **TODO**: Set up Google Search Console
6. **TODO**: Ask 5 current/past clients for Google reviews
7. **TODO**: Create/update Facebook Business Page with consistent NAP
8. **TODO**: Claim Psychology Today listing (verify it's claimed and complete)
9. **TODO**: Take professional photos of office for Google Business Profile
10. **TODO**: Write first blog post targeting "therapy in Cincinnati"

---

## 📈 Expected Timeline for Results

- **Week 1-2**: Technical improvements indexed (Google Search Console will show)
- **Month 1**: Google Business Profile active, first reviews coming in
- **Month 2-3**: Start appearing in local pack (map results) for some keywords
- **Month 3-6**: Climbing rankings for target keywords
- **Month 6-12**: Establish top 3 positions for primary keywords

**Important**: Local SEO is a marathon, not a sprint. Consistency is key!

---

## 📞 Current Business Information (NAP)

**Ensure this is EXACTLY the same everywhere:**

**Name**: Redbird Counseling and Consulting
**Address**: 5725 Dragon Way, Suite 320, Cincinnati, OH 45227
**Phone**: (513) 279-8949
**Website**: https://www.meetredbirdcounseling.com
**Email**: nicole@meetredbirdcounseling.com

---

## 🔗 Helpful Resources

- [Google Business Profile Help](https://support.google.com/business)
- [Google Search Console](https://search.google.com/search-console)
- [Local SEO Guide](https://moz.com/learn/seo/local)
- [Schema.org Documentation](https://schema.org/LocalBusiness)
- [Psychology Today Profile](https://www.psychologytoday.com/us/therapists/nicole-michels-cincinnati-oh/1086696)

---

## 📝 Notes

- Your Psychology Today profile is well-optimized and includes good local keywords
- You have 16 years of experience - use this as a trust signal
- You're licensed in both OH and KY - emphasize this geographic advantage
- Consider adding client testimonials to your website (with permission)
- The fact that you accept most major insurance is a competitive advantage - highlight this

---

**Questions or need help implementing any of these? Let me know!**

Last Updated: October 21, 2025
