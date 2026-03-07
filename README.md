# Adult Mental Health Dashboard

## 🎯 Overview

The **Adult Mental Health Dashboard** is a web application providing evidence-based mental health information, treatment options, and risk factor education for adults (18+). Built with vanilla JavaScript, HTML5, CSS3, and Bootstrap 5, it requires no build tools or backend infrastructure.

This dashboard complements the Youth Mental Health Dashboard by focusing on adult-specific mental health issues, treatments, and risk factors.

---

## ✨ Features

### 📊 Dashboard Tab
- **Interactive Data Visualization**: Real-time charts showing mental health trends
- **Advanced Filtering**: Filter by year, age group, condition, and metric type
- **Data Table**: Detailed prevalence statistics with averages
- **4 Chart Types**:
  - Trend Analysis (prevalence over time)
  - Age Group Comparison (18-25, 26-40, 41-65, 65+)
  - Condition Comparison (depression, anxiety, substance use, PTSD)
  - Distribution Analysis (prevalence vs. treatment rates)

### 💊 Evidence-Based Treatments Tab
- **15 Adult Treatments** including:
  - Psychotherapy (CBT, DBT, IPT, MBCT)
  - Medications (SSRIs, SNRIs, specialized treatments)
  - Integrated/Support Treatments (couples therapy, teletherapy, groups)
  - Crisis Interventions (hospitalization, ECT, ketamine therapy)
  - Lifestyle Interventions and Residential Programs
- **Multi-Dimensional Filtering**: By condition, category, age group
- **Effectiveness Ratings**: 50-90% with visual indicators
- **Detailed Modal**: Full treatment information with resources

### ⚠️ Risk Factors & Causes Tab
- **15 Adult Risk Factors** across 6 categories:
  - **Biological**: Family history, trauma, chronic illness, substance abuse
  - **Occupational**: Work stress, unemployment, job loss
  - **Relational**: Relationship problems, caregiving burden, life transitions
  - **Systemic**: Financial insecurity, discrimination, stigma
  - **Social**: Social isolation, loneliness
  - **Lifestyle**: Poor sleep, sedentary behavior, poor nutrition
- **Filtering by Condition & Category**
- **Risk Assessment**: Warning signs and prevention tips
- **Detailed Modals**: Full information on each risk factor

### 📚 Learning Tab
- Educational content about the dashboard architecture
- Technology overview (HTML, CSS, JavaScript, Bootstrap, Chart.js)
- Key concepts and how to adapt this dashboard

---

## 📊 Data Overview

### Adult Statistics (SAMHSA NSDUH)
- **96 total records** covering:
  - **Years**: 2019, 2021, 2023 (3 years of data)
  - **Age Groups**: 18-25, 26-40, 41-65, 65+
  - **Conditions**: Depression, Anxiety, Substance Use Disorder, PTSD
  - **Metrics**: Prevalence Rate, Treatment Received
- **Source**: Based on real SAMHSA NSDUH statistics

### Treatments Database
- **15 Evidence-Based Treatments**
- **Categories**: Psychotherapy, Medication, Integrated, Support, Lifestyle, Crisis
- **Age Group Coverage**: 18-25, 26-40, 41-65, 65+
- **Effectiveness Ratings**: 50-90% based on clinical research
- **Conditions Covered**: Depression, Anxiety, PTSD, Substance Use Disorder

### Risk Factors Database
- **15 Adult Risk Factors**
- **6 Category Types**: Biological, Occupational, Relational, Systemic, Social, Lifestyle
- **Prevalence Data**: Real statistics where available
- **Warning Signs & Prevention**: Actionable guidance for each factor

---

## 🏗️ Architecture

### Project Structure
```
AdultMentalHealth/
├── index.html                      # Main page (4-tab interface)
├── css/
│   └── style.css                   # Responsive styling
├── js/
│   ├── app.js                      # Main orchestrator
│   ├── data-handler.js             # Statistics data management
│   ├── chart-manager.js            # Chart.js integration
│   ├── treatment-handler.js        # Treatment data logic
│   ├── treatment-ui.js             # Treatment presentation
│   ├── risk-factors-handler.js     # Risk factor data logic
│   └── risk-factors-ui.js          # Risk factor presentation
└── data/
    ├── adult-statistics.json       # SAMHSA NSDUH data
    ├── treatments-data.json        # Adult treatments
    └── risk-factors-data.json      # Adult risk factors
```

### Design Patterns

**Handler/UI Separation**
- `*-handler.js`: Business logic, data filtering, formatting
- `*-ui.js`: DOM manipulation, rendering, user interactions

**Singleton Pattern**
- Global instances: `dataHandler`, `chartManager`, `treatmentHandler`, etc.

**MVC-like Architecture**
- `app.js`: Controller (orchestration)
- `*-handler.js`: Model (data)
- `*-ui.js` + HTML: View (presentation)

---

## 🚀 Getting Started

### Quick Start (30 seconds)

1. **Clone or Download**
   ```bash
   git clone https://github.com/YOUR-ORG/adult-mental-health-dashboard.git
   cd AdultMentalHealth
   ```

2. **Open in Browser**
   ```bash
   # Option 1: Simple HTTP server (Python 3)
   python3 -m http.server 8000
   # Visit: http://localhost:8000

   # Option 2: Simple HTTP server (Node.js)
   npx http-server
   # Visit: http://localhost:8080

   # Option 3: Just open the file
   open index.html
   ```

3. **Explore**
   - Click on the tabs to see different sections
   - Use filters to explore mental health data
   - Click treatment/risk factor cards to see details

### No Installation Required
- ✅ No npm/build tools
- ✅ No database setup
- ✅ No API keys
- ✅ No environment configuration

All dependencies loaded from CDN:
- **Bootstrap 5.3.0**: UI framework
- **Chart.js 4.4.0**: Data visualization

---

## 💻 Technologies

### Frontend Stack
- **HTML5**: Semantic markup
- **CSS3**: Responsive design with Grid/Flexbox
- **JavaScript (ES6+)**: Vanilla (no frameworks)
- **Bootstrap 5**: Component library
- **Chart.js**: Data visualization

### Key Features
- Responsive design (mobile, tablet, desktop)
- No build tools required
- Local data (no API calls)
- Modal interactions
- Real-time filtering
- Professional styling

---

## 📱 Responsive Design

### Breakpoints
- **Mobile** (<576px): Single column, touch-friendly
- **Tablet** (576-768px): 2-column grid layout
- **Desktop** (>768px): Full multi-column layouts

### Tested On
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile Safari (iOS)
- Chrome Mobile (Android)

---

## 🔐 Data Sources & Trust

### Health Data Sources
- **SAMHSA NSDUH**: National Survey on Drug Use and Health (annual adult statistics)
- **NIMH**: National Institute of Mental Health research
- **CDC**: Centers for Disease Control health data
- **FDA**: Medication and treatment approvals
- **APA**: American Psychological Association clinical guidelines

### Data Methodology
- Evidence-based treatment effectiveness from clinical trials
- Prevalence rates from peer-reviewed epidemiological studies
- Risk factor data from public health literature
- All data for educational purposes

---

## 🎓 Learning Resources

### Included in Dashboard
- "How to Build This App" tab with complete documentation
- Code examples and architecture explanation
- JavaScript concepts covered
- CSS/responsive design patterns

### External Resources
- [MDN Web Docs](https://developer.mozilla.org/) - JavaScript and CSS
- [Bootstrap Documentation](https://getbootstrap.com/docs/)
- [Chart.js Documentation](https://www.chartjs.org/)
- [JavaScript.info](https://javascript.info/) - Core concepts
- [CSS-Tricks](https://css-tricks.com/) - Advanced CSS

---

## 🧪 Testing

### Manual Testing Checklist
- ✅ All tabs load without errors
- ✅ All filters work independently and combined
- ✅ Charts render smoothly on all screen sizes
- ✅ Modal opens/closes properly
- ✅ Responsive design on mobile/tablet/desktop
- ✅ All external links are valid
- ✅ No console errors in browser DevTools

### Test in Browser
1. Open `index.html` in browser
2. Press `F12` to open DevTools
3. Check Console tab for any errors
4. Try all filters and interactions
5. Check Application tab to see data loading

---

## 🚀 Deployment

### GitHub Pages (Free)
```bash
# Create repo
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR-ORG/adult-mental-health-dashboard.git
git push -u origin main

# Enable Pages in repository settings
# Select "main" branch as source
# Your dashboard will be at: https://YOUR-ORG.github.io/adult-mental-health-dashboard
```

### Netlify (Free)
1. Connect your GitHub repository
2. Build command: (leave empty - no build needed)
3. Publish directory: `/` (root)
4. Deploy!

### Traditional Hosting
- Copy files to web server
- No build step needed
- Works with any web host
- HTTPS recommended

---

## 📝 Customization Guide

### Add New Treatment
Edit `data/treatments-data.json`:
```json
{
  "id": 16,
  "name": "New Treatment",
  "category": "Psychotherapy",
  "conditions": ["depression", "anxiety"],
  "description": "...",
  "effectiveness": 75,
  "age_groups": ["18-25", "26-40", "41-65", "65+"],
  "duration": "...",
  "modality": "...",
  "resources": ["..."],
  "key_benefits": ["..."],
  "considerations": "..."
}
```

### Add New Risk Factor
Edit `data/risk-factors-data.json`:
```json
{
  "id": 16,
  "name": "New Risk Factor",
  "category": "Occupational",
  "conditions": ["depression"],
  "description": "...",
  "prevalence": "25% of adults",
  "risk_level": "medium",
  "warning_signs": ["..."],
  "prevention_tips": ["..."],
  "resources": ["..."]
}
```

### Modify Styling
Edit `css/style.css`:
- Color variables: `:root { --primary-color: ... }`
- Responsive breakpoints: `@media (max-width: ...)`
- Component styles: `.card`, `.treatment-card`, etc.

---

## 🐛 Troubleshooting

### Data Won't Load
- Check browser console (F12 → Console tab)
- Verify JSON files are in correct paths
- Confirm JSON is valid using `python3 -m json.tool`

### Charts Not Displaying
- Ensure Chart.js CDN is accessible
- Check browser console for errors
- Try a different browser
- Clear browser cache

### Responsive Design Issues
- Test with browser DevTools (F12 → responsive mode)
- Check CSS media queries
- Verify Bootstrap classes are correct

### Performance Issues
- Clear browser cache
- Close other tabs
- Check for large data operations
- Use browser profiler (DevTools → Performance tab)

---

## 📄 License & Attribution

- **Data Source**: SAMHSA, NIMH, CDC (public datasets)
- **Framework**: Bootstrap 5 (MIT License)
- **Charts**: Chart.js (MIT License)
- **Icons**: Bootstrap Icons (MIT License)

---

## 🤝 Contributing

To contribute improvements:
1. Fork the repository
2. Create a feature branch
3. Make changes with clean commits
4. Submit a pull request
5. Include testing notes

---

## 📞 Support & Issues

- Check existing GitHub issues
- Review troubleshooting section above
- Consult the "How to Build This App" tab for architecture questions
- Report bugs via GitHub Issues

---

## 💙 Mental Health Resources

### Crisis Support
- **National Suicide Prevention Lifeline**: 988
- **Crisis Text Line**: Text HOME to 741741
- **SAMHSA National Helpline**: 1-800-662-4357 (free, confidential, 24/7)

### Information
- [SAMHSA.gov](https://www.samhsa.gov/)
- [NIMH.nih.gov](https://www.nimh.nih.gov/)
- [CDC Mental Health](https://www.cdc.gov/mentalhealth/)
- [NAMI.org](https://www.nami.org/)

---

## 🎯 Version

**Adult Mental Health Dashboard v1.0**

Last Updated: March 2026

---

Made with 💙 for adult mental health awareness and education.
