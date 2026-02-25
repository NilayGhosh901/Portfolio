const fs = require('fs');

const filesToUpdate = [
    'about.html',
    'projects.html',
    'education.html',
    'experience.html',
    'skills.html',
    'certifications.html',
    'featured.html',
    'recommendations.html',
    'contact.html',
    'index.html'
];

const newDesktopLinks = `
                            <a href="volunteering.html" class="block px-4 py-2.5 text-slate-700 hover:bg-slate-50 hover:text-brand-blue transition">Volunteering</a>
                            <a href="honors.html" class="block px-4 py-2.5 text-slate-700 hover:bg-slate-50 hover:text-brand-blue transition">Honors & Awards</a>
                            <a href="recommendations.html" class="block px-4 py-2.5 text-slate-700 hover:bg-slate-50 hover:text-brand-blue transition">Recommendations</a>`;

const newMobileLinks = `
                    <li><a href="volunteering.html" class="block py-2 text-slate-600 hover:text-brand-blue w-full text-center">Volunteering</a></li>
                    <li><a href="honors.html" class="block py-2 text-slate-600 hover:text-brand-blue w-full text-center">Honors & Awards</a></li>
                    <li><a href="recommendations.html" class="block py-2 text-slate-600 hover:text-brand-blue w-full text-center">Recommendations</a></li>`;

filesToUpdate.forEach(file => {
    try {
        let content = fs.readFileSync(file, 'utf8');
        
        // Need to replace the old recommendations link with volunteering, honors, and recommendations
        const desktopSearch = '<a href="recommendations.html" class="block px-4 py-2.5 text-slate-700 hover:bg-slate-50 hover:text-brand-blue transition">Recommendations</a>';
        const mobileSearch = '<li><a href="recommendations.html" class="block py-2 text-slate-600 hover:text-brand-blue w-full text-center">Recommendations</a></li>';
        
        content = content.replace(desktopSearch, newDesktopLinks.trim());
        content = content.replace(mobileSearch, newMobileLinks.trim());
        
        fs.writeFileSync(file, content);
        console.log(`Updated nav links in ${file}`);
    } catch (err) {
        console.error(`Error updating ${file}:`, err);
    }
});
