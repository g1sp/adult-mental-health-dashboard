// Success Stories Handler - Load and filter success stories from real recovery journeys

class SuccessStoriesHandler {
    constructor() {
        this.stories = [];
        this.filteredStories = [];
    }

    // Load success stories from JSON
    async loadSuccessStories() {
        try {
            const response = await fetch('data/success-stories.json');
            if (!response.ok) throw new Error('Failed to load success stories');

            const data = await response.json();
            this.stories = data.data;
            this.filteredStories = [...this.stories];

            console.log(`Loaded ${this.stories.length} success stories`);
            return true;
        } catch (error) {
            console.error('Error loading success stories:', error);
            return false;
        }
    }

    // Get unique conditions
    getConditions() {
        const conditions = new Set();
        this.stories.forEach(story => {
            conditions.add(story.condition);
        });
        return Array.from(conditions).sort();
    }

    // Get unique age groups
    getAgeGroups() {
        const ageGroups = new Set();
        this.stories.forEach(story => {
            ageGroups.add(story.age_group);
        });
        return Array.from(ageGroups).sort((a, b) => {
            const order = ['18-25', '26-40', '41-65', '65+'];
            return order.indexOf(a) - order.indexOf(b);
        });
    }

    // Filter stories by criteria
    filterStories(condition = '', ageGroup = '') {
        this.filteredStories = this.stories.filter(story => {
            if (condition && !story.condition.toLowerCase().includes(condition.toLowerCase())) {
                return false;
            }
            if (ageGroup && story.age_group !== ageGroup) {
                return false;
            }
            return true;
        });
        return this.filteredStories;
    }

    // Get story by ID
    getStoryById(id) {
        return this.stories.find(s => s.id === id);
    }

    // Format condition name for display
    formatConditionName(condition) {
        if (!condition) return 'All Conditions';
        return condition
            .split(',')
            .map(c => c.trim().split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '))
            .join(', ');
    }

    // Get recovery duration estimate
    getRecoveryDuration(story) {
        if (story.timeline_years === 0) return 'Ongoing';
        if (story.timeline_years === 1) return '1 year';
        return `${story.timeline_years} years`;
    }

    // Get all stories sorted by recovery timeline
    getStoriesSortedByTimeline() {
        return [...this.filteredStories].sort((a, b) => a.timeline_years - b.timeline_years);
    }

    // Get success rate statistics
    getSuccessStatistics() {
        const stats = {
            total_stories: this.stories.length,
            conditions_represented: this.getConditions().length,
            age_groups_represented: this.getAgeGroups().length,
            avg_recovery_timeline: Math.round(
                this.stories.reduce((sum, s) => sum + s.timeline_years, 0) / this.stories.length
            ),
            treatment_approaches: new Set(),
            key_success_factors: {}
        };

        // Collect treatment approaches
        this.stories.forEach(story => {
            const approaches = story.treatment_approach.split(',').map(a => a.trim());
            approaches.forEach(a => stats.treatment_approaches.add(a));
        });

        // Analyze key success factors
        const factors = ['Therapy', 'Medication', 'Support', 'Professional', 'Commitment', 'Family'];
        factors.forEach(factor => {
            stats.key_success_factors[factor] = this.stories.filter(s =>
                s.treatment_approach.includes(factor) ||
                s.key_milestones.some(m => m.includes(factor))
            ).length;
        });

        return stats;
    }
}

// Create global success stories handler instance
const successStoriesHandler = new SuccessStoriesHandler();
