const fs = require('fs');
const path = require('path');

const excludeFiles = ['index.html', 'pdf_viewer.html'];

function applyTheme() {
    console.log("Starting theme application...");
    
    // Read the source of truth
    const indexHtml = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

    // Extract the new Head section (up to </head>)
    const headSection = indexHtml.split('</head>')[0] + '</head>';
    
    // Extract the new Body signature (for no scroll: <body class="... overflow-hidden ...">)
    const bodyMatch = indexHtml.match(/<body[^>]*>/);
    const bodyTag = bodyMatch ? bodyMatch[0] : '<body class="relative min-h-screen font-sans bg-slate-50">';

    // Extract Ambient Background
    const ambientBgMatch = indexHtml.match(/<!-- Ambient Background matching the new design -->[\s\S]*?<\/div>\s*<!-- Main Content wrapper/);
    if (!ambientBgMatch) {
        console.error("Could not find ambient background in index.html");
        return;
    }
    const ambientBg = ambientBgMatch[0].replace(/\s*<!-- Main Content wrapper/, '');

    // Extract the new Navbar (the <nav> element)
    const navMatch = indexHtml.match(/<nav class="w-full flex items-center justify-between px-8 py-6 relative z-30">[\s\S]*?<\/nav>/);
    const mobileNavMatch = indexHtml.match(/<!-- Mobile Menu dropdown -->[\s\S]*?<\/div>\s*<!-- Hero Design Content/);
    
    if (!navMatch || !mobileNavMatch) {
       console.error("Could not find nav headers in index.html");
       return;
    }
    const navSection = navMatch[0];
    const mobileNavSection = mobileNavMatch[0].replace(/\s*<!-- Hero Design Content/, '');


    const files = fs.readdirSync(__dirname).filter(file => file.endsWith('.html') && !excludeFiles.includes(file));

    files.forEach(file => {
        let content = fs.readFileSync(path.join(__dirname, file), 'utf8');
        console.log(`Processing ${file}...`);
        let changed = false;

        // 1. Replace HEAD
        const oldHeadEnd = content.indexOf('</head>');
        if (oldHeadEnd !== -1) {
            content = headSection + content.substring(oldHeadEnd + 7);
            changed = true;
        }

        // 2. Replace BODY Tag
        // Remove old body and replace with standard scrollable body for identical theme (but scrolling enabled)
        // We only want index.html to be locked h-screen overflow-hidden, other pages need to scroll
        const scrollableBodyTag = '<body class="relative min-h-screen w-full font-sans bg-slate-50">';
        content = content.replace(/<body[^>]*>/, scrollableBodyTag);
        
        // 3. Replace Ambient Background
        // First, looking for old ambient bg
        const oldAmbientMatch = content.match(/<!-- Ambient Background(.*?)-->[\s\S]*?<\/div>(\s*<!-- Main Content wrapper)?/);
        if (oldAmbientMatch) {
            content = content.replace(oldAmbientMatch[0], ambientBg);
            changed = true;
        } else {
             // Just inject it after body as a fallback
             content = content.replace(scrollableBodyTag, scrollableBodyTag + '\n' + ambientBg);
        }

        // 4. Update the Main wrapper structure to match new centered card logic
        // We want the `<main ...>` and `<div class="glass-hero ...">` to look consistent
        const oldMainMatch = content.match(/<main[^>]*>/);
        if (oldMainMatch) {
            content = content.replace(oldMainMatch[0], '<!-- Main Content wrapper -->\n    <main class="min-h-screen w-full flex flex-col relative z-10 p-4 md:p-8">');
        }
        
        const oldGlassHeroMatch = content.match(/<div class="[^"]*glass-hero[^"]*"[^>]*>/);
        if(oldGlassHeroMatch) {
             content = content.replace(oldGlassHeroMatch[0], '<div class="w-full max-w-7xl mx-auto glass-hero relative flex flex-col min-h-[90vh] rounded-3xl" data-aos="zoom-in" data-aos-duration="1000">');
        }


        // 5. Replace Navbar & Mobile Menu
        const oldNavMatch = content.match(/<nav[^>]*>[\s\S]*?<\/nav>/);
        if (oldNavMatch) {
            // Apply correct active state
            const pageName = file.replace('.html', '').toLowerCase();
            let specificNav = navSection;
            
            // Remove all active classes first
            specificNav = specificNav.replace(/nav-link active/g, 'nav-link');
            
            // Then intelligently try to add it back based on page name
            let navItemRegex = new RegExp(`(<a href="${file}" class="nav-link[^"]*)(">.*?<\/a>)`);
            if(navItemRegex.test(specificNav)) {
                specificNav = specificNav.replace(navItemRegex, '$1 active$2');
            } else {
                 // For nested items in 'More' dropdown, we don't necessarily need 'active' on the parent, but could highlight More if needed.
            }

            content = content.replace(oldNavMatch[0], specificNav);
            changed = true;
        }

        const oldMobileMenuMatch = content.match(/<!-- Mobile Menu dropdown -->[\s\S]*?<\/div>(?=\s*<div|\s*<main|\s*<section)/);
        if (oldMobileMenuMatch) {
             content = content.replace(oldMobileMenuMatch[0], mobileNavSection);
        }

        if(changed) {
            fs.writeFileSync(path.join(__dirname, file), content, 'utf8');
            console.log(`Updated ${file}`);
        }
    });
    
    console.log("Theme application complete!");
}

applyTheme();
