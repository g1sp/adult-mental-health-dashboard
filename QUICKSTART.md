# Adult Mental Health Dashboard - Quick Start Guide

Get the dashboard running in 30 seconds!

---

## 🚀 30-Second Setup

### Option 1: Open in Browser (Easiest)
```bash
# Just double-click index.html
# Or right-click → Open with → Your Browser
```

### Option 2: Python HTTP Server
```bash
cd AdultMentalHealth
python3 -m http.server 8000
# Open: http://localhost:8000
```

### Option 3: Node.js HTTP Server
```bash
cd AdultMentalHealth
npx http-server
# Open: http://localhost:8080
```

---

## 📊 What You'll See

### Dashboard Tab
- **Filters**: Year, Age Group, Condition, Metric Type
- **Charts**: 4 interactive visualizations
- **Table**: Detailed statistics
- **Try this**: Select "2023" year to see latest data

### Treatments Tab (💊)
- **15 Treatments**: Psychotherapy, medications, crisis care
- **Filters**: By condition, category, age group
- **Click any card** to see full details

### Risk Factors Tab (⚠️)
- **15 Risk Factors**: Work stress, financial, relationships, health
- **Filters**: By condition and category
- **Click any card** to see prevention tips

### Learning Tab (📚)
- How the dashboard works
- Technology overview
- Educational content

---

## 💡 Pro Tips

### 1. Try Different Filters
- Select year 2023 to see trends
- Pick age group 18-25 for young adults
- Filter by depression to see treatments
- Change metric to see treatment rates

### 2. Click Everything
- Click treatment cards → detailed modal
- Click risk factor cards → full info
- Click resource links → external info
- Hover over cards → smooth animations

### 3. Mobile Friendly
- Open on phone/tablet
- All features work
- Touch-friendly buttons
- Responsive charts

---

## 📱 Data at a Glance

### 96 Health Records
- 3 years of data (2019, 2021, 2023)
- 4 age groups (18-25, 26-40, 41-65, 65+)
- 4 conditions (Depression, Anxiety, PTSD, Substance Use)
- 2 metrics (Prevalence, Treatment Received)

### 15 Adult Treatments
- CBT, DBT, Medication, Therapy
- Group support, Teletherapy
- Crisis interventions
- Effectiveness: 50-90%

### 15 Risk Factors
- Work stress, Financial problems
- Relationship issues, Trauma
- Social isolation, Chronic illness
- Caregiving burden, Life transitions

---

## 🛠️ Customization (5 Minutes)

### Change Colors
Edit `css/style.css`:
```css
:root {
    --primary-color: #2c3e50;     /* Change this */
    --success-color: #27ae60;     /* Or this */
    ...
}
```

### Add New Treatment
Edit `data/treatments-data.json`:
```json
{
  "id": 16,
  "name": "New Treatment",
  ...
}
```

### Update Health Data
Edit `data/adult-statistics.json`:
```json
{
  "year": 2024,
  "age_group": "26-40",
  ...
}
```

---

## 📦 Project Files

```
AdultMentalHealth/
├── index.html              ← Open this file
├── css/style.css          ← Styling
├── js/                    ← JavaScript logic
│   ├── app.js
│   ├── data-handler.js
│   ├── chart-manager.js
│   ├── treatment-handler.js
│   ├── treatment-ui.js
│   ├── risk-factors-handler.js
│   └── risk-factors-ui.js
└── data/                  ← Data files
    ├── adult-statistics.json
    ├── treatments-data.json
    └── risk-factors-data.json
```

---

## 🌐 Deploy (3 Steps)

### To GitHub Pages:
```bash
git init
git add .
git commit -m "Add adult mental health dashboard"
git remote add origin https://github.com/YOU/adult-dashboard.git
git push -u origin main
# Enable Pages in repository settings
```

### To Netlify:
1. Connect your GitHub repo
2. Set publish directory to `/`
3. Click Deploy

### To Any Web Host:
1. Upload files to web server
2. No build step needed
3. Access via domain

---

## 🆘 Troubleshooting

| Problem | Solution |
|---------|----------|
| Page blank | Open DevTools (F12), check Console tab |
| Charts not showing | Refresh page, clear cache |
| Filters not working | Check browser console for errors |
| Slow performance | Close other tabs, try different browser |
| Can't open file | Use HTTP server instead of file:// |

---

## 💡 Learning Resources

### Included in App
- Learning tab with code examples
- README.md - Full documentation
- IMPLEMENTATION_SUMMARY.md - Technical details

### Online Resources
- [MDN Web Docs](https://developer.mozilla.org/) - JavaScript
- [Bootstrap Docs](https://getbootstrap.com/docs/) - Styling
- [Chart.js Docs](https://www.chartjs.org/) - Charts

---

## 🎯 Next Steps

1. **Explore** - Try all tabs and filters (2 minutes)
2. **Customize** - Change colors or add treatments (5 minutes)
3. **Deploy** - Put it online (5 minutes)
4. **Share** - Send link to others

---

## 📞 Need Help?

- Read README.md for detailed guide
- Check IMPLEMENTATION_SUMMARY.md for technical info
- Open DevTools (F12) to debug
- Review code comments in JS files

---

## 🎉 You're Ready!

The dashboard is fully functional and ready to use. No configuration needed!

**Have fun exploring adult mental health data!** 💙

---

**Version**: 1.0
**Last Updated**: March 2026
**Status**: Production Ready ✅
