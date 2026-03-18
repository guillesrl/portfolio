# GitHub Portfolio Website

A minimalist, responsive portfolio website that automatically displays all public GitHub repositories with project details, preview images, and tech stack information.

## Features

- **Automatic Updates**: Fetches repository data directly from GitHub API
- **Preview Images**: Attempts to extract screenshots from README files and repository contents, falls back to styled placeholders with project initials
- **Tech Stack Display**: Shows programming language and repository topics
- **Filter & Sort**: Search projects by name, description, language, or topics. Sort by recent, stars, or name.
- **Responsive Design**: Mobile-first layout that adapts to all screen sizes
- **Dark Mode**: Automatically adapts to system color scheme preference
- **No Build Tools**: Plain HTML, CSS, and JavaScript - works in any browser
- **Comprehensive Image Scanning**: Scans all repositories for images (not limited to recent ones)

## Setup

### 1. Clone or Download

```bash
# If using git
git clone <your-repo-url>
cd portfolio

# Or just copy the files to your desired directory
```

### 2. Configure GitHub Token (Optional but Recommended)

To increase API rate limits from 60 to 5000 requests per hour:

1. Create a GitHub personal access token:
   - Go to https://github.com/settings/tokens
   - Click "Generate new token" → "Fine-grained tokens" or "Personal access tokens"
   - Select scope: `public_repo` (for public repositories only)
   - Copy the generated token

2. Create your configuration file:

```bash
cp config.example.js config.js
```

3. Edit `config.js` and replace the empty token with your GitHub token:

```javascript
const GITHUB_TOKEN = 'ghp_your_token_here';
const GITHUB_USERNAME = 'guillesrl'; // Change to your username
```

**Important**: `config.js` is already listed in `.gitignore` to prevent accidentally committing your token.

### 3. Update Username

If you're forking this for your own use, update `GITHUB_USERNAME` in `config.js` to your GitHub username.

The default in both `config.js` and `config.example.js` is set to `'guillesrl'`.

## Local Development

### Using Python (Built-in)

```bash
# Python 3
python3 -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

Then open: http://localhost:8000

### Using Node.js (http-server)

```bash
npx http-server -p 8000
```

### Using VS Code

Install the "Live Server" extension, right-click on `index.html`, and choose "Open with Live Server".

## Deployment

### GitHub Pages (Recommended)

1. Push your portfolio to a GitHub repository (ensure `config.js` is not committed).

2. Go to your repository Settings → Pages

3. Under "Build and deployment":
   - Source: Select "Deploy from a branch"
   - Branch: Select `main` (or your default branch) and `/ (root)`
   - Click "Save"

4. Your site will be published at: `https://<your-username>.github.io/<your-repo-name>/`

**Note**: For a user/organization site (username.github.io), select the `gh-pages` branch or root of the `main` branch of your `<username>.github.io` repository.

### Other Static Hosts

This site works on any static hosting service:

- **Netlify**: Drag and drop the folder or connect your Git repo
- **Vercel**: `vercel` command or dashboard deployment
- **Cloudflare Pages**: Connect Git repo or direct upload
- **AWS S3 + CloudFront**: Upload files and configure static hosting
- **Any web server**: Simply upload all files (except config.js which is local-only)

## File Structure

```
portfolio/
├── index.html          # Main HTML structure
├── styles.css          # All styling with CSS variables
├── script.js           # GitHub API integration and rendering logic
├── config.js           # Your GitHub token and username (gitignored)
├── config.example.js   # Configuration template (committed)
├── .gitignore          # Ignores config.js and other temp files
└── README.md           # This file
```

## How It Works

1. On page load, `script.js` reads configuration from `config.js` (fallback to defaults)
2. Fetches public repositories from GitHub API: `GET /users/{username}/repos`
3. For **all repositories**, fetches README content and scans root directory to extract preview images
4. Processes and sorts repositories based on user selection
5. Renders responsive project cards with:
   - Project name and description
   - Preview image (from README, repository files, or placeholder with initials)
   - Tech stack tags (language + topics)
   - Stats: stars and last updated date
   - Links: "View Code" (GitHub) and "Live Demo" (if homepage URL exists)
6. Provides real-time search and sorting

## Customization

### Colors

Edit CSS variables in `styles.css`:

```css
:root {
    --color-accent: #0969da;        /* Primary accent color */
    --color-accent-hover: #0550ae;  /* Hover color */
    /* ... other variables */
}
```

### Layout

- Grid columns are responsive (1 mobile, 2 tablet, 3+ desktop)
- Adjust `grid-template-columns` in `.projects-grid` to change

### Content Display

Modify `createProjectCard()` function in `script.js` to show/hide:
- Topics (remove `topicBadges`)
- Language badge (remove `languageBadge`)
- Stats (stars, date)
- Repository forks count (add `repo.forks_count`)

## API Rate Limits

- **Unauthenticated**: 60 requests per hour per IP
- **Authenticated**: 5000 requests per hour per token

The app makes:
- 1 request to fetch repositories list (all repos in one call with `per_page=100`)
- 2 additional requests per repository (README + contents check) for image extraction

Total: 1 + (2 × number_of_repos) requests on first load. With 10 repositories: ~21 requests.
Subsequent navigation/search uses cached data.

### Rate Limit Tips

1. Use a GitHub token (recommended)
2. Repository data is cached in memory during the session - no repeated API calls
3. Images are lazy-loaded
4. If you have >100 repositories, consider reducing `PER_PAGE` or implementing pagination

## Troubleshooting

### "Failed to load repositories" error

- Check browser console for details
- If rate limited: Either wait for rate limit to reset or add a GitHub token
- If 404: Verify `GITHUB_USERNAME` is correct and the account exists
- If CORS: GitHub API supports CORS; this should not happen

### Preview images not showing

- README must contain an `<img>` tag with a full URL (not relative path)
- Images in README should be hosted externally (GitHub works if using raw links)
- The first image in the README is used (skipping avatars, badges, icons)
- If no suitable image is found, a placeholder with project initials appears

### Site not updating after repository changes

- GitHub API data is live - refresh the page to fetch latest
- Browser cache might serve old CSS/JS: hard refresh (Cmd+Shift+R or Ctrl+F5)

## License

This portfolio template is provided as-is. Feel free to use and modify for your own portfolio.

---

Built with vanilla HTML, CSS, and JavaScript. No frameworks, no build tools.
