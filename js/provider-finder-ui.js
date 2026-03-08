// Provider Finder UI - Display and interaction

class ProviderFinderUI {
    constructor() {
        this.currentLocation = null;
        this.providerModal = null;
    }

    // Initialize provider finder modal
    initializeModal() {
        const modalElement = document.getElementById('providerModal');
        if (modalElement) {
            this.providerModal = new bootstrap.Modal(modalElement);
        }
    }

    // Render provider cards in grid
    renderProviderCards(providers) {
        const grid = document.getElementById('providersGrid');
        if (!grid) return;

        if (providers.length === 0) {
            grid.innerHTML = `
                <div class="col-12 text-center text-muted py-5">
                    <p>No providers found for your search. Try adjusting your filters or location.</p>
                </div>
            `;
            return;
        }

        grid.innerHTML = providers.map(provider => this.createProviderCard(provider)).join('');

        // Add click handlers
        document.querySelectorAll('[data-provider-id]').forEach(card => {
            card.addEventListener('click', () => {
                const providerId = card.getAttribute('data-provider-id');
                const provider = providerFinder.providers.find(p => p.id == providerId);
                if (provider) this.showProviderDetail(provider);
            });
        });
    }

    // Create individual provider card
    createProviderCard(provider) {
        const treatmentTypes = provider.treatmentTypes.slice(0, 2).join(', ');
        const distanceText = provider.distance ? `${provider.distance.toFixed(1)} miles away` : 'Distance unknown';
        const insuranceIcons = this.getInsuranceIcons(provider);

        return `
            <div class="card border-0 shadow-sm provider-card" data-provider-id="${provider.id}" style="cursor: pointer; transition: all 0.3s ease;">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-start mb-3">
                        <h5 class="card-title mb-0">${provider.name}</h5>
                        <span class="badge bg-success">${provider.type}</span>
                    </div>

                    <p class="card-text text-muted small mb-3">${provider.address}</p>

                    <div class="mb-3">
                        <div class="d-flex align-items-center mb-2">
                            <small class="text-primary fw-bold">
                                <i class="bi bi-geo-alt"></i> ${distanceText}
                            </small>
                        </div>
                        <small class="d-block text-muted mb-2">
                            <strong>Services:</strong> ${treatmentTypes}${provider.treatmentTypes.length > 2 ? '...' : ''}
                        </small>
                        <small class="d-block text-muted mb-2">
                            <strong>Specializations:</strong> ${provider.specializations.slice(0, 2).join(', ')}
                        </small>
                    </div>

                    <div class="mb-3">
                        <small class="d-block mb-2"><strong>Insurance Accepted:</strong></small>
                        <div class="d-flex gap-2">
                            ${insuranceIcons}
                        </div>
                    </div>

                    <div class="alert alert-info alert-sm p-2 small mb-0">
                        <strong>Phone:</strong> ${providerFinder.formatPhone(provider.phone)}
                    </div>
                </div>
                <div class="card-footer bg-transparent border-top-0 text-center">
                    <small class="text-muted">Click for details →</small>
                </div>
            </div>
        `;
    }

    // Get insurance badge icons
    getInsuranceIcons(provider) {
        let icons = '';
        if (provider.acceptsMedicaid) icons += '<span class="badge bg-warning text-dark">Medicaid</span>';
        if (provider.acceptsMedicare) icons += '<span class="badge bg-info">Medicare</span>';
        if (provider.acceptsInsurance) icons += '<span class="badge bg-secondary">Private</span>';
        return icons || '<span class="badge bg-light text-dark">Call for details</span>';
    }

    // Show detailed provider information
    showProviderDetail(provider) {
        document.getElementById('providerModalTitle').innerHTML = `
            ${provider.name}
            <span class="badge bg-success">${provider.type}</span>
        `;

        const modalBody = `
            <div class="provider-details">
                <div class="mb-4">
                    <h6>📍 Location</h6>
                    <p class="mb-0">${providerFinder.formatAddress(provider)}</p>
                </div>

                <div class="mb-4">
                    <h6>📞 Contact Information</h6>
                    <p class="mb-2">
                        <strong>Phone:</strong> <a href="tel:${provider.phone}">${providerFinder.formatPhone(provider.phone)}</a>
                    </p>
                    ${provider.website ? `
                        <p class="mb-0">
                            <strong>Website:</strong> <a href="${provider.website}" target="_blank">${provider.website}</a>
                        </p>
                    ` : ''}
                </div>

                <div class="mb-4">
                    <h6>⏰ Hours</h6>
                    <p class="mb-0">${provider.hoursOfOperation}</p>
                </div>

                <div class="mb-4">
                    <h6>🏥 Treatment Services</h6>
                    <div class="mb-2">
                        ${provider.treatmentTypes.map(type => `
                            <span class="badge bg-primary me-2 mb-2">${type}</span>
                        `).join('')}
                    </div>
                </div>

                <div class="mb-4">
                    <h6>🎯 Specializations</h6>
                    <div class="mb-2">
                        ${provider.specializations.map(spec => `
                            <span class="badge bg-info me-2 mb-2">${spec}</span>
                        `).join('')}
                    </div>
                </div>

                <div class="mb-4">
                    <h6>💳 Insurance Accepted</h6>
                    <div class="mb-2">
                        ${provider.acceptsMedicaid ? '<p class="mb-1">✅ Medicaid</p>' : ''}
                        ${provider.acceptsMedicare ? '<p class="mb-1">✅ Medicare</p>' : ''}
                        ${provider.acceptsInsurance ? '<p class="mb-1">✅ Private Insurance</p>' : ''}
                    </div>
                    ${!provider.acceptsMedicaid && !provider.acceptsMedicare && !provider.acceptsInsurance ?
                        '<p class="text-muted"><small>Contact facility for insurance information</small></p>' : ''}
                </div>

                ${provider.languages && provider.languages.length > 0 ? `
                    <div class="mb-4">
                        <h6>🗣️ Languages Spoken</h6>
                        <p class="mb-0">${provider.languages.join(', ')}</p>
                    </div>
                ` : ''}

                <div class="alert alert-info">
                    <h6 class="alert-heading">💡 Next Steps</h6>
                    <p class="mb-0">Call this facility to discuss your needs, insurance coverage, and availability for appointments. Many facilities offer immediate scheduling.</p>
                </div>

                <div class="alert alert-success">
                    <h6 class="alert-heading">❓ Need Immediate Help?</h6>
                    <p class="mb-0">
                        <strong>SAMHSA National Helpline:</strong> <a href="tel:1-800-662-4357">1-800-662-4357</a> (Free, confidential, 24/7)<br>
                        <strong>Crisis Text Line:</strong> Text HOME to 741741<br>
                        <strong>National Suicide Prevention Lifeline:</strong> <a href="tel:988">988</a>
                    </p>
                </div>
            </div>
        `;

        document.getElementById('providerModalBody').innerHTML = modalBody;
        this.providerModal.show();
    }

    // Update provider count display
    updateProviderCount(count) {
        const countElement = document.getElementById('providerCount');
        if (countElement) {
            countElement.textContent = `${count} provider${count !== 1 ? 's' : ''} found`;
        }
    }

    // Show loading state
    showLoadingState() {
        const grid = document.getElementById('providersGrid');
        if (grid) {
            grid.innerHTML = `
                <div class="col-12 text-center py-5">
                    <div class="spinner-border text-primary" role="status">
                        <span class="visually-hidden">Loading providers...</span>
                    </div>
                    <p class="mt-3 text-muted">Searching for providers near you...</p>
                </div>
            `;
        }
    }

    // Show error state
    showErrorState(errorMessage) {
        const grid = document.getElementById('providersGrid');
        if (grid) {
            grid.innerHTML = `
                <div class="col-12">
                    <div class="alert alert-info" role="alert">
                        <h4 class="alert-heading">ℹ️ Note About Provider Search</h4>
                        <p>The Provider Finder currently shows sample treatment facilities for demonstration purposes. In production, this integrates with SAMHSA's live Treatment Locator database.</p>
                        <hr>
                        <p class="mb-2"><strong>For Real Treatment Provider Search:</strong></p>
                        <ul class="mb-2">
                            <li>Visit: <a href="https://findtreatment.gov/" target="_blank">FindTreatment.gov</a> - Official SAMHSA Treatment Locator</li>
                            <li>Call: <a href="tel:1-800-662-4357">1-800-662-4357</a> - SAMHSA National Helpline (24/7, free, confidential)</li>
                            <li>Text: <strong>HOME</strong> to <a href="sms:741741">741741</a> - Crisis Text Line</li>
                        </ul>
                        <p class="mb-0"><em>${errorMessage}</em></p>
                    </div>
                </div>
            `;
        }
    }

    // Get user's current location
    getCurrentLocation() {
        return new Promise((resolve, reject) => {
            if ('geolocation' in navigator) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        resolve({
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude
                        });
                    },
                    (error) => {
                        reject(error);
                    }
                );
            } else {
                reject(new Error('Geolocation not supported'));
            }
        });
    }

    // Geocode address to coordinates (using free service)
    async geocodeAddress(address) {
        try {
            // Using OpenStreetMap Nominatim API (free, no API key needed)
            const response = await fetch(`https://nominatim.openstreetmap.org/search?address=${encodeURIComponent(address)}&format=json`);
            const data = await response.json();

            if (data && data.length > 0) {
                return {
                    latitude: parseFloat(data[0].lat),
                    longitude: parseFloat(data[0].lon),
                    displayName: data[0].display_name
                };
            }
            throw new Error('Address not found');
        } catch (error) {
            console.error('Geocoding error:', error);
            throw error;
        }
    }
}

// Create global provider finder UI instance
const providerFinderUI = new ProviderFinderUI();
