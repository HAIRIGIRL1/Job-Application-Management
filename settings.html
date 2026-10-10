
(function () {
    const $ = id => document.getElementById(id);

    const safe = value =>
        window.JAMSValidation
            ? JAMSValidation.escape(value)
            : String(value ?? '');

    const all = () => JAMS.getApplicants();

    const statusClass = status => ({
        Applied: 'applied',
        Pending: 'pending',
        'Under Review': 'under-review',
        Interview: 'interview',
        Hired: 'hired',
        Rejected: 'rejected'
    }[status] || 'applied');

    const pill = status =>
        `<span class="pill ${statusClass(status)}">${safe(status)}</span>`;

    const initials = name =>
        String(name || '?')
            .trim()
            .split(/\s+/)
            .slice(0, 2)
            .map(part => part[0] || '')
            .join('')
            .toUpperCase();

    const dateFmt = date => {
        if (!date) return '—';

        const parsedDate = new Date(
            date.length === 10 ? date + 'T00:00:00' : date
        );

        if (isNaN(parsedDate)) return date;

        return parsedDate.toLocaleDateString(undefined, {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const person = applicant => `
        <div class="person-cell">
            <span class="person-avatar">
                ${safe(initials(applicant.name))}
            </span>
            <div>
                <b>${safe(applicant.name)}</b>
                <small>${safe(applicant.email)}</small>
            </div>
        </div>
    `;

    const empty = (columns, message = 'No records found.') => `
        <tr>
            <td colspan="${columns}">
                <div class="empty-state">
                    <b>${safe(message)}</b>
                    Try adding an applicant or changing your filters.
                </div>
            </td>
        </tr>
    `;

    function viewBtn(applicant) {
        return `
            <div class="action-row">
                <a
                    class="small-btn"
                    href="applicant-details.html?id=${encodeURIComponent(applicant.id)}"
                >
                    View
                </a>

                <a
                    class="small-btn"
                    href="add-applicant.html?id=${encodeURIComponent(applicant.id)}"
                >
                    Edit
                </a>

                <button
                    class="small-btn delete"
                    data-delete="${safe(applicant.id)}"
                >
                    Delete
                </button>
            </div>
        `;
    }

    function wireDelete(root) {
        root.querySelectorAll('[data-delete]').forEach(button => {
            button.addEventListener('click', () => {
                const applicant = JAMS.getApplicant(button.dataset.delete);

                if (!applicant) return;

                if (confirm(`Delete ${applicant.name}? This cannot be undone.`)) {
                    JAMS.deleteApplicant(applicant.id);

                    renderApplicants();
                    renderDashboard();
                    renderFilter();
                    renderReports();

                    if (document.body.dataset.page === 'details') {
                        location.href = 'applicants.html';
                    }
                }
            });
        });
    }

    function renderDashboard() {
        if (!$('recentRows')) return;

        const applicants = all();

        $('totalCount').textContent = applicants.length;

        $('pendingCount').textContent = applicants.filter(applicant =>
            ['Applied', 'Pending', 'Under Review'].includes(applicant.status)
        ).length;

        $('hiredCount').textContent = applicants.filter(
            applicant => applicant.status === 'Hired'
        ).length;

        $('interviewCount').textContent = applicants.filter(
            applicant => applicant.status === 'Interview'
        ).length;

        const recentApplicants = applicants
            .slice()
            .sort((a, b) =>
                new Date(b.createdAt || b.dateApplied) -
                new Date(a.createdAt || a.dateApplied)
            )
            .slice(0, 5);

        $('recentRows').innerHTML = recentApplicants.length
            ? recentApplicants.map(applicant => `
                <tr>
                    <td>${person(applicant)}</td>
                    <td>${safe(applicant.position)}</td>
                    <td>${safe(applicant.education)}</td>
                    <td>${dateFmt(applicant.dateApplied || applicant.createdAt)}</td>
                    <td>${pill(applicant.status)}</td>
                    <td>
                        <a
                            class="small-btn"
                            href="applicant-details.html?id=${encodeURIComponent(applicant.id)}"
                        >
                            View
                        </a>
                    </td>
                </tr>
            `).join('')
            : empty(6, 'No applicants yet.');
    }

    function renderApplicants() {
        if (!$('applicantRows')) return;

        const query = ($('applicantSearch')?.value || '')
            .toLowerCase()
            .trim();

        const status = $('statusFilter')?.value || '';

        const applicants = all().filter(applicant => {
            const searchableText = [
                applicant.name,
                applicant.email,
                applicant.education,
                applicant.skills,
                applicant.experience,
                applicant.position
            ].join(' ').toLowerCase();

            return (
                (!query || searchableText.includes(query)) &&
                (!status || applicant.status === status)
            );
        });

        $('applicantRows').innerHTML = applicants.length
            ? applicants.map(applicant => `
                <tr>
                    <td>${person(applicant)}</td>
                    <td>${safe(applicant.education)}</td>
                    <td>${safe(applicant.skills)}</td>
                    <td>${safe(applicant.position)}</td>
                    <td>${pill(applicant.status)}</td>
                    <td>${viewBtn(applicant)}</td>
                </tr>
            `).join('')
            : empty(6);

        $('applicantCount').textContent =
            `${applicants.length} applicant${applicants.length === 1 ? '' : 's'} shown`;

        wireDelete($('applicantRows'));
    }

    function initApplicantForm() {
        const form = $('applicantForm');

        if (!form) return;

        const id = new URLSearchParams(location.search).get('id');
        const existing = id ? JAMS.getApplicant(id) : null;

        if (id && !existing) {
            $('formMessage').textContent =
                'Applicant not found. You can add a new record.';
        }

        if (existing) {
            $('appFormHeading').textContent = 'Edit Applicant';
            $('crumbCurrent').textContent = 'Edit Applicant';
            $('recordId').value = existing.id;

            const fields = {
                fullName: 'name',
                appEmail: 'email',
                phone: 'phone',
                position: 'position',
                education: 'education',
                school: 'school',
                skills: 'skills',
                experience: 'experience',
                status: 'status',
                dateApplied: 'dateApplied'
            };

            for (const [field, key] of Object.entries(fields)) {
                if ($(field)) {
                    $(field).value = existing[key] || '';
                }
            }

            form.querySelector('button[type="submit"]').textContent =
                'Update Applicant';
        } else if ($('dateApplied')) {
            $('dateApplied').value = new Date()
                .toISOString()
                .slice(0, 10);
        }

        form.addEventListener('submit', event => {
            event.preventDefault();

            const data = {
                name: $('fullName').value.trim(),
                email: $('appEmail').value.trim(),
                phone: $('phone').value.trim(),
                position: $('position').value,
                education: $('education').value.trim(),
                school: $('school').value.trim(),
                skills: $('skills').value.trim(),
                experience: $('experience').value.trim(),
                status: $('status').value,
                dateApplied: $('dateApplied').value ||
                    new Date().toISOString().slice(0, 10)
            };

            if (
                !data.name ||
                !data.email ||
                !data.position ||
                !data.education ||
                !data.skills ||
                !data.experience
            ) {
                $('formMessage').textContent =
                    'Please complete all required fields.';
                return;
            }

            if (!JAMSValidation.email(data.email)) {
                $('formMessage').textContent =
                    'Please enter a valid email address.';
                return;
            }

            if (existing) {
                JAMS.updateApplicant(existing.id, data);
            } else {
                const settings = JAMS.getSettings();

                if (!$('status').dataset.changed) {
                    data.status = settings.defaultStatus || data.status;
                }

                JAMS.addApplicant(data);
            }

            location.href = 'applicants.html';
        });
    }

    function renderDetails() {
        const host = $('detailsContent');

        if (!host) return;

        const id = new URLSearchParams(location.search).get('id');
        const applicant = JAMS.getApplicant(id);

        if (!applicant) {
            host.innerHTML = `
                <div class="empty-state">
                    <b>Applicant not found</b>
                    <a class="btn primary" href="applicants.html">
                        Back to applicants
                    </a>
                </div>
            `;
            return;
        }

        host.innerHTML = `
            <div class="details-head">
                <div class="details-person">
                    <span class="person-avatar">
                        ${safe(initials(applicant.name))}
                    </span>

                    <div>
                        <h2>${safe(applicant.name)}</h2>
                        <p class="muted">
                            ${safe(applicant.position)} · Applicant ID #${safe(applicant.id)}
                        </p>
                        <div style="margin-top: 9px">
                            ${pill(applicant.status)}
                        </div>
                    </div>
                </div>

                <div class="details-actions">
                    <a class="btn secondary" href="applicants.html">
                        Back
                    </a>

                    <a
                        class="btn primary"
                        href="add-applicant.html?id=${encodeURIComponent(applicant.id)}"
                    >
                        Edit applicant
                    </a>

                    <button class="btn danger" id="deleteDetail">
                        Delete
                    </button>
                </div>
            </div>

            <div class="detail-grid">
                <div class="detail-item">
                    <label>Email address</label>
                    <p>${safe(applicant.email)}</p>
                </div>

                <div class="detail-item">
                    <label>Contact number</label>
                    <p>${safe(applicant.phone || 'Not provided')}</p>
                </div>

                <div class="detail-item">
                    <label>Application position</label>
                    <p>${safe(applicant.position)}</p>
                </div>

                <div class="detail-item">
                    <label>Date applied</label>
                    <p>${dateFmt(applicant.dateApplied)}</p>
                </div>

                <div class="detail-item">
                    <label>Educational background</label>
                    <p>${safe(applicant.education)}</p>
                </div>

                <div class="detail-item">
                    <label>School / institution</label>
                    <p>${safe(applicant.school || 'Not provided')}</p>
                </div>

                <div class="detail-item wide">
                    <label>Skills</label>
                    <p>${safe(applicant.skills)}</p>
                </div>

                <div class="detail-item wide">
                    <label>Work experience</label>
                    <p>${safe(applicant.experience)}</p>
                </div>

                <div class="detail-item">
                    <label>Update application status</label>
                    <select id="detailStatus">
                        <option ${applicant.status === 'Applied' ? 'selected' : ''}>
                            Applied
                        </option>
                        <option ${applicant.status === 'Under Review' ? 'selected' : ''}>
                            Under Review
                        </option>
                        <option ${applicant.status === 'Interview' ? 'selected' : ''}>
                            Interview
                        </option>
                        <option ${applicant.status === 'Hired' ? 'selected' : ''}>
                            Hired
                        </option>
                        <option ${applicant.status === 'Rejected' ? 'selected' : ''}>
                            Rejected
                        </option>
                    </select>
                </div>

                <div class="detail-item">
                    <label>Save status</label>
                    <button class="btn primary" id="saveStatus">
                        Update status
                    </button>
                    <span id="statusMessage" class="form-message"></span>
                </div>
            </div>
        `;

        $('deleteDetail').addEventListener('click', () => {
            if (confirm(`Delete ${applicant.name}?`)) {
                JAMS.deleteApplicant(applicant.id);
                location.href = 'applicants.html';
            }
        });

        $('saveStatus').addEventListener('click', () => {
            JAMS.updateApplicant(applicant.id, {
                status: $('detailStatus').value
            });

            $('statusMessage').textContent = 'Status updated.';

            setTimeout(() => location.reload(), 450);
        });
    }

    function renderFilter() {
        if (!$('filterRows')) return;

        const position = $('filterPosition').value;
        const status = $('filterStatus').value;
        const query = $('filterQualification').value
            .toLowerCase()
            .trim();

        const applicants = all().filter(applicant => {
            const searchableText = [
                applicant.education,
                applicant.skills,
                applicant.experience,
                applicant.school
            ].join(' ').toLowerCase();

            return (
                (!position || applicant.position === position) &&
                (!status || applicant.status === status) &&
                (!query || searchableText.includes(query))
            );
        });

        $('filterRows').innerHTML = applicants.length
            ? applicants.map(applicant => `
                <tr>
                    <td>${person(applicant)}</td>
                    <td>${safe(applicant.education)}</td>
                    <td>${safe(applicant.skills)}</td>
                    <td>${safe(applicant.position)}</td>
                    <td>${pill(applicant.status)}</td>
                    <td>
                        <a
                            class="small-btn"
                            href="applicant-details.html?id=${encodeURIComponent(applicant.id)}"
                        >
                            View
                        </a>
                    </td>
                </tr>
            `).join('')
            : empty(6, 'No applicants match these filters.');

        $('filterSummary').textContent =
            `${applicants.length} matching applicant${applicants.length === 1 ? '' : 's'}`;

        wireDelete($('filterRows'));
    }

    function renderReports() {
        if (!$('statusReport')) return;

        const applicants = all();
        const statuses = [
            'Applied',
            'Under Review',
            'Interview',
            'Hired',
            'Rejected'
        ];

        $('reportTotal').textContent = applicants.length;

        $('reportPending').textContent = applicants.filter(applicant =>
            ['Applied', 'Under Review'].includes(applicant.status)
        ).length;

        $('reportInterview').textContent = applicants.filter(
            applicant => applicant.status === 'Interview'
        ).length;

        $('reportHired').textContent = applicants.filter(
            applicant => applicant.status === 'Hired'
        ).length;

        $('statusReport').innerHTML = statuses.map(status => {
            const count = applicants.filter(
                applicant => applicant.status === status
            ).length;

            const percentage = applicants.length
                ? Math.round(count / applicants.length * 100)
                : 0;

            return `
                <div>
                    <div class="report-bar-head">
                        <span>${safe(status)}</span>
                        <b>${count} (${percentage}%)</b>
                    </div>

                    <div class="bar-track">
                        <div
                            class="bar-fill"
                            style="width: ${percentage}%"
                        ></div>
                    </div>
                </div>
            `;
        }).join('');
    }

    function exportCsv() {
        const applicants = all();

        const headers = [
            'ID',
            'Name',
            'Email',
            'Phone',
            'Education',
            'School',
            'Skills',
            'Experience',
            'Position',
            'Status',
            'Date Applied'
        ];

        const rows = applicants.map(applicant => [
            applicant.id,
            applicant.name,
            applicant.email,
            applicant.phone,
            applicant.education,
            applicant.school,
            applicant.skills,
            applicant.experience,
            applicant.position,
            applicant.status,
            applicant.dateApplied
        ]);

        const csv = [headers, ...rows]
            .map(row =>
                row.map(value =>
                    '"' + String(value ?? '').replace(/"/g, '""') + '"'
                ).join(',')
            )
            .join('\r\n');

        const blob = new Blob(['\ufeff' + csv], {
            type: 'text/csv;charset=utf-8;'
        });

        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');

        link.href = url;
        link.download = 'job-applicants-report.csv';
        link.click();

        URL.revokeObjectURL(url);
    }

    function renderNotifications() {
        const host = $('notificationList');

        if (!host) return;

        const activities = JAMS.getActivity();

        host.innerHTML = activities.length
            ? activities.map(activity => `
                <article class="notification-item">
                    <span class="stat-icon blue">✓</span>

                    <div>
                        <b>${safe(activity.title)}</b>
                        <p>${safe(activity.message)}</p>
                        <small>
                            ${dateFmt(activity.date)} ·
                            ${new Date(activity.date).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit'
                            })}
                        </small>
                    </div>
                </article>
            `).join('')
            : `
                <div class="empty-state">
                    <b>No notifications yet</b>
                    Activity such as adding or updating applicants will appear here.
                </div>
            `;
    }

    function initSettings() {
        if (!$('settingsForm')) return;

        const settings = JAMS.getSettings();

        const fields = {
            adminName: 'adminName',
            adminEmail: 'adminEmail',
            companyName: 'companyName',
            defaultStatus: 'defaultStatus'
        };

        for (const [id, key] of Object.entries(fields)) {
            $(id).value = settings[key] || '';
        }

        $('settingsForm').addEventListener('submit', event => {
            event.preventDefault();

            const nextSettings = {
                adminName: $('adminName').value.trim(),
                adminEmail: $('adminEmail').value.trim(),
                companyName: $('companyName').value.trim(),
                defaultStatus: $('defaultStatus').value
            };

            if (!JAMSValidation.email(nextSettings.adminEmail)) {
                $('settingsMessage').textContent =
                    'Enter a valid administrator email.';
                return;
            }

            JAMS.saveSettings(nextSettings);

            JAMS.addActivity(
                'Settings saved',
                'System preferences were updated.'
            );

            $('settingsMessage').textContent =
                'Settings saved successfully.';
        });

        $('resetDemo').addEventListener('click', () => {
            if (
                confirm(
                    'Reset all demo applicant records and settings to the original sample data?'
                )
            ) {
                JAMS.reset();
                location.reload();
            }
        });
    }

    function init() {
        if ($('loginForm')) {
            $('loginForm').addEventListener('submit', event => {
                event.preventDefault();

                const email = $('email').value.trim();
                const password = $('password').value;

                if (!JAMSValidation.email(email)) {
                    $('loginMessage').textContent =
                        'Please enter a valid email address.';
                    return;
                }

                if (!password.trim()) {
                    $('loginMessage').textContent =
                        'Please enter your password.';
                    return;
                }

                sessionStorage.setItem('jams_demo_user', email);

                JAMS.addActivity(
                    'Signed in',
                    'A demo user signed in as ' + email + '.'
                );

                location.href = 'index.html';
            });
        }

        if ($('recoveryForm')) {
            $('recoveryForm').addEventListener('submit', event => {
                event.preventDefault();

                const email = $('recoveryEmail').value.trim();

                $('recoveryMessage').textContent =
                    JAMSValidation.email(email)
                        ? 'If this email belongs to an account, recovery instructions would be sent. (Demo only; no email was sent.)'
                        : 'Please enter a valid email address.';
            });
        }

        renderDashboard();
        renderApplicants();
        initApplicantForm();
        renderDetails();

        if ($('applicantSearch')) {
            $('applicantSearch').addEventListener(
                'input',
                renderApplicants
            );
        }

        if ($('statusFilter')) {
            $('statusFilter').addEventListener(
                'change',
                renderApplicants
            );
        }

        if ($('filterForm')) {
            $('filterForm').addEventListener('submit', event => {
                event.preventDefault();
                renderFilter();
            });

            $('filterForm').addEventListener('reset', () => {
                setTimeout(renderFilter, 0);
            });

            [
                'filterPosition',
                'filterStatus',
                'filterQualification'
            ].forEach(id => {
                $(id).addEventListener('change', renderFilter);
            });

            renderFilter();
        }

        renderReports();

        if ($('exportCsv')) {
            $('exportCsv').addEventListener('click', exportCsv);
        }

        renderNotifications();

        if ($('clearNotifications')) {
            $('clearNotifications').addEventListener('click', () => {
                if (confirm('Clear all notifications?')) {
                    JAMS.clearActivity();
                    renderNotifications();
                }
            });
        }

        initSettings();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
