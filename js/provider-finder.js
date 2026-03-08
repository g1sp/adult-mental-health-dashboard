// Provider Finder - Integration with SAMHSA Treatment Locator API

class ProviderFinder {
    constructor() {
        this.providers = [];
        this.filteredProviders = [];
        this.mapInstance = null;
        this.markers = [];
        // Using SAMHSA's public data source
        this.mockProviders = this.getMockProviders();
    }

    // Get mock providers for demonstration (in real deployment, integrate with actual SAMHSA API)
    getMockProviders() {
        // This returns representative sample data based on real provider types
        // In production, this would call the actual SAMHSA treatment locator service
        return [
            {
                id: 1,
                name: "Community Mental Health Services",
                facility_name: "Community Mental Health Services",
                address: "123 Health Street",
                street_address: "123 Health Street",
                city: "Fremont",
                state: "CA",
                zip_code: "94555",
                zip: "94555",
                telephone: "(510) 555-0101",
                phone: "(510) 555-0101",
                website: "https://www.samhsa.gov/",
                type: "Treatment Center",
                facility_type: "Treatment Center",
                treatment_types: ["Outpatient", "Individual Therapy"],
                services: "Outpatient mental health services",
                accepts_insurance: true,
                accepts_medicaid: true,
                accepts_medicare: true,
                latitude: 37.5485,
                longitude: -122.2171,
                distance: 0.5,
                hours_of_operation: "Monday-Friday 9am-5pm",
                specializations: ["Mental Health", "Depression", "Anxiety"],
                languages_spoken: ["English", "Spanish"]
            },
            {
                id: 2,
                name: "Fremont Addiction Recovery Program",
                address: "456 Recovery Avenue",
                city: "Fremont",
                state: "CA",
                zip_code: "94538",
                telephone: "(510) 555-0102",
                website: "https://www.samhsa.gov/",
                type: "Substance Abuse Treatment",
                treatment_types: ["Outpatient", "Medication-Assisted", "Counseling"],
                services: "Substance abuse treatment",
                accepts_insurance: true,
                accepts_medicaid: true,
                accepts_medicare: false,
                latitude: 37.5500,
                longitude: -122.2150,
                distance: 1.2,
                hours_of_operation: "Daily 8am-6pm",
                specializations: ["Substance Use", "Opioid Addiction", "Dual Diagnosis"],
                languages_spoken: ["English", "Spanish", "Tagalog"]
            },
            {
                id: 3,
                name: "Fremont Crisis Support Center",
                address: "789 Hope Lane",
                city: "Fremont",
                state: "CA",
                zip_code: "94555",
                telephone: "(510) 555-0103",
                website: "https://www.samhsa.gov/",
                type: "Crisis Services",
                treatment_types: ["Crisis Care", "Emergency Services", "Telehealth"],
                services: "24/7 crisis support",
                accepts_insurance: true,
                accepts_medicaid: true,
                accepts_medicare: true,
                latitude: 37.5470,
                longitude: -122.2200,
                distance: 0.3,
                hours_of_operation: "Open 24/7",
                specializations: ["Crisis Support", "Mental Health Emergency", "Suicide Prevention"],
                languages_spoken: ["English", "Spanish", "Mandarin"]
            },
            {
                id: 4,
                name: "Fremont Residential Treatment Facility",
                address: "321 Wellness Drive",
                city: "Fremont",
                state: "CA",
                zip_code: "94536",
                telephone: "(510) 555-0104",
                website: "https://www.samhsa.gov/",
                type: "Residential Treatment",
                treatment_types: ["Residential", "Inpatient", "Intensive Therapy"],
                services: "Residential mental health treatment",
                accepts_insurance: true,
                accepts_medicaid: false,
                accepts_medicare: true,
                latitude: 37.5510,
                longitude: -122.2100,
                distance: 2.1,
                hours_of_operation: "24/7 Residential Program",
                specializations: ["PTSD", "Trauma Recovery", "Dual Diagnosis"],
                languages_spoken: ["English", "Spanish"]
            },
            {
                id: 5,
                name: "Telehealth Mental Health Services",
                address: "Online Services",
                city: "Fremont",
                state: "CA",
                zip_code: "94555",
                telephone: "(510) 555-0105",
                website: "https://www.samhsa.gov/",
                type: "Telehealth Provider",
                treatment_types: ["Telehealth", "Video Counseling", "Phone Therapy"],
                services: "Virtual mental health services",
                accepts_insurance: true,
                accepts_medicaid: true,
                accepts_medicare: true,
                latitude: 37.5485,
                longitude: -122.2171,
                distance: 0.0,
                hours_of_operation: "Monday-Saturday 7am-7pm PT",
                specializations: ["Depression", "Anxiety", "Mental Health"],
                languages_spoken: ["English", "Spanish", "Vietnamese"]
            }
        ];
    }

    // Search for providers by location
    async searchProviders(latitude, longitude, radiusMiles = 25) {
        try {
            // Use mock data with location-based filtering
            // Calculate distances and filter by radius
            this.providers = this.mockProviders.map(facility => {
                const distance = this.calculateDistance(latitude, longitude, facility.latitude, facility.longitude);
                return this.formatProvider({...facility, distance});
            }).filter(p => p.distance <= radiusMiles);

            this.filteredProviders = [...this.providers];
            console.log(`Found ${this.providers.length} providers within ${radiusMiles} miles`);
            return this.providers;
        } catch (error) {
            console.error('Error searching providers:', error);
            return [];
        }
    }

    // Calculate distance between two coordinates (Haversine formula)
    calculateDistance(lat1, lon1, lat2, lon2) {
        const R = 3959; // Earth's radius in miles
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                  Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                  Math.sin(dLon/2) * Math.sin(dLon/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return R * c;
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
