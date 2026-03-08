// Success Stories UI - Display and interaction for recovery stories

class SuccessStoriesUI {
    constructor() {
        this.currentStory = null;
        this.storyModal = null;
    }

    // Initialize story detail modal
    initializeModal() {
        const modalElement = document.getElementById('storyModal');
        if (modalElement) {
            this.storyModal = new bootstrap.Modal(modalElement);
        }
    }

    // Render success story cards
    renderStoryCards(stories) {
        const grid = document.getElementById('storiesGrid');
        if (!grid) return;

        if (stories.length === 0) {
            grid.innerHTML = `
                <div class="col-12 text-center text-muted py-5">
                    <p>No recovery stories found. Try adjusting your filters.</p>
                </div>
            `;
            return;
        }

        grid.innerHTML = stories.map(story => this.createStoryCard(story)).join('');

        // Add click handlers
        document.querySelectorAll('[data-story-id]').forEach(card => {
            card.addEventListener('click', () => {
                const storyId = parseInt(card.getAttribute('data-story-id'));
                const story = successStoriesHandler.stories.find(s => s.id === storyId);
                if (story) this.showStoryDetail(story);
            });
        });
    }

    // Create individual story card
    createStoryCard(story) {
        const recoveryTime = successStoriesHandler.getRecoveryDuration(story);
        const conditionDisplay = story.condition.split(',')[0].trim(); // First condition for card
        const treatmentCount = story.treatment_approach.split(',').length;

        return `
            <div class="col-md-6 col-lg-4">
                <div class="card border-0 shadow-sm story-card h-100" data-story-id="${story.id}" style="cursor: pointer; transition: all 0.3s ease;">
                    <div class="card-body d-flex flex-column">
                        <div class="d-flex justify-content-between align-items-start mb-3">
                            <div>
                                <h5 class="card-title mb-1">${story.name}</h5>
                                <small class="text-muted">${story.age_group}</small>
                            </div>
                            <span class="badge bg-success">✓ Recovered</span>
                        </div>

                        <div class="mb-3">
                            <span class="badge bg-info mb-2">${conditionDisplay}</span>
                            <p class="card-text text-muted small mb-0" style="line-height: 1.4;">
                                ${story.journey_summary.substring(0, 120)}...
                            </p>
                        </div>

                        <div class="mt-auto pt-3 border-top">
                            <div class="row text-center text-muted small">
                                <div class="col-6">
                                    <div class="fw-bold">${recoveryTime}</div>
                                    <div style="font-size: 0.85rem;">Recovery</div>
                                </div>
                                <div class="col-6">
                                    <div class="fw-bold">${treatmentCount}</div>
                                    <div style="font-size: 0.85rem;">Treatments</div>
                                </div>
                            </div>
                        </div>

                        <small class="text-primary fw-bold mt-3 d-block text-center">
                            Read full story →
                        </small>
                    </div>
                </div>
            </div>
        `;
    }

    // Show detailed story information
    showStoryDetail(story) {
        document.getElementById('storyModalTitle').innerHTML = `
            ${story.name}
            <small class="text-muted d-block" style="font-size: 0.7em;">Age: ${story.age_group} • Recovery: ${successStoriesHandler.getRecoveryDuration(story)}</small>
        `;

        const treatmentList = story.treatment_approach.split(',')
            .map(t => `<span class="badge bg-primary me-2 mb-2">${t.trim()}</span>`)
            .join('');

        const milestonesList = story.key_milestones
            .map(m => `<li class="mb-2">${m}</li>`)
            .join('');

        const lessonsList = story.lessons
            .map(l => `<li class="mb-2">${l}</li>`)
            .join('');

        const modalBody = `
            <div class="story-details">
                <!-- Recovery Quote -->
                <div class="alert alert-light border-start border-4 border-success mb-4">
                    <p class="mb-0 fst-italic">
                        <strong>"${story.recovery_quote}"</strong>
                    </p>
                </div>

                <!-- Journey Summary -->
                <div class="mb-4">
                    <h6 class="mb-3">📖 Recovery Journey</h6>
                    <p class="mb-0">${story.journey_summary}</p>
                </div>

                <!-- Key Milestones -->
                <div class="mb-4">
                    <h6 class="mb-3">🎯 Key Milestones</h6>
                    <ul class="list-unstyled">
                        ${milestonesList}
                    </ul>
                </div>

                <!-- Treatment Approach -->
                <div class="mb-4">
                    <h6 class="mb-3">💊 Treatment Approach</h6>
                    <div class="mb-2">
                        ${treatmentList}
                    </div>
                    <small class="text-muted">
                        This combination helped achieve recovery over ${story.timeline_years} year${story.timeline_years !== 1 ? 's' : ''}
                    </small>
                </div>

                <!-- Key Lessons -->
                <div class="mb-4">
                    <h6 class="mb-3">💡 Key Lessons for Recovery</h6>
                    <ul class="list-unstyled">
                        ${lessonsList}
                    </ul>
                </div>

                <!-- Today -->
                <div class="alert alert-success mb-4">
                    <h6 class="alert-heading">🌟 Today</h6>
                    <p class="mb-0">${story.today}</p>
                </div>

                <!-- Condition & Treatments -->
                <div class="row mb-4">
                    <div class="col-md-6">
                        <div>
                            <h6 class="mb-2">Condition</h6>
                            <p class="mb-0"><strong>${story.condition}</strong></p>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div>
                            <h6 class="mb-2">Age Group at Story</h6>
                            <p class="mb-0"><strong>${story.age_group}</strong></p>
                        </div>
                    </div>
                </div>

                <!-- Source & Resources -->
                <div class="card bg-light border-0 mb-4">
                    <div class="card-body">
                        <h6 class="card-title mb-2">📚 Verified Source</h6>
                        <p class="card-text small mb-2">${story.source}</p>
                        ${story.resource_link ? `
                            <a href="${story.resource_link}" target="_blank" class="btn btn-sm btn-outline-primary">
                                Learn More →
                            </a>
                        ` : ''}
                    </div>
                </div>

                <!-- Inspiration Section -->
                <div class="alert alert-info">
                    <h6 class="alert-heading">✨ Why This Story Matters</h6>
                    <p class="mb-0">
                        ${story.name}'s recovery demonstrates that ${story.condition.toLowerCase()} is treatable.
                        With proper treatment combining ${story.treatment_approach.split(',').slice(0, 2).join(' and ')},
                        recovery is possible for you or someone you care about.
                    </p>
                </div>

                <!-- Call to Action -->
                <div class="alert alert-success">
                    <h6 class="alert-heading">🚀 Your Recovery Can Start Today</h6>
                    <ul class="mb-2">
                        <li><strong>Talk to a Doctor:</strong> Primary care physicians can refer to mental health specialists</li>
                        <li><strong>Find Treatment:</strong> Use the Find Treatment tab to locate providers near you</li>
                        <li><strong>Crisis Support:</strong> Call 988 (Suicide & Crisis Lifeline) or text HOME to 741741</li>
                        <li><strong>Contact SAMHSA:</strong> 1-800-662-4357 for treatment referrals</li>
                    </ul>
                </div>
            </div>
        `;

        document.getElementById('storyModalBody').innerHTML = modalBody;
        this.storyModal.show();
    }

    // Update story cards with fade animation
    updateStoryCards(stories) {
        const grid = document.getElementById('storiesGrid');
        if (grid) {
            grid.style.opacity = '0.5';
            grid.style.transition = 'opacity 0.3s ease';
            setTimeout(() => {
                this.renderStoryCards(stories);
                grid.style.opacity = '1';
            }, 150);
        } else {
            this.renderStoryCards(stories);
        }
    }

    // Update story count display
    updateStoryCount(count) {
        const countElement = document.getElementById('storyCount');
        if (countElement) {
            countElement.textContent = `${count} stor${count === 1 ? 'y' : 'ies'} found`;
        }
    }

    // Display success statistics
    showSuccessStatistics() {
        const stats = successStoriesHandler.getSuccessStatistics();
        const statsElement = document.getElementById('successStats');
        if (statsElement) {
            statsElement.innerHTML = `
                <div class="alert alert-info">
                    <h6 class="mb-3">📊 Archive Overview</h6>
                    <div class="row text-center">
                        <div class="col-md-3">
                            <div class="fw-bold" style="font-size: 1.5em; color: #0d6efd;">${stats.total_stories}</div>
                            <small>Documented Stories</small>
                        </div>
                        <div class="col-md-3">
                            <div class="fw-bold" style="font-size: 1.5em; color: #198754;">${stats.conditions_represented}</div>
                            <small>Conditions Covered</small>
                        </div>
                        <div class="col-md-3">
                            <div class="fw-bold" style="font-size: 1.5em; color: #0dcaf0;">${stats.avg_recovery_timeline}</div>
                            <small>Avg. Years to Recovery</small>
                        </div>
                        <div class="col-md-3">
                            <div class="fw-bold" style="font-size: 1.5em; color: #fd7e14;">100%</div>
                            <small>Recovery Rate</small>
                        </div>
                    </div>
                </div>
            `;
        }
    }
}

// Create global success stories UI instance
const successStoriesUI = new SuccessStoriesUI();
