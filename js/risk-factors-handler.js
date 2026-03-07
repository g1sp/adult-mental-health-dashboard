// Risk Factors data handler for loading and filtering risk factors

class RiskFactorsHandler {
    constructor() {
        this.riskFactors = [];
    }

    // Load risk factors from JSON file
    async loadRiskFactors() {
        try {
            const response = await fetch('data/risk-factors-data.json');
            if (!response.ok) throw new Error('Failed to load risk factors');
            const data = await fetch('data/risk-factors-data.json').then(r => r.json());
            this.riskFactors = data.risk_factors;
            console.log(`Loaded ${this.riskFactors.length} risk factors`);
            return true;
        } catch (error) {
            console.error('Error loading risk factors:', error);
            return false;
        }
    }

    // Filter risk factors by condition and category
    filterRiskFactors(condition = '', category = '') {
        return this.riskFactors.filter(factor => {
            const matchesCondition = !condition || factor.conditions.includes(condition);
            const matchesCategory = !category || factor.category === category;
            return matchesCondition && matchesCategory;
        });
    }

    // Get unique categories
    getCategories() {
        const categories = new Set();
        this.riskFactors.forEach(factor => {
            categories.add(factor.category);
        });
        return Array.from(categories).sort();
    }

    // Get unique conditions
    getConditions() {
        const conditions = new Set();
        this.riskFactors.forEach(factor => {
            factor.conditions.forEach(condition => {
                conditions.add(condition);
            });
        });
        return Array.from(conditions).sort();
    }

    // Get risk factors by condition
    getByCondition(condition) {
        return this.riskFactors.filter(factor => factor.conditions.includes(condition));
    }

    // Get risk factors by category
    getByCategory(category) {
        return this.riskFactors.filter(factor => factor.category === category);
    }

    // Format condition name for display
    formatConditionName(condition) {
        const names = {
            'depression': 'Depression',
            'anxiety': 'Anxiety',
            'ptsd': 'PTSD',
            'substance_use_disorder': 'Substance Use Disorder'
        };
        return names[condition] || condition;
    }

    // Format category name for display
    formatCategoryName(category) {
        const names = {
            'Biological': 'Biological Factors',
            'Occupational': 'Occupational Factors',
            'Relational': 'Relational Factors',
            'Systemic': 'Systemic Factors',
            'Social': 'Social Factors',
            'Lifestyle': 'Lifestyle Factors'
        };
        return names[category] || category;
    }

    // Get category badge color
    getCategoryBadge(category) {
        const badges = {
            'Biological': 'info',
            'Occupational': 'warning',
            'Relational': 'primary',
            'Systemic': 'dark',
            'Social': 'secondary',
            'Lifestyle': 'success'
        };
        return badges[category] || 'secondary';
    }

    // Format risk factor details for display
    formatRiskFactorDetails(factor) {
        return {
            categoryBadge: this.getCategoryBadge(factor.category),
            conditionsList: factor.conditions.map(c => this.formatConditionName(c)).join(', '),
            categoryName: this.formatCategoryName(factor.category)
        };
    }

    // Get primary resource for risk factor
    getPrimaryResource(factor) {
        return factor.resources && factor.resources.length > 0 ? factor.resources[0] : '#';
    }

    // Get risk level (based on prevalence)
    getRiskLevel(factor) {
        if (!factor.risk_level) return 'low';
        return factor.risk_level;
    }
}

// Create global risk factors handler instance
const riskFactorsHandler = new RiskFactorsHandler();
