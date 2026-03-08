// Main application logic for Adult Mental Health Dashboard

class MentalHealthApp {
    constructor() {
        this.currentFilters = {
            year: '',
            age_group: '',
            condition: '',
            metric_type: ''
        };
    }

    // Initialize the application
    async init() {
        // Load data
        const dataLoaded = await dataHandler.loadData();
        if (!dataLoaded) {
            console.error('Failed to load data');
            return;
        }

        // Load treatments
        const treatmentsLoaded = await treatmentHandler.loadTreatments();
        if (!treatmentsLoaded) {
            console.error('Failed to load treatments');
            return;
        }

        // Load risk factors
        const riskFactorsLoaded = await riskFactorsHandler.loadRiskFactors();
        if (!riskFactorsLoaded) {
            console.error('Failed to load risk factors');
            return;
        }

        // Populate filter dropdowns
        this.populateDropdowns();

        // Populate treatment filters
        this.populateTreatmentFilters();

        // Populate risk factor filters
        this.populateRiskFactorFilters();

        // Set up event listeners
        this.setupEventListeners();
        this.setupTreatmentEventListeners();
        this.setupRiskFactorEventListeners();
        this.setupProviderFinderEventListeners();

        // Initialize provider finder
        providerFinderUI.initializeModal();

        // Initial chart load
        this.updateAllCharts();

        // Initial treatments load
        this.updateTreatmentsDisplay();

        // Initial risk factors load
        this.updateRiskFactorsDisplay();
    }

    // Populate dropdown selectors with unique values
    populateDropdowns() {
        const years = dataHandler.getUniqueValues('year');
        const ageGroups = dataHandler.getUniqueValues('age_group');
        const conditions = dataHandler.getUniqueValues('condition');
        const metricTypes = dataHandler.getUniqueValues('metric_type');

        this.populateSelect('yearSelect', years);
        this.populateSelect('ageGroupSelect', ageGroups);
        this.populateSelect('conditionSelect', conditions.map(c => ({
            value: c,
            display: dataHandler.formatConditionName(c)
        })));
        this.populateSelect('metricSelect', metricTypes.map(m => ({
            value: m,
            display: dataHandler.formatMetricTypeName(m)
        })));
    }

    // Helper to populate select options
    populateSelect(selectId, options) {
        const select = document.getElementById(selectId);
        if (!select) return;

        // Clear existing options (keep the first "All" option)
        while (select.options.length > 1) {
            select.remove(1);
        }

        // Add options
        options.forEach(option => {
            const opt = document.createElement('option');
            if (typeof option === 'object') {
                opt.value = option.value;
                opt.textContent = option.display;
            } else {
                opt.value = option;
                opt.textContent = option;
            }
            select.appendChild(opt);
        });
    }

    // Populate treatment filter dropdowns
    populateTreatmentFilters() {
        const conditions = treatmentHandler.getConditions();
        const categories = treatmentHandler.getCategories();
        const ageGroups = treatmentHandler.getAgeGroups();

        this.populateSelect('treatmentConditionSelect', conditions.map(c => ({
            value: c,
            display: treatmentHandler.formatConditionName(c)
        })));
        this.populateSelect('treatmentCategorySelect', categories);
        this.populateSelect('treatmentAgeSelect', ageGroups);
    }

    // Populate risk factor filter dropdowns
    populateRiskFactorFilters() {
        const conditions = riskFactorsHandler.getConditions();
        const categories = riskFactorsHandler.getCategories();

        this.populateSelect('riskFactorConditionSelect', conditions.map(c => ({
            value: c,
            display: riskFactorsHandler.formatConditionName(c)
        })));
        this.populateSelect('riskFactorCategorySelect', categories);
    }

    // Set up event listeners for filters
    setupEventListeners() {
        document.getElementById('yearSelect')?.addEventListener('change', () => this.onFilterChange());
        document.getElementById('ageGroupSelect')?.addEventListener('change', () => this.onFilterChange());
        document.getElementById('conditionSelect')?.addEventListener('change', () => this.onFilterChange());
        document.getElementById('metricSelect')?.addEventListener('change', () => this.onFilterChange());
    }

    // Set up event listeners for treatment filters
    setupTreatmentEventListeners() {
        document.getElementById('treatmentConditionSelect')?.addEventListener('change', () => this.onTreatmentFilterChange());
        document.getElementById('treatmentCategorySelect')?.addEventListener('change', () => this.onTreatmentFilterChange());
        document.getElementById('treatmentAgeSelect')?.addEventListener('change', () => this.onTreatmentFilterChange());
    }

    // Set up event listeners for risk factor filters
    setupRiskFactorEventListeners() {
        document.getElementById('riskFactorConditionSelect')?.addEventListener('change', () => this.onRiskFactorFilterChange());
        document.getElementById('riskFactorCategorySelect')?.addEventListener('change', () => this.onRiskFactorFilterChange());
        document.getElementById('resetRiskFactorFilters')?.addEventListener('click', () => this.resetRiskFactorFilters());
    }

    // Handle filter changes
    onFilterChange() {
        this.currentFilters.year = document.getElementById('yearSelect').value ? parseInt(document.getElementById('yearSelect').value) : '';
        this.currentFilters.age_group = document.getElementById('ageGroupSelect').value || '';
        this.currentFilters.condition = document.getElementById('conditionSelect').value || '';
        this.currentFilters.metric_type = document.getElementById('metricSelect').value || '';

        this.updateAllCharts();
        this.updateDataTable();
    }

    // Update all charts
    updateAllCharts() {
        chartManager.updateCharts(this.currentFilters);
    }

    // Update data table
    updateDataTable() {
        const tableBody = document.getElementById('dataTable');
        if (!tableBody) return;

        // Get filtered data
        const filteredData = dataHandler.filterData(this.currentFilters);

        // Clear table
        tableBody.innerHTML = '';

        // Check if data exists
        if (filteredData.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="5" class="text-center text-muted">No data available for selected filters</td></tr>';
            return;
        }

        // Add rows
        filteredData.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.year}</td>
                <td>${item.age_group}</td>
                <td>${dataHandler.formatConditionName(item.condition)}</td>
                <td>${dataHandler.formatMetricTypeName(item.metric_type)}</td>
                <td><strong>${item.value.toFixed(2)}%</strong></td>
            `;
            tableBody.appendChild(row);
        });

        // Add summary row if data is filtered
        if (filteredData.length > 1) {
            const avgValue = (filteredData.reduce((sum, item) => sum + item.value, 0) / filteredData.length).toFixed(2);
            const summaryRow = document.createElement('tr');
            summaryRow.className = 'table-info fw-bold';
            summaryRow.innerHTML = `
                <td colspan="4">Average</td>
                <td>${avgValue}%</td>
            `;
            tableBody.appendChild(summaryRow);
        }
    }

    // Handle treatment filter changes
    onTreatmentFilterChange() {
        const condition = document.getElementById('treatmentConditionSelect').value || '';
        const category = document.getElementById('treatmentCategorySelect').value || '';
        const ageGroup = document.getElementById('treatmentAgeSelect').value || '';

        this.updateTreatmentsDisplay(condition, category, ageGroup);
    }

    // Update treatments display
    updateTreatmentsDisplay(condition = '', category = '', ageGroup = '') {
        const filters = {
            condition: condition,
            category: category,
            ageGroup: ageGroup
        };
        const filtered = treatmentHandler.filterTreatments(filters);
        treatmentUI.updateTreatmentCards(filtered);
    }

    // Handle risk factor filter changes
    onRiskFactorFilterChange() {
        const condition = document.getElementById('riskFactorConditionSelect').value || '';
        const category = document.getElementById('riskFactorCategorySelect').value || '';

        this.updateRiskFactorsDisplay(condition, category);
    }

    // Update risk factors display
    updateRiskFactorsDisplay(condition = '', category = '') {
        const filtered = riskFactorsHandler.filterRiskFactors(condition, category);
        riskFactorsUI.updateRiskFactorCards(filtered);
    }

    // Reset risk factor filters
    resetRiskFactorFilters() {
        document.getElementById('riskFactorConditionSelect').value = '';
        document.getElementById('riskFactorCategorySelect').value = '';
        this.updateRiskFactorsDisplay();
    }

    // Set up event listeners for provider finder
    setupProviderFinderEventListeners() {
        document.getElementById('searchButton')?.addEventListener('click', () => this.onProviderSearch());
        document.getElementById('useLocationButton')?.addEventListener('click', () => this.useCurrentLocation());
        document.getElementById('locationInput')?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.onProviderSearch();
        });
    }

    // Handle provider search
    async onProviderSearch() {
        const location = document.getElementById('locationInput').value.trim();
        if (!location) {
            alert('Please enter a location to search');
            return;
        }

        providerFinderUI.showLoadingState();

        try {
            // Geocode the address
            const coordinates = await providerFinderUI.geocodeAddress(location);
            const radius = parseInt(document.getElementById('radiusSelect').value);

            // Search for providers
            const providers = await providerFinder.searchProviders(coordinates.latitude, coordinates.longitude, radius);

            // Apply filters
            const treatmentType = document.getElementById('treatmentTypeSelect').value;
            const insurance = document.getElementById('insuranceSelect').value;
            const specialization = document.getElementById('specializationSelect').value;

            const filters = {
                type: treatmentType,
                insurance: insurance,
                specialization: specialization,
                maxDistance: radius
            };

            providerFinder.filterProviders(filters);
            providerFinder.sortByDistance();

            // Display results
            providerFinderUI.updateProviderCount(providerFinder.filteredProviders.length);
            providerFinderUI.renderProviderCards(providerFinder.filteredProviders);

            // Show results alert
            const resultsAlert = document.getElementById('resultsAlert');
            if (resultsAlert) {
                resultsAlert.style.display = 'block';
            }
        } catch (error) {
            console.error('Search error:', error);
            providerFinderUI.showErrorState(`Unable to find providers for "${location}". ${error.message}`);
        }
    }

    // Use current location
    async useCurrentLocation() {
        providerFinderUI.showLoadingState();

        try {
            const location = await providerFinderUI.getCurrentLocation();
            const radius = parseInt(document.getElementById('radiusSelect').value);

            // Search for providers
            const providers = await providerFinder.searchProviders(location.latitude, location.longitude, radius);

            // Apply filters
            const treatmentType = document.getElementById('treatmentTypeSelect').value;
            const insurance = document.getElementById('insuranceSelect').value;
            const specialization = document.getElementById('specializationSelect').value;

            const filters = {
                type: treatmentType,
                insurance: insurance,
                specialization: specialization,
                maxDistance: radius
            };

            providerFinder.filterProviders(filters);
            providerFinder.sortByDistance();

            // Display results
            providerFinderUI.updateProviderCount(providerFinder.filteredProviders.length);
            providerFinderUI.renderProviderCards(providerFinder.filteredProviders);

            // Show results alert
            const resultsAlert = document.getElementById('resultsAlert');
            if (resultsAlert) {
                resultsAlert.style.display = 'block';
            }
        } catch (error) {
            console.error('Location error:', error);
            providerFinderUI.showErrorState('Unable to get your location. Please enable location services or enter an address manually.');
        }
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
    const app = new MentalHealthApp();
    await app.init();
});
