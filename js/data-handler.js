// Data handler for loading and filtering adult health data (SAMHSA NSDUH)

class DataHandler {
    constructor() {
        this.data = [];
        this.filteredData = [];
    }

    // Load data from JSON file
    async loadData() {
        try {
            const response = await fetch('data/adult-statistics.json');
            if (!response.ok) throw new Error('Failed to load data');
            const jsonData = await response.json();
            this.data = jsonData.data;
            this.filteredData = [...this.data];
            console.log(`Loaded ${this.data.length} adult health records`);
            return true;
        } catch (error) {
            console.error('Error loading data:', error);
            return false;
        }
    }

    // Get unique values for a specific field
    getUniqueValues(field) {
        const values = [...new Set(this.data.map(item => item[field]))];
        return values.sort((a, b) => {
            // Custom sort for age groups
            if (field === 'age_group') {
                const ageOrder = { '18-25': 1, '26-40': 2, '41-65': 3, '65+': 4 };
                return (ageOrder[a] || 0) - (ageOrder[b] || 0);
            }
            // Numeric sort for years
            if (field === 'year') {
                return a - b;
            }
            return a > b ? 1 : -1;
        });
    }

    // Filter data based on criteria
    filterData(criteria) {
        this.filteredData = this.data.filter(item => {
            if (criteria.year && item.year !== criteria.year) return false;
            if (criteria.age_group && item.age_group !== criteria.age_group) return false;
            if (criteria.condition && item.condition !== criteria.condition) return false;
            if (criteria.metric_type && item.metric_type !== criteria.metric_type) return false;
            return true;
        });
        return this.filteredData;
    }

    // Get trend data over time
    getTrendData(criteria) {
        const filtered = this.filterByPartialCriteria(criteria, ['year']);
        const grouped = {};

        filtered.forEach(item => {
            const year = item.year;
            if (!grouped[year]) grouped[year] = [];
            grouped[year].push(item.value);
        });

        return Object.keys(grouped)
            .sort((a, b) => a - b)
            .map(year => ({
                year,
                value: (grouped[year].reduce((a, b) => a + b, 0) / grouped[year].length).toFixed(2)
            }));
    }

    // Get data by age group
    getByAgeGroup(criteria) {
        const filtered = this.filterByPartialCriteria(criteria, ['age_group']);
        const grouped = {};

        filtered.forEach(item => {
            const key = item.age_group;
            if (!grouped[key]) grouped[key] = [];
            grouped[key].push(item.value);
        });

        const ageOrder = { '18-25': 1, '26-40': 2, '41-65': 3, '65+': 4 };
        return Object.keys(grouped)
            .map(ageGroup => ({
                age_group: ageGroup,
                avgValue: (grouped[ageGroup].reduce((a, b) => a + b, 0) / grouped[ageGroup].length).toFixed(2)
            }))
            .sort((a, b) => (ageOrder[a.age_group] || 0) - (ageOrder[b.age_group] || 0));
    }

    // Get data by condition
    getByCondition(criteria) {
        const filtered = this.filterByPartialCriteria(criteria, ['condition']);
        const grouped = {};

        filtered.forEach(item => {
            const key = item.condition;
            if (!grouped[key]) grouped[key] = [];
            grouped[key].push(item.value);
        });

        return Object.keys(grouped)
            .sort()
            .map(condition => ({
                condition: this.formatConditionName(condition),
                avgValue: (grouped[condition].reduce((a, b) => a + b, 0) / grouped[condition].length).toFixed(2)
            }));
    }

    // Get data by metric type
    getByMetricType(criteria) {
        const filtered = this.filterByPartialCriteria(criteria, ['metric_type']);
        const grouped = {};

        filtered.forEach(item => {
            const key = item.metric_type;
            if (!grouped[key]) grouped[key] = [];
            grouped[key].push(item.value);
        });

        return Object.keys(grouped)
            .map(metricType => ({
                metric_type: this.formatMetricTypeName(metricType),
                value: (grouped[metricType].reduce((a, b) => a + b, 0) / grouped[metricType].length).toFixed(2)
            }));
    }

    // Helper to filter by partial criteria (excluding specified fields)
    filterByPartialCriteria(criteria, excludeFields) {
        return this.data.filter(item => {
            for (const field in criteria) {
                if (excludeFields.includes(field)) continue;
                if (criteria[field] && item[field] !== criteria[field]) return false;
            }
            return true;
        });
    }

    // Format condition names for display
    formatConditionName(condition) {
        const names = {
            'depression': 'Depression',
            'anxiety': 'Anxiety',
            'substance_use_disorder': 'Substance Use Disorder',
            'ptsd': 'PTSD'
        };
        return names[condition] || condition;
    }

    // Format metric type names for display
    formatMetricTypeName(metricType) {
        const names = {
            'prevalence': 'Prevalence',
            'treatment_received': 'Treatment Received'
        };
        return names[metricType] || metricType;
    }

    // Get formatted data for table display
    getTableData() {
        return this.filteredData.map(item => ({
            ...item,
            condition: this.formatConditionName(item.condition),
            metric_type: this.formatMetricTypeName(item.metric_type)
        }));
    }
}

// Create global data handler instance
const dataHandler = new DataHandler();
