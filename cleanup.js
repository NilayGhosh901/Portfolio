const fs = require('fs');
const path = require('path');

const excludeFiles = ['index.html', 'pdf_viewer.html'];
const files = fs.readdirSync(__dirname).filter(file => file.endsWith('.html') && !excludeFiles.includes(file));

files.forEach(file => {
    let content = fs.readFileSync(path.join(__dirname, file), 'utf8');
    let original = content;

    // Clean up duplicated closing ambient-shape-2 and bg-waves left over from the old theme
    content = content.replace(/<\/div>\s*<div class="ambient-shape-2"><\/div>\s*<svg class="bg-waves"[\s\S]*?<\/svg>\s*<\/div>/, '</div>');
    
    // Clean up duplicated closing div pairs from where the main wrapping might have gotten tangled
    /* 
    432:         </div>
    433:             </div>
    434:         </div>
    435:     </main>
    */
    content = content.replace(/<\/div>\s*<\/div>\s*<\/div>\s*<\/main>/, '</div>\n        </div>\n    </main>');

    if(content !== original) {
        fs.writeFileSync(path.join(__dirname, file), content, 'utf8');
        console.log(`Cleaned up ${file}`);
    }
});
