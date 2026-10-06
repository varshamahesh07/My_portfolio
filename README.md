# Varsha Mahesh: Portfolio Website

Plain HTML, CSS and JavaScript. No build step, no installs.

## Folder structure
```
varsha-portfolio/
  index.html
  css/style.css
  js/main.js
  assets/
    favicon.svg
    Varsha_Mahesh_Resume.pdf
```

## Preview locally
Double-click `index.html`, or run `python3 -m http.server` in this folder and open http://localhost:8000.

## Deploy (free)
- **Netlify**: go to app.netlify.com/drop and drag this whole folder in.
- **GitHub Pages**: push the folder contents to a repo, then Settings > Pages > Deploy from branch (main, root).
- **Vercel**: `vercel` in this folder, or import the repo.

## Things to update later
- **Resume**: replace `assets/Varsha_Mahesh_Resume.pdf` (keep the same file name).
- **Project links**: in `index.html`, add a link inside each project, for example:
  `<a class="text-link" href="https://github.com/varshamahesh07/REPO-NAME" target="_blank" rel="noopener">View code</a>`
- **CivicFix**: when you have a live demo, add its link and change the "In progress" badge.
- **CGPA**: appears in the hero title block and the Education timeline.
- **Page link preview**: after deploying, add `<meta property="og:url">` and an `og:image` (1200x630 image) in `<head>`.
- **Phone number**: remove the Phone row in the Contact section if you prefer not to show it publicly.
