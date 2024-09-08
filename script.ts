document.addEventListener('DOMContentLoaded', () => {
    const resumeForm = document.getElementById('resumeForm') as HTMLFormElement | null;
    const resumeContainer = document.getElementById('resume') as HTMLElement | null;
    const addEducationButton = document.getElementById('addEducation') as HTMLButtonElement | null;
    const addExperienceButton = document.getElementById('addExperience') as HTMLButtonElement | null;
    const addSkillButton = document.getElementById('addSkill') as HTMLButtonElement | null;

    // Add more education fields
    addEducationButton?.addEventListener('click', () => {
        const educationContainer = document.getElementById('educationContainer') as HTMLElement | null;
        if (educationContainer) {
            const newEntry = document.createElement('div');
            newEntry.classList.add('education-entry');
            newEntry.innerHTML = `
                <label>Degree:</label>
                <input type="text" name="eduDegree[]">
                <label>Institution:</label>
                <input type="text" name="eduInstitution[]">
                <label>Year:</label>
                <input type="text" name="eduYear[]">
            `;
            educationContainer.appendChild(newEntry);
        }
    });

    // Add more experience fields
    addExperienceButton?.addEventListener('click', () => {
        const experienceContainer = document.getElementById('experienceContainer') as HTMLElement | null;
        if (experienceContainer) {
            const newEntry = document.createElement('div');
            newEntry.classList.add('experience-entry');
            newEntry.innerHTML = `
                <label>Job Title:</label>
                <input type="text" name="jobTitle[]">
                <label>Company:</label>
                <input type="text" name="company[]">
                <label>Year:</label>
                <input type="text" name="jobYear[]">
            `;
            experienceContainer.appendChild(newEntry);
        }
    });

    // Add more skill fields
    addSkillButton?.addEventListener('click', () => {
        const skillsContainer = document.getElementById('skillsContainer') as HTMLElement | null;
        if (skillsContainer) {
            const newSkillInput = document.createElement('input');
            newSkillInput.type = 'text';
            newSkillInput.name = 'skills[]';
            newSkillInput.placeholder = 'Enter a skill';
            skillsContainer.appendChild(newSkillInput);
        }
    });

    // Handle form submission and generate resume
    resumeForm?.addEventListener('submit', (e: Event) => {
        e.preventDefault();

        const formData = new FormData(resumeForm);
        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const phone = formData.get('phone') as string;
        const profileImage = formData.get('profileImage') as File;

        const educationEntries = (formData.getAll('eduDegree[]') as string[]).map((degree, i) => ({
            degree,
            institution: (formData.getAll('eduInstitution[]') as string[])[i],
            year: (formData.getAll('eduYear[]') as string[])[i],
        }));

        const experienceEntries = (formData.getAll('jobTitle[]') as string[]).map((jobTitle, i) => ({
            jobTitle,
            company: (formData.getAll('company[]') as string[])[i],
            year: (formData.getAll('jobYear[]') as string[])[i],
        }));

        const skills = (formData.getAll('skills[]') as string[]).join(', ');

        let resumeHtml = `
            <h3>${name}</h3>
            <p>Email: ${email}</p>
            <p>Phone: ${phone}</p>
        `;

        // Add profile image if uploaded
        if (profileImage && profileImage.size > 0) {
            const profileImageUrl = URL.createObjectURL(profileImage);
            resumeHtml += `<img src="${profileImageUrl}" alt="${name}'s profile image" style="width: 100px; height: 100px;">`;
        }

        // Add education section
        if (educationEntries.length) {
            resumeHtml += '<h4>Education</h4><ul>';
            educationEntries.forEach(entry => {
                resumeHtml += `<li>${entry.degree} from ${entry.institution} (${entry.year})</li>`;
            });
            resumeHtml += '</ul>';
        }

        // Add experience section
        if (experienceEntries.length) {
            resumeHtml += '<h4>Work Experience</h4><ul>';
            experienceEntries.forEach(entry => {
                resumeHtml += `<li>${entry.jobTitle} at ${entry.company} (${entry.year})</li>`;
            });
            resumeHtml += '</ul>';
        }

        // Add skills section
        if (skills) {
            resumeHtml += `<h4>Skills</h4><p>${skills}</p>`;
        }

        // Display the generated resume in the resume section
        if (resumeContainer) {
            resumeContainer.innerHTML = resumeHtml;
        }
    });
});
