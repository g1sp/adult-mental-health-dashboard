// Chart manager for creating and updating visualizations

class ChartManager {
    constructor() {
        this.charts = {
            trend: null,
            ageGroup: null,
            condition: null,
            distribution: null
        };
        this.colors = {
            primary: '#3498db',
            success: '#27ae60',
            danger: '#e74c3c',
            warning: '#f39c12',
            info: '#2c3e50'
        };
    }

    // Create trend chart (line chart)
    createTrendChart(data) {
        const ctx = document.getElementById('trendChart').getContext('2d');

        if (this.charts.trend) {
            this.charts.trend.destroy();
        }

        const labels = data.map(d => d.year);
        const values = data.map(d => parseFloat(d.value));

        this.charts.trend = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Average Prevalence (%)',
                    data: values,
                    borderColor: this.colors.primary,
                    backgroundColor: 'rgba(52, 152, 219, 0.1)',
                    borderWidth: 3,
                    tension: 0.4,
                    fill: true,
                    pointRadius: 6,
                    pointBackgroundColor: this.colors.primary,
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointHoverRadius: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 50,
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    }
                }
            }
        });
    }

    // Create age group comparison chart (bar chart)
    createAgeGroupChart(data) {
        const ctx = document.getElementById('ageGroupChart').getContext('2d');

        if (this.charts.ageGroup) {
            this.charts.ageGroup.destroy();
        }

        const labels = data.map(d => d.age_group);
        const values = data.map(d => parseFloat(d.avgValue));

        this.charts.ageGroup = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Average Prevalence (%)',
                    data: values,
                    backgroundColor: [
                        this.colors.primary,
                        this.colors.warning,
                        this.colors.danger,
                        '#9b59b6'
                    ],
                    borderColor: [
                        this.colors.primary,
                        this.colors.warning,
                        this.colors.danger,
                        '#9b59b6'
                    ],
                    borderWidth: 1,
                    borderRadius: 4
                }]
            },
            options: {
                indexAxis: 'x',
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 50,
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    }
                }
            }
        });
    }

    // Create condition comparison chart (bar chart)
    createConditionChart(data) {
        const ctx = document.getElementById('conditionChart').getContext('2d');

        if (this.charts.condition) {
            this.charts.condition.destroy();
        }

        const labels = data.map(d => d.condition);
        const values = data.map(d => parseFloat(d.avgValue));

        this.charts.condition = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Average Prevalence (%)',
                    data: values,
                    backgroundColor: this.colors.success,
                    borderColor: this.colors.success,
                    borderWidth: 1,
                    borderRadius: 4
                }]
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
                    }
                },
                scales: {
                    x: {
                        beginAtZero: true,
                        max: 50,
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    }
                }
            }
        });
    }

    // Create distribution chart (pie chart)
    createDistributionChart(data) {
        const ctx = document.getElementById('distributionChart').getContext('2d');

        if (this.charts.distribution) {
            this.charts.distribution.destroy();
        }

        const labels = data.map(d => d.metric_type);
        const values = data.map(d => parseFloat(d.value));
        const colorPalette = [
            this.colors.primary,
            this.colors.success,
            this.colors.warning,
            this.colors.danger
        ];

        this.charts.distribution = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{
                    data: values,
                    backgroundColor: colorPalette.slice(0, labels.length),
                    borderColor: '#fff',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        position: 'right'
                    }
                }
            }
        });
    }

    // Update all charts with filtered data
    updateCharts(criteria) {
        // Get data for each chart type
        const trendData = dataHandler.getTrendData(criteria);
        const ageGroupData = dataHandler.getByAgeGroup(criteria);
        const conditionData = dataHandler.getByCondition(criteria);
        const metricData = dataHandler.getByMetricType(criteria);

        // Update or create charts
        if (trendData.length > 0) {
            this.createTrendChart(trendData);
        }
        if (ageGroupData.length > 0) {
            this.createAgeGroupChart(ageGroupData);
        }
        if (conditionData.length > 0) {
            this.createConditionChart(conditionData);
        }
        if (metricData.length > 0) {
            this.createDistributionChart(metricData);
        }
    }

    // Destroy all charts
    destroyAllCharts() {
        Object.values(this.charts).forEach(chart => {
            if (chart) chart.destroy();
        });
    }
}

// Create global chart manager instance
const chartManager = new ChartManager();
