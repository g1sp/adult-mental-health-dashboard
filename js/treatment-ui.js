// Treatment UI manager for rendering treatment cards and interactions

class TreatmentUI {
    constructor() {
        this.treatmentModal = new bootstrap.Modal(document.getElementById('treatmentModal'));
    }

    // Render treatment cards in grid
    renderTreatmentCards(treatments) {
        const grid = document.getElementById('treatmentsGrid');

        if (treatments.length === 0) {
            grid.innerHTML = '<div class="col-12 text-center text-muted py-5"><p>No treatments found for selected filters</p></div>';
            return;
        }

        grid.innerHTML = treatments.map(treatment => {
            const details = treatmentHandler.formatTreatmentDetails(treatment);
            return this.createTreatmentCard(treatment, details);
        }).join('');

        // Add click handlers to all treatment cards
        document.querySelectorAll('[data-treatment-id]').forEach(card => {
            card.addEventListener('click', () => {
                const treatmentId = card.getAttribute('data-treatment-id');
                const treatment = treatmentHandler.treatments.find(t => t.id === parseInt(treatmentId));
                if (treatment) this.showTreatmentDetail(treatment);
            });
        });
    }

    // Create individual treatment card HTML
    createTreatmentCard(treatment, details) {
        return `
            <div class="card border-0 shadow-sm treatment-card" data-treatment-id="${treatment.id}" style="cursor: pointer; transition: all 0.3s ease;">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-start mb-3">
                            <h5 class="card-title mb-0">${treatment.name}</h5>
                            <span class="badge bg-${details.categoryBadge}">${treatment.category}</span>
                        </div>

                        <p class="card-text text-muted small mb-3">${treatment.description}</p>

                        <div class="mb-3">
                            <div class="d-flex justify-content-between mb-2">
                                <small class="fw-bold">Effectiveness</small>
                                <small class="fw-bold">${treatment.effectiveness}%</small>
                            </div>
                            <div class="progress" style="height: 8px;">
                                <div class="progress-bar" role="progressbar"
                                     style="width: ${treatment.effectiveness}%; background-color: ${details.effectivenessColor};"
                                     aria-valuenow="${treatment.effectiveness}"
                                     aria-valuemin="0"
                                     aria-valuemax="100">
                                </div>
                            </div>
                        </div>

                        <div class="mb-3">
                            <small class="d-block text-muted mb-2">
                                <strong>Conditions:</strong> ${details.conditionsList}
                            </small>
                            <small class="d-block text-muted mb-2">
                                <strong>Age Groups:</strong> ${details.ageGroupsList}
                            </small>
                            <small class="d-block text-muted">
                                <strong>Duration:</strong> ${treatment.duration}
                            </small>
                        </div>

                        <div class="alert alert-info alert-sm p-2 small mb-0">
                            <strong>Key Benefit:</strong> ${treatment.key_benefits[0]}
                        </div>
                    </div>
                    <div class="card-footer bg-transparent border-top-0 text-center">
                        <small class="text-muted">Click to learn more →</small>
                    </div>
                </div>
            `;
    }

    // Show detailed treatment information in modal
    showTreatmentDetail(treatment) {
        const details = treatmentHandler.formatTreatmentDetails(treatment);

        // Set modal title
        document.getElementById('treatmentModalTitle').innerHTML = `
            ${treatment.name}
            <span class="badge bg-${details.categoryBadge}">${treatment.category}</span>
        `;

        // Build modal body
        const modalBody = `
            <div class="treatment-details">
                <div class="mb-4">
                    <h6>Description</h6>
                    <p>${treatment.description}</p>
                </div>

                <div class="row mb-4">
                    <div class="col-md-6">
                        <h6>Effectiveness Rate</h6>
                        <div class="d-flex align-items-center">
                            <div style="flex: 1;">
                                <div class="progress" style="height: 20px;">
                                    <div class="progress-bar fw-bold"
                                         style="width: ${treatment.effectiveness}%; background-color: ${details.effectivenessColor}; font-size: 12px; display: flex; align-items: center; justify-content: center; color: white;">
                                        ${treatment.effectiveness}%
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <h6>Modality</h6>
                        <p class="mb-0">${treatment.modality}</p>
                    </div>
                </div>

                <div class="row mb-4">
                    <div class="col-md-6">
                        <h6>Duration</h6>
                        <p class="mb-0">${treatment.duration}</p>
                    </div>
                    <div class="col-md-6">
                        <h6>Suitable Age Groups</h6>
                        <p class="mb-0">${details.ageGroupsList}</p>
                    </div>
                </div>

                <div class="mb-4">
                    <h6>Treats the Following Conditions</h6>
                    <div>
                        ${treatment.conditions.map(cond => `
                            <span class="badge bg-success me-2">${treatmentHandler.formatConditionName(cond)}</span>
                        `).join('')}
                    </div>
                </div>

                <div class="mb-4">
                    <h6>Key Benefits</h6>
                    <ul class="list-unstyled">
                        ${treatment.key_benefits.map(benefit => `
                            <li class="mb-2">
                                <i class="bi bi-check-circle text-success me-2"></i>${benefit}
                            </li>
                        `).join('')}
                    </ul>
                </div>

                <div class="alert alert-warning">
                    <h6 class="alert-heading">Important Considerations</h6>
                    <p class="mb-0">${treatment.considerations}</p>
                </div>

                <div class="mb-4">
                    <h6>Reliable Resources</h6>
                    <ul class="list-unstyled">
                        ${treatment.resources.map((resource, idx) => `
                            <li class="mb-2">
                                <a href="${resource}" target="_blank" class="text-decoration-none">
                                    Resource ${idx + 1} <i class="bi bi-box-arrow-up-right"></i>
                                </a>
                            </li>
                        `).join('')}
                    </ul>
                </div>
            </div>
        `;

        document.getElementById('treatmentModalBody').innerHTML = modalBody;

        // Set resource link button
        const primaryResource = treatmentHandler.getPrimaryResource(treatment);
        document.getElementById('treatmentResourceLink').href = primaryResource;

        // Show modal
        this.treatmentModal.show();
    }

    // Update treatment cards with animation
    updateTreatmentCards(treatments) {
        const grid = document.getElementById('treatmentsGrid');
        grid.style.opacity = '0.5';
        setTimeout(() => {
            this.renderTreatmentCards(treatments);
            grid.style.opacity = '1';
        }, 200);
    }
}

// Create global treatment UI instance
const treatmentUI = new TreatmentUI();
