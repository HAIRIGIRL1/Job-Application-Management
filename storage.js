
/* Applicant data and Local Storage helpers for the JAMS demo. */
(function () {
    const KEY = 'jams_applicants_v1';
    const LOG = 'jams_activity_v1';
    const SETTINGS = 'jams_settings_v1';

    const seed = [
        {
            id: 1,
            name: 'Jordan Davis',
            email: 'jordan.davis@example.com',
            phone: '09171234567',
            education: 'BS Information Technology',
            school: 'Metro City University',
            skills: 'HTML, CSS, JavaScript, Git',
            experience: '1 year as a junior web developer',
            position: 'Web Developer',
            status: 'Under Review',
            dateApplied: '2026-10-01',
            createdAt: '2026-10-01T09:00:00.000Z'
        },
        {
            id: 2,
            name: 'Emma Wilson',
            email: 'emma.wilson@example.com',
            phone: '09181234567',
            education: 'BS Multimedia Arts',
            school: 'Northview College',
            skills: 'Figma, UI Design, Prototyping, UX Research',
            experience: '6-month design internship',
            position: 'UI/UX Designer',
            status: 'Interview',
            dateApplied: '2026-10-03',
            createdAt: '2026-10-03T10:30:00.000Z'
        },
        {
            id: 3,
            name: 'Liam Chen',
            email: 'liam.chen@example.com',
            phone: '09191234567',
            education: 'BS Computer Science',
            school: 'Eastbridge University',
            skills: 'SQL, Python, Excel, Data Visualization',
            experience: 'Entry-level; academic data analysis projects',
            position: 'Data Analyst',
            status: 'Hired',
            dateApplied: '2026-10-04',
            createdAt: '2026-10-04T08:15:00.000Z'
        },
        {
            id: 4,
            name: 'Maria Santos',
            email: 'maria.santos@example.com',
            phone: '09201234567',
            education: 'BS Information Technology',
            school: 'Pasig City College',
            skills: 'Troubleshooting, Networking, Windows, Customer Support',
            experience: '1 year IT support practicum',
            position: 'IT Support Specialist',
            status: 'Applied',
            dateApplied: '2026-10-06',
            createdAt: '2026-10-06T12:00:00.000Z'
        }
    ];

    function read(key, fallback) {
        try {
            const value = localStorage.getItem(key);
            return value ? JSON.parse(value) : fallback;
        } catch (error) {
            return fallback;
        }
    }

    window.JAMS = {
        getApplicants() {
            let applicants = read(KEY, null);

            if (!Array.isArray(applicants)) {
                applicants = seed.slice();
                localStorage.setItem(KEY, JSON.stringify(applicants));
            }

            return applicants;
        },

        saveApplicants(applicants) {
            localStorage.setItem(KEY, JSON.stringify(applicants));
        },

        getApplicant(id) {
            return this.getApplicants().find(
                applicant => String(applicant.id) === String(id)
            );
        },

        nextId() {
            return this.getApplicants().reduce(
                (max, applicant) => Math.max(max, Number(applicant.id) || 0),
                0
            ) + 1;
        },

        addApplicant(data) {
            const applicants = this.getApplicants();

            const item = {
                ...data,
                id: this.nextId(),
                createdAt: new Date().toISOString()
            };

            applicants.unshift(item);
            this.saveApplicants(applicants);

            this.addActivity(
                'Applicant added',
                item.name + ' was added for ' + item.position + '.'
            );

            return item;
        },

        updateApplicant(id, data) {
            const applicants = this.getApplicants();

            const index = applicants.findIndex(
                applicant => String(applicant.id) === String(id)
            );

            if (index < 0) {
                return null;
            }

            const oldApplicant = applicants[index];

            applicants[index] = {
                ...oldApplicant,
                ...data,
                id: oldApplicant.id,
                createdAt: oldApplicant.createdAt
            };

            this.saveApplicants(applicants);

            this.addActivity(
                'Applicant updated',
                applicants[index].name + ' applicant record was updated.'
            );

            return applicants[index];
        },

        deleteApplicant(id) {
            const applicants = this.getApplicants();

            const item = applicants.find(
                applicant => String(applicant.id) === String(id)
            );

            if (!item) {
                return false;
            }

            this.saveApplicants(
                applicants.filter(
                    applicant => String(applicant.id) !== String(id)
                )
            );

            this.addActivity(
                'Applicant deleted',
                item.name + ' was removed from applicant records.'
            );

            return true;
        },

        addActivity(title, message) {
            const activities = read(LOG, []);

            activities.unshift({
                id: Date.now(),
                title,
                message,
                date: new Date().toISOString()
            });

            localStorage.setItem(
                LOG,
                JSON.stringify(activities.slice(0, 40))
            );
        },

        getActivity() {
            return read(LOG, []);
        },

        clearActivity() {
            localStorage.setItem(LOG, '[]');
        },

        getSettings() {
            return read(SETTINGS, {
                adminName: 'Admin',
                adminEmail: 'admin@example.com',
                companyName: 'ABC Technology Solutions',
                defaultStatus: 'Applied'
            });
        },

        saveSettings(settings) {
            localStorage.setItem(SETTINGS, JSON.stringify(settings));
        },

        reset() {
            localStorage.removeItem(KEY);
            localStorage.removeItem(LOG);
            localStorage.removeItem(SETTINGS);

            this.getApplicants();
        }
    };
})();
