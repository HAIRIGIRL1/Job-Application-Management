
(function () {
    const el = document.getElementById('appShell');
    if (!el) return;

    const page = document.body.dataset.page || 'dashboard';

    const links = [
        ['admin.html', '▦', 'Dashboard', 'dashboard'],
        ['applicants.html', '♙', 'Applicants', 'applicants'],
        ['add-applicant.html', '＋', 'Add Applicant', 'add'],
        ['filter.html', '⌕', 'Filter Applicants', 'filter'],
        ['reports.html', '▥', 'Reports', 'reports'],
        ['notifications.html', '♧', 'Notifications', 'notifications'],
        ['settings.html', '⚙', 'Settings', 'settings']
    ];

    el.innerHTML = `
        <aside class="sidebar">
            <a class="brand" href="admin.html">
                <span class="brand-mark">◆</span>
                <strong>Job Applicant<br>Management System</strong>
            </a>

            <div class="side-label">WORKSPACE</div>

            <nav>
                ${links.map(([url, icon, label, key]) => `
                    <a class="nav-link ${page === key ? 'active' : ''}"
                       href="${url}">
                        <span class="nav-icon">${icon}</span>
                        ${label}
                    </a>
                `).join('')}
            </nav>

            <div class="sidebar-bottom">
                <a class="nav-link" href="login.html" id="logoutLink">
                    <span class="nav-icon">↪</span>
                    Sign out
                </a>

                <div class="sidebar-note">
                    <b>College IT project</b><br>
                    Sample applicant data is stored in this browser.
                </div>
            </div>
        </aside>
    `;

    const out = document.getElementById('logoutLink');

    if (out) {
        out.addEventListener('click', () => {
            try {
                JAMS.addActivity(
                    'Signed out',
                    'Admin signed out of the demo.'
                );
            } catch (e) {}
        });
    }
})();
