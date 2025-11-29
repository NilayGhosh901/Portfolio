@echo off
echo Adding enhanced styles and animations to all HTML pages...

REM Add enhanced-animations.js after script.js in all HTML files
for %%f in (*.html) do (
    echo Processing %%f...
    powershell -Command "(Get-Content '%%f') -replace '(<script src=\"script.js\"></script>)', '$1`r`n    `r`n    <!-- Enhanced Animations -->`r`n    <script src=\"enhanced-animations.js\"></script>' | Set-Content '%%f'"
)

REM Add enhanced-styles.css before </head> in all HTML files that don't have it
for %%f in (*.html) do (
    findstr /C:"enhanced-styles.css" "%%f" >nul
    if errorlevel 1 (
        echo Adding enhanced styles to %%f...
        powershell -Command "(Get-Content '%%f') -replace '(</style>)', '$1`r`n    `r`n    <!-- Enhanced Styles -->`r`n    <link rel=\"stylesheet\" href=\"enhanced-styles.css\">' | Set-Content '%%f'"
    )
)

echo Done! All pages updated with enhanced styles and animations.
pause
