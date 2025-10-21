# SEO Implementation - Quick Reference

## ✅ What Was Implemented

### 1. **Structured Data (JSON-LD)**

All pages now include rich structured data that helps Google understand your business:

- **LocalBusiness Schema**: Full business details (address, phone, hours, services)
- **ProfessionalService Schema**: Your counseling services
- **FAQPage Schema**: Common questions for featured snippets
- **WebPage Schema**: Page-specific data with breadcrumbs
- **Breadcrumb Schema**: Helps Google understand site hierarchy

**Location**: `/src/utils/structuredData.ts`

### 2. **Enhanced Metadata**

Every page now includes:

- Location-optimized titles: "Page Title | Cincinnati Counseling"
- Descriptions with local keywords
- 30+ relevant local SEO keywords
- Geographic meta tags (coordinates, region)
- Enhanced Open Graph data for social sharing

**Files Updated**:

- `/src/app/(app)/layout.tsx`
- `/src/utils/generateMeta.ts`
- `/src/utils/mergeOpenGraph.ts`
- `/src/app/(app)/[slug]/page.tsx`
- `/src/app/(app)/[slug]/[serviceSlug]/page.tsx`

### 3. **Sitemap Optimization**

Updated sitemap with better priorities:

- Home: 1.0 (highest)
- About/Contact: 0.9
- Other Pages: 0.8
- Services: 0.7

**File**: `/src/app/sitemap.ts`

---

## 🎯 Primary Target Keywords

1. counselor Cincinnati
2. therapist Cincinnati
3. Cincinnati counselor
4. Cincinnati therapist
5. trauma therapist Cincinnati
6. PTSD therapist Cincinnati
7. addiction counselor Cincinnati
8. substance use counselor Cincinnati
9. veteran counselor Cincinnati
10. LPCC-S Cincinnati

---

## 🚀 CRITICAL Next Steps (DO THESE ASAP)

### 1. **Google Business Profile** ⭐ #1 PRIORITY

**Time Required**: 30 minutes
**Impact**: Highest

1. Go to https://business.google.com
2. Create profile:
   - Name: Redbird Counseling and Consulting
   - Address: 5725 Dragon Way, Suite 320, Cincinnati, OH 45227
   - Phone: (513) 279-8949
   - Category: "Counselor" (primary), "Mental health service"
3. Verify business (postcard/phone/email)
4. Complete profile 100%
5. Upload 10+ photos
6. Post weekly updates

### 2. **Google Search Console**

**Time Required**: 15 minutes
**Impact**: High

1. Go to https://search.google.com/search-console
2. Add property
3. Verify ownership
4. Submit sitemap: `https://www.meetredbirdcounseling.com/sitemap.xml`

### 3. **Get Reviews**

**Time Required**: Ongoing
**Impact**: Critical

- Ask happy clients for Google reviews
- Target: 20+ reviews in 3 months
- Respond to ALL reviews

### 4. **Local Directories**

**Time Required**: 2-3 hours
**Impact**: High

Add your business to:

- ✅ Psychology Today (done)
- TherapyDen.com
- GoodTherapy.org
- Healthgrades
- Yelp
- Facebook Business Page

---

## 📊 How to Monitor Results

### Google Search Console

- Check weekly for keyword rankings
- Monitor clicks and impressions
- Fix any crawl errors

### Google Business Profile Insights

- Track profile views
- Monitor phone calls
- Check direction requests

### Analytics

- Watch organic traffic growth
- Monitor conversion rate
- Track phone calls from website

---

## 🎓 Understanding the Changes

### What is Structured Data?

Structured data helps Google understand what your business offers. When someone searches "counselor Cincinnati," Google can see:

- Your services
- Your location
- Your hours
- Your credentials
- Reviews (once you get them)

### What are Local Keywords?

Keywords that include location, like:

- "therapist Cincinnati" instead of just "therapist"
- "trauma therapy Cincinnati OH"
- "counselor near me"

### Why Google Business Profile Matters

When someone searches "counselor Cincinnati," Google shows:

1. **Ads** (paid)
2. **Map Pack** (top 3 local businesses) ⭐ THIS IS YOUR GOAL
3. Organic results

The Map Pack gets 40%+ of clicks. To get in it, you MUST have a Google Business Profile.

---

## 📝 Content Ideas (For Later)

Create blog posts targeting these searches:

1. "How to Find a Therapist in Cincinnati"
2. "Trauma Therapy in Cincinnati: What to Expect"
3. "Does Insurance Cover Therapy in Cincinnati?"
4. "PTSD Treatment Options in Cincinnati"
5. "Choosing a Substance Abuse Counselor in Cincinnati"

Each post should:

- Be 1000-1500 words
- Include "Cincinnati" naturally 5-10 times
- Link to your services
- Have clear call-to-action

---

## ⏱️ Expected Timeline

- **Week 1-2**: Google indexes your improvements
- **Week 2-4**: Google Business Profile verified and active
- **Month 1-2**: First reviews coming in
- **Month 2-3**: Start appearing in local results
- **Month 3-6**: Climbing to top positions
- **Month 6-12**: Dominate local search results

---

## ✅ SEO Health Checklist

**Technical** (All Complete ✅)

- [x] Structured data implemented
- [x] Local keywords in metadata
- [x] Geo-location tags added
- [x] Sitemap optimized
- [x] Page speed optimized (Next.js)
- [x] Mobile responsive

**Off-Site** (To Do)

- [ ] Google Business Profile created
- [ ] Google Search Console set up
- [ ] 20+ Google reviews
- [ ] Listed in 10+ directories
- [ ] Local backlinks acquired

---

## 📞 Business Information (NAP)

**Always use EXACTLY this format everywhere:**

Redbird Counseling and Consulting
5725 Dragon Way, Suite 320
Cincinnati, OH 45227
(513) 279-8949
https://www.meetredbirdcounseling.com
nicole@meetredbirdcounseling.com

**Why consistency matters**: Google uses NAP to verify your business. If your address is "Suite 320" in one place and "Ste 320" in another, Google might think they're different businesses.

---

## 🆘 Troubleshooting

**"I'm not showing up in search"**

- Give it 2-4 weeks for Google to index changes
- Make sure Google Business Profile is verified
- Get at least 5 Google reviews

**"My competitor ranks higher"**

- Check their review count (you need more)
- Check their Google Business Profile completeness
- Analyze their website content

**"I'm not in the Map Pack"**

- This requires Google Business Profile
- Need 10+ reviews minimum
- Must have consistent NAP across directories

---

## 🔗 Quick Links

- [Google Business Profile](https://business.google.com)
- [Google Search Console](https://search.google.com/search-console)
- [Your Psychology Today Profile](https://www.psychologytoday.com/us/therapists/nicole-michels-cincinnati-oh/1086696)
- [Schema Validator](https://validator.schema.org/)
- [Rich Results Test](https://search.google.com/test/rich-results)

---

## 💬 Questions?

If you need help with any of these steps, just ask! The most important thing is to get your Google Business Profile set up THIS WEEK.

**Remember**: Local SEO is a marathon, not a sprint. Stay consistent, get reviews, and be patient. Results will come!

---

Last Updated: October 21, 2025
