// Risk Factors UI manager for rendering risk factor cards and interactions

class RiskFactorsUI {
    constructor() {
        this.riskFactorModal = new bootstrap.Modal(document.getElementById('riskFactorModal'));
    }

    // Render risk factor cards in grid
    renderRiskFactorCards(factors) {
        const grid = document.getElementById('riskFactorsGrid');

        if (factors.length === 0) {
            grid.innerHTML = '<div class="col-12 text-center text-muted py-5"><p>No risk factors found for selected filters</p></div>';
            return;
        }

        grid.innerHTML = factors.map(factor => {
            const details = riskFactorsHandler.formatRiskFactorDetails(factor);
            return this.createRiskFactorCard(factor, details);
        }).join('');

        // Add click handlers to all risk factor cards
        document.querySelectorAll('[data-risk-factor-id]').forEach(card => {
            card.addEventListener('click', () => {
                const factorId = card.getAttribute('data-risk-factor-id');
                const factor = riskFactorsHandler.riskFactors.find(f => f.id === parseInt(factorId));
                if (factor) this.showRiskFactorDetail(factor);
            });
        });
    }

    // Create individual risk factor card HTML
    createRiskFactorCard(factor, details) {
        const riskLevel = riskFactorsHandler.getRiskLevel(factor);
        const riskLevelColors = {
            'high': 'danger',
            'medium': 'warning',
            'low': 'info'
        };

        return `
            <div class="card border-0 shadow-sm risk-factor-card" data-risk-factor-id="${factor.id}" style="cursor: pointer; transition: all 0.3s ease;">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-start mb-3">
                            <h5 class="card-title mb-0">${factor.name}</h5>
                            <span class="badge bg-${details.categoryBadge}">${factor.category}</span>
                        </div>

                        <p class="card-text text-muted small mb-3">${factor.description}</p>

                        <div class="mb-3">
                            <div class="d-flex justify-content-between mb-2">
                                <small class="fw-bold">Prevalence</small>
                                <small class="fw-bold">${factor.prevalence}</small>
                            </div>
                        </div>

                        <div class="mb-3">
                            <small class="d-block text-muted mb-2">
                                <strong>Affects:</strong> ${details.conditionsList}
                            </small>
                            <small class="d-block text-muted">
                                <strong>Risk Level:</strong> <span class="badge bg-${riskLevelColors[riskLevel]}">${riskLevel.charAt(0).toUpperCase() + riskLevel.slice(1)}</span>
                            </small>
                        </div>

                        <div class="alert alert-${riskLevelColors[riskLevel]} alert-sm p-2 small mb-0">
                            <strong>Warning Sign:</strong> ${factor.warning_signs[0]}
                        </div>
                    </div>
                    <div class="card-footer bg-transparent border-top-0 text-center">
                        <small class="text-muted">Click to learn more →</small>
                    </div>
                </div>
            `;
    }

    // Show detailed risk factor information in modal
    showRiskFactorDetail(factor) {
        const details = riskFactorsHandler.formatRiskFactorDetails(factor);

        // Set modal title
        document.getElementById('riskFactorModalTitle').innerHTML = `
            ${factor.name}
            <span class="badge bg-${details.categoryBadge}">${factor.category}</span>
        `;

        // Build modal body
        const modalBody = `
            <div class="risk-factor-details">
                <div class="mb-4">
                    <h6>What Is This Risk Factor?</h6>
                    <p>${factor.description}</p>
                </div>

                <div class="mb-4">
                    <h6>How Common Is It?</h6>
                    <p class="mb-0"><strong>${factor.prevalence}</strong></p>
                </div>

                <div class="mb-4">
                    <h6>Impacts Mental Health Conditions</h6>
                    <div>
                        ${factor.conditions.map(cond => `
                            <span class="badge bg-primary me-2">${riskFactorsHandler.formatConditionName(cond)}</span>
                        `).join('')}
                    </div>
                </div>

                <div class="mb-4">
                    <h6>⚠️ Warning Signs to Watch For</h6>
                    <ul class="list-unstyled">
                        ${factor.warning_signs.map(sign => `
                            <li class="mb-2">
                                <i class="bi bi-exclamation-circle text-warning me-2"></i>${sign}
                            </li>
                        `).join('')}
                    </ul>
                </div>

                <div class="mb-4">
                    <h6>💡 Prevention & Protection Tips</h6>
                    <ul class="list-unstyled">
                        ${factor.prevention_tips.map(tip => `
                            <li class="mb-2">
                                <i class="bi bi-shield-check text-success me-2"></i>${tip}
                            </li>
                        `).join('')}
                    </ul>
                </div>

                <div class="alert alert-info">
                    <h6 class="alert-heading">What You Can Do</h6>
                    <p class="mb-0">If you recognize this risk factor in yourself or someone you care about, reach out to a mental health professional. ${details.categoryName.toLowerCase()} can be addressed with the right support and treatment.</p>
                </div>

                <div class="mb-4">
                    <h6>Trusted Resources</h6>
                    <ul class="list-unstyled">
                        ${factor.resources.map((resource, idx) => `
                            <li class="mb-2">
                                <a href="${resource}" target="_blank" class="text-decoration-none">
                                    Resource ${idx + 1} <i class="bi bi-box-arrow-up-right"></i>
                                </a>
                            </li>
                        `).join('')}
                    </ul>
                </div>

                <div class="alert alert-success">
                    <h6 class="alert-heading">💙 Remember</h6>
                    <p class="mb-0">Having risk factors doesn't mean you will develop a mental health condition. Many adults with risk factors maintain excellent mental health through protective factors, support systems, and healthy coping strategies.</p>
                </div>
            </div>
        `;

        document.getElementById('riskFactorModalBody').innerHTML = modalBody;

        // Set resource link button
        const primaryResource = riskFactorsHandler.getPrimaryResource(factor);
        document.getElementById('riskFactorResourceLink').href = primaryResource;

        // Show modal
        this.riskFactorModal.show();
    }

    // Update risk factor cards with animation
    updateRiskFactorCards(factors) {
        const grid = document.getElementById('riskFactorsGrid');
        grid.style.opacity = '0.5';
        setTimeout(() => {
            this.renderRiskFactorCards(factors);
            grid.style.opacity = '1';
        }, 200);
    }
}

// Create global risk factors UI instance
const riskFactorsUI = new RiskFactorsUI();
