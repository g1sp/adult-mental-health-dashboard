// Provider Finder - Integration with SAMHSA Treatment Locator API

class ProviderFinder {
    constructor() {
        this.providers = [];
        this.filteredProviders = [];
        this.mapInstance = null;
        this.markers = [];
        // SAMHSA API endpoint for treatment facilities
        this.samhsaApiUrl = 'https://findtreatment.gov/api/endpoint.php';
    }

    // Search for providers by location
    async searchProviders(latitude, longitude, radiusMiles = 25) {
        try {
            // Using SAMHSA's public data endpoint
            // Format: https://findtreatment.gov/api/endpoint.php?latitude=40.7128&longitude=-74.0060&radius=25
            const url = `${this.samhsaApiUrl}?latitude=${latitude}&longitude=${longitude}&radius=${radiusMiles}`;

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Failed to fetch providers from SAMHSA');
            }

            const data = await response.json();

            // SAMHSA returns facilities array
            if (data.results && Array.isArray(data.results)) {
                this.providers = data.results.map(facility => this.formatProvider(facility));
                this.filteredProviders = [...this.providers];
                console.log(`Found ${this.providers.length} providers`);
                return this.providers;
            } else if (Array.isArray(data)) {
                this.providers = data.map(facility => this.formatProvider(facility));
                this.filteredProviders = [...this.providers];
                return this.providers;
            } else {
                console.warn('Unexpected API response format:', data);
                return [];
            }
        } catch (error) {
            console.error('Error searching providers:', error);
            return [];
        }
    }

    // Format provider data for display
    formatProvider(facility) {
        return {
            id: facility.id || Math.random(),
            name: facility.name || facility.facility_name || 'Unknown Facility',
            address: facility.street_address || facility.address || '',
            city: facility.city || '',
            state: facility.state || '',
            zip: facility.zip_code || facility.zip || '',
            phone: facility.telephone || facility.phone || 'N/A',
            website: facility.website || '',
            type: facility.type || facility.facility_type || 'Treatment Facility',
            treatmentTypes: facility.treatment_types || this.parseServices(facility.services || ''),
            acceptsInsurance: facility.accepts_insurance !== false,
            acceptsMedicaid: facility.accepts_medicaid !== false,
            acceptsMedicare: facility.accepts_medicare !== false,
            latitude: parseFloat(facility.latitude) || 0,
            longitude: parseFloat(facility.longitude) || 0,
            distance: facility.distance || 0,
            hoursOfOperation: facility.hours_of_operation || 'Call for hours',
            specializations: facility.specializations || this.parseSpecializations(facility),
            languages: facility.languages_spoken || ['English']
        };
    }

    // Parse services from facility data
    parseServices(servicesString) {
        if (!servicesString) return [];
        if (Array.isArray(servicesString)) return servicesString;

        // Common treatment types
        const types = [];
        const servicesLower = servicesString.toLowerCase();

        if (servicesLower.includes('outpatient')) types.push('Outpatient');
        if (servicesLower.includes('inpatient')) types.push('Inpatient');
        if (servicesLower.includes('residential')) types.push('Residential');
        if (servicesLower.includes('telehealth') || servicesLower.includes('virtual')) types.push('Telehealth');
        if (servicesLower.includes('emergency') || servicesLower.includes('crisis')) types.push('Crisis Care');
        if (servicesLower.includes('medication') || servicesLower.includes('MAT')) types.push('Medication-Assisted');

        return types.length > 0 ? types : ['Outpatient'];
    }

    // Parse specializations from facility data
    parseSpecializations(facility) {
        const specs = [];
        const dataStr = JSON.stringify(facility).toLowerCase();

        if (dataStr.includes('adult')) specs.push('Adults');
        if (dataStr.includes('adolescent') || dataStr.includes('youth')) specs.push('Adolescents');
        if (dataStr.includes('opioid') || dataStr.includes('substance')) specs.push('Substance Use');
        if (dataStr.includes('mental health') || dataStr.includes('mental')) specs.push('Mental Health');
        if (dataStr.includes('dual diagnosis')) specs.push('Dual Diagnosis');
        if (dataStr.includes('trauma') || dataStr.includes('ptsd')) specs.push('Trauma/PTSD');

        return specs.length > 0 ? specs : ['General Mental Health'];
    }

    // Filter providers by criteria
    filterProviders(criteria) {
        this.filteredProviders = this.providers.filter(provider => {
            if (criteria.type && !provider.treatmentTypes.some(t => t.toLowerCase().includes(criteria.type.toLowerCase()))) {
                return false;
            }
            if (criteria.insurance && criteria.insurance === 'medicaid' && !provider.acceptsMedicaid) {
                return false;
            }
            if (criteria.insurance && criteria.insurance === 'medicare' && !provider.acceptsMedicare) {
                return false;
            }
            if (criteria.insurance && criteria.insurance === 'private' && !provider.acceptsInsurance) {
                return false;
            }
            if (criteria.specialization && !provider.specializations.some(s => s.toLowerCase().includes(criteria.specialization.toLowerCase()))) {
                return false;
            }
            if (criteria.maxDistance && provider.distance > criteria.maxDistance) {
                return false;
            }
            return true;
        });
        return this.filteredProviders;
    }

    // Sort providers by distance
    sortByDistance() {
        this.filteredProviders.sort((a, b) => (a.distance || 999) - (b.distance || 999));
        return this.filteredProviders;
    }

    // Sort providers by rating (if available) or name
    sortByName() {
        this.filteredProviders.sort((a, b) => a.name.localeCompare(b.name));
        return this.filteredProviders;
    }

    // Get provider details
    getProviderDetails(providerId) {
        return this.providers.find(p => p.id === providerId);
    }

    // Get unique treatment types from all providers
    getTreatmentTypes() {
        const types = new Set();
        this.providers.forEach(p => {
            p.treatmentTypes.forEach(t => types.add(t));
        });
        return Array.from(types).sort();
    }

    // Get unique specializations
    getSpecializations() {
        const specs = new Set();
        this.providers.forEach(p => {
            p.specializations.forEach(s => specs.add(s));
        });
        return Array.from(specs).sort();
    }

    // Format phone number
    formatPhone(phone) {
        if (!phone || phone === 'N/A') return 'N/A';
        const cleaned = phone.replace(/\D/g, '');
        if (cleaned.length === 10) {
            return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
        }
        return phone;
    }

    // Format full address
    formatAddress(provider) {
        const parts = [provider.address, provider.city, provider.state, provider.zip];
        return parts.filter(p => p).join(', ');
    }

    // Create map marker
    createMarker(provider, map) {
        if (!map || !provider.latitude || !provider.longitude) return null;

        const marker = new google.maps.Marker({
            position: { lat: provider.latitude, lng: provider.longitude },
            map: map,
            title: provider.name,
            icon: 'http://maps.google.com/mapfiles/ms/icons/hospital.png'
        });

        marker.addListener('click', () => {
            const infoWindow = new google.maps.InfoWindow({
                content: `
                    <div style="font-family: Arial; width: 250px;">
                        <h4 style="margin: 0 0 10px 0;">${provider.name}</h4>
                        <p style="margin: 5px 0;"><strong>Address:</strong> ${this.formatAddress(provider)}</p>
                        <p style="margin: 5px 0;"><strong>Phone:</strong> ${this.formatPhone(provider.phone)}</p>
                        ${provider.website ? `<p style="margin: 5px 0;"><a href="${provider.website}" target="_blank">Visit Website</a></p>` : ''}
                    </div>
                `
            });
            infoWindow.open(map, marker);
        });

        return marker;
    }

    // Get nearby providers count
    getNearbyCount() {
        return this.filteredProviders.length;
    }
}

// Create global provider finder instance
const providerFinder = new ProviderFinder();
