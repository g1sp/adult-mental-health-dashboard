# Provider Finder Feature - Complete Guide

## 🏥 Overview

The **Provider Finder** is a powerful new feature that helps users locate evidence-based mental health treatment facilities near them. It integrates with official SAMHSA data to provide verified, accurate provider information.

---

## ✨ Features

### Location Search
- **Address-based search**: Enter city, state, zip code, or full address
- **Geolocation**: Use your current location with one click
- **Search radius**: Adjust from 5 to 100 miles
- **Free geocoding**: Uses OpenStreetMap Nominatim API

### Filtering Options
1. **Treatment Type**
   - Outpatient
   - Inpatient
   - Residential
   - Telehealth
   - Crisis Care

2. **Insurance**
   - Medicaid
   - Medicare
   - Private Insurance

3. **Specialization**
   - Substance Use Disorders
   - Trauma/PTSD
   - Dual Diagnosis
   - Mental Health

### Provider Information
Each provider listing displays:
- Name and facility type
- Address and distance from search location
- Phone number (clickable for direct call)
- Website link
- Accepted insurance types
- Languages spoken
- Hours of operation
- Treatment services offered
- Specializations

### Crisis Resources
Prominently displayed emergency contacts:
- **National Suicide Prevention Lifeline**: 988
- **SAMHSA National Helpline**: 1-800-662-4357
- **Crisis Text Line**: Text HOME to 741741

---

## 🎯 How to Use

### Step 1: Navigate to Provider Finder Tab
Click the **🏥 Find Treatment** tab in the dashboard

### Step 2: Enter Location
**Option A - Address Search:**
1. Type a location (e.g., "10001" or "New York, NY" or "123 Main St, Boston MA")
2. Click "Search" or press Enter

**Option B - Use Current Location:**
1. Click the 📍 button
2. Allow location access when prompted
3. Dashboard automatically searches your area

### Step 3: Adjust Search Parameters
- Change **Search Radius** (5-100 miles)
- Select **Treatment Type** (if looking for specific service)
- Filter by **Insurance** (if needed)
- Select **Specialization** (if looking for specific focus)

### Step 4: Review Results
- See provider cards sorted by distance
- Click any card to view full details
- Contact information is clickable for direct calls

### Step 5: Get More Information
- Click card to open detailed modal
- View all services and insurance info
- Click phone number to call directly
- Visit website for more details

---

## 📊 Data Source & Accuracy

### SAMHSA Treatment Locator
- **Source**: Substance Abuse and Mental Health Services Administration
- **Database**: Official U.S. Government treatment facility directory
- **Coverage**: Nationwide network of verified providers
- **Updates**: Regularly updated by SAMHSA

### What This Means
✅ All providers are verified by SAMHSA
✅ Data is current and accurate
✅ Includes both government and private facilities
✅ Covers all major treatment types
✅ No spam or unverified listings

### Official Resources
- **SAMHSA Treatment Locator**: https://findtreatment.gov
- **SAMHSA National Helpline**: 1-800-662-4357
- **SAMHSA Homepage**: https://www.samhsa.gov

---

## 🛠️ Technical Details

### Architecture

**provider-finder.js** - Core Logic
```javascript
ProviderFinder class handles:
- API communication with SAMHSA
- Data formatting and parsing
- Filtering by multiple criteria
- Distance calculation
- Provider sorting
- Data caching
```

**provider-finder-ui.js** - User Interface
```javascript
ProviderFinderUI class handles:
- Provider card rendering
- Modal dialogs
- Geolocation detection
- Address geocoding
- Error handling
- User feedback
```

### APIs Used

1. **SAMHSA Treatment Locator API**
   - Endpoint: `https://findtreatment.gov/api/endpoint.php`
   - Parameters: `latitude`, `longitude`, `radius`
   - Format: JSON
   - Authentication: None (public API)

2. **OpenStreetMap Nominatim API**
   - Endpoint: `https://nominatim.openstreetmap.org/search`
   - Purpose: Address geocoding (address → coordinates)
   - Authentication: None (public API)
   - Rate Limiting: ~1 request/second

3. **Browser Geolocation API**
   - Standard: W3C Geolocation API
   - Requires: User permission
   - Returns: Latitude and longitude

### Data Flow

```
User Input (Address/Location)
    ↓
Geocoding (Address → Coordinates)
    ↓
SAMHSA API Query (Coordinates + Radius)
    ↓
Data Formatting & Parsing
    ↓
Apply Filters (Type, Insurance, Specialization)
    ↓
Sort by Distance
    ↓
Render Provider Cards
    ↓
User clicks for Details → Modal Display
```

---

## 🔒 Privacy & Security

### What Data is Collected?
**When you search:**
- Your search location (temporary, not stored)
- Filter preferences (temporary, not stored)

**What data is NOT collected:**
- Personal health information
- Medical history
- Insurance details
- Name or contact information
- Search history

### Privacy Practices
✅ No user tracking
✅ No cookies stored
✅ No data shared with third parties
✅ Searches are temporary
✅ All computation happens in browser
✅ Only official SAMHSA data used

---

## 📱 Responsive Design

### Mobile (< 576px)
- Single column layout
- Touch-friendly buttons
- Location input optimized for mobile keyboards
- Full functionality on all devices

### Tablet (576-768px)
- Responsive grid layout
- Side-by-side filter controls
- Proper spacing for touch

### Desktop (> 768px)
- Full multi-column grid
- All filters visible
- Optimized for mouse input

---

## ⚠️ Error Handling

### Common Scenarios

**Location Not Found**
- Shows helpful error message
- Suggests alternative approaches
- Provides SAMHSA hotline as fallback

**No Providers Found**
- Offers to expand search radius
- Suggests changing filters
- Provides crisis resources

**Geolocation Denied**
- Prompts user to enter address manually
- Explains why location access helps
- Provides step-by-step instructions

**Network Error**
- Clear error messaging
- Suggests retry
- Provides hotline number

---

## 🚀 Usage Examples

### Example 1: Find Outpatient Mental Health Providers
1. Enter: "Seattle, WA"
2. Select Treatment Type: "Outpatient"
3. Click Search
4. Results show nearby outpatient facilities

### Example 2: Find Substance Use Treatment with Insurance
1. Use current location (📍)
2. Select Treatment Type: "All Types"
3. Select Insurance: "Medicaid"
4. Select Specialization: "Substance Use"
5. Results show Medicaid-accepting substance use providers

### Example 3: Find Crisis Care Near You
1. Click 📍 for current location
2. Select Treatment Type: "Crisis Care"
3. Reduce Search Radius to 5 miles
4. Results show nearest crisis facilities
5. Call directly for immediate help

---

## 🎓 Learning Resources

### About Mental Health Treatment
- [SAMHSA.gov](https://www.samhsa.gov/) - Official treatment resources
- [NIMH.nih.gov](https://www.nimh.nih.gov/) - Mental health research
- [NAMI.org](https://www.nami.org/) - Advocacy and support

### About Treatment Types
- **Outpatient**: See therapist/doctor without staying overnight
- **Inpatient**: Stay at facility for intensive care (typically 3-14 days)
- **Residential**: Live at facility for extended treatment (weeks to months)
- **Telehealth**: Virtual appointments via phone/video
- **Crisis Care**: Emergency mental health services

### About Insurance
- **Medicaid**: Government program for low-income individuals
- **Medicare**: Government program for seniors and some disabled people
- **Private Insurance**: Coverage through employer or individual plan

---

## 🆘 When to Use Provider Finder

### Use This Feature When:
✅ Seeking therapy or counseling
✅ Need medication management
✅ Looking for addiction treatment
✅ Need residential treatment
✅ Looking for crisis support
✅ Want to verify insurance coverage
✅ Searching for specific specialization

### Use Crisis Resources When:
🚨 Having suicidal thoughts: **Call 988**
🚨 In immediate danger: **Call 911**
🚨 Need immediate support: **Text 741741**
🚨 Want treatment referrals: **Call 1-800-662-4357**

---

## 💡 Tips & Tricks

### Pro Tip #1: Start with Geolocation
Click 📍 to use your exact location for more accurate results

### Pro Tip #2: Expand Search When Needed
If you get no results, try increasing search radius

### Pro Tip #3: Call First
Always call before showing up - verify hours and availability

### Pro Tip #4: Insurance Questions
If unsure about coverage, ask "Do you accept [insurance name]?"

### Pro Tip #5: Multiple Searches
You can perform multiple searches to compare different areas or specializations

---

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| Location not found | Try entering zip code or full address |
| No providers found | Increase search radius or remove specialization filter |
| Can't use geolocation | Check browser permissions and try address search |
| Website link not working | Call facility directly for website |
| Outdated provider info | Report to SAMHSA at findtreatment.gov |

---

## 🔄 Future Enhancements (Planned)

- Integration with user reviews and ratings
- Appointment booking directly through dashboard
- Wait time information
- Telehealth appointment scheduling
- Insurance verification tool
- Multi-language provider listings
- Advanced filtering options

---

## 📞 Getting Help

### If Provider Information is Incorrect
- Report to SAMHSA: https://findtreatment.gov/contact
- Call SAMHSA Helpline: 1-800-662-4357

### If You Need Immediate Help
- **Suicidal Crisis**: Call 988 or text 988
- **Substance Use Crisis**: Call 1-800-662-4357
- **General Mental Health**: Call SAMHSA at 1-800-662-4357
- **Text Support**: Text HOME to 741741

### For Technical Issues with This Feature
- Clear browser cache and refresh
- Try different browser
- Check internet connection
- Contact project maintainers on GitHub

---

## 📚 Related Resources

**In This Dashboard:**
- Dashboard Tab: View mental health statistics
- Treatments Tab: Learn about evidence-based treatments
- Risk Factors Tab: Understand mental health risks

**External Resources:**
- [SAMHSA Treatment Locator](https://findtreatment.gov) - Official locator
- [Psychology Today Provider Search](https://www.psychologytoday.com/us) - Therapist finder
- [NAMI Helpline](https://www.nami.org/help) - Peer support
- [Crisis Text Line](https://www.crisistextline.org/) - Texting support

---

## 📊 Usage Statistics

The Provider Finder has helped users:
- 🔍 Search treatment facilities nationwide
- 📍 Find providers near their location
- 💳 Filter by insurance coverage
- 🎯 Locate specific treatment types
- 🚨 Access crisis resources

---

## ✅ Quality Assurance

This feature has been:
✅ Tested with real SAMHSA data
✅ Verified on desktop, tablet, mobile
✅ Tested with various locations
✅ Reviewed for accuracy
✅ Checked for accessibility
✅ Verified with crisis resources

---

## 📄 Version History

**v1.0** - Initial Release (March 2026)
- Location-based provider search
- Multi-dimensional filtering
- Integration with SAMHSA API
- Crisis resources display
- Responsive design

---

## 🎯 Our Mission

The Provider Finder exists to:
✅ **Remove barriers** to finding mental health treatment
✅ **Provide accurate** information from official sources
✅ **Save time** for people seeking help
✅ **Empower adults** to take control of their mental health
✅ **Connect people** with verified, professional providers

---

## 💙 Remember

Seeking help is a sign of strength, not weakness.

If you or someone you know is struggling with mental health:
- You're not alone
- Help is available
- Treatment works
- Recovery is possible

**Reach out today:** Call 988 or text 741741

---

**Last Updated**: March 2026
**Status**: Production Ready ✅
**Data Source**: SAMHSA Official Database
