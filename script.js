document.addEventListener('DOMContentLoaded', () => {
    const resumeForm = document.getElementById('resumeForm');
    const resumeContainer = document.getElementById('resume');
    const addEducationButton = document.getElementById('addEducation');
    const addExperienceButton = document.getElementById('addExperience');
    const addSkillButton = document.getElementById('addSkill');

    // Add more education fields
    addEducationButton.addEventListener('click', () => {
        const educationContainer = document.getElementById('educationContainer');
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
    });

    // Add more experience fields
    addExperienceButton.addEventListener('click', () => {
        const experienceContainer = document.getElementById('experienceContainer');
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
    });

    // Add more skill fields
    addSkillButton.addEventListener('click', () => {
        const skillsContainer = document.getElementById('skillsContainer');
        const newSkillInput = document.createElement('input');
        newSkillInput.type = 'text';
        newSkillInput.name = 'skills[]';
        newSkillInput.placeholder = 'Enter a skill';
        skillsContainer.appendChild(newSkillInput);
    });

    // Handle form submission and generate resume
    resumeForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(resumeForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const profileImage = formData.get('profileImage');
        const educationEntries = formData.getAll('eduDegree[]').map((degree, i) => ({
            degree,
            institution: formData.getAll('eduInstitution[]')[i],
            year: formData.getAll('eduYear[]')[i],
        }));
        const experienceEntries = formData.getAll('jobTitle[]').map((jobTitle, i) => ({
            jobTitle,
            company: formData.getAll('company[]')[i],
            year: formData.getAll('jobYear[]')[i],
        }));
        const skills = formData.getAll('skills[]').join(', ');

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
        resumeContainer.innerHTML = resumeHtml;
    });
});




