# AI Restaurant Reviewer

A lightweight Next.js + React prototype that generates AI-powered restaurant reviews using the Gemini API. Pretty simple and convenient to use for quickly getting insights about certain restaurants.

**Features**
- Select a sample restaurant (or paste restaurant data)
- Generate a friendly, structured review (pros/cons, recommended dishes, rating)
- Minimal, mobile-first UI using Tailwind CSS
- Gemini API integration for LLM-generated content

---

## Quick start (local)

1. Clone repo
```bash
git clone <repo-url>
cd ai-restaurant-review
```

2. Install dependencies
```bash
npm install
# or
# pnpm install
# yarn install
```

3. Create enviornment variables
Create a ``.env`` file in the project root with server-side API key (do not commit):
```env
GEMINI_API_KEY=sk-REPLACE_WITH_YOUR_KEY
```
**Important:** Keep the API key server-side. Use ``process.env.GEMINI_API_KEY`` in Next.js API routes. Do **not** use ``NEXT_PUBLIC_`` for secret keys.

4. Run locally
```bash
npm run dev
# opens at http://localhost:3000
```


## Deployment (Vercel)
1. Push to GitHub
2. Import the repo into Vercel
3. In Vercel project settings -> Environment Variables, add:
- GEMINI_API_KEY = *your API key*
4. Deploy.


## Gemini API notes
- The ``app/api/review`` route calls the Gemini API. Replace the placeholder endpoint/parameters in the API route with the official Gemini endpoint and request format you have access to.
- Parse the model response into a structured review before returning it to the client.


**Example prompt used**
```diff
Generate a detailed restaurant review for {name}, located in {location}, serving {cuisine}. Include:
- Pros and cons
- Recommended dishes
- Overall rating (out of 5)
- Tone: informative and friendly
```


## Project structure
```bash
/app
  /api
    review.js        # API route that calls Gemini
  page.jsx          # Main page (client)
 /components
  ReviewCard.jsx
  SearchForm.jsx
/public
  (static assets)
.env.local
.nextignore
README.md
package.json
tailwind.config.js
```


## Scripts
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```


## Security & costs
- Keep API keys secret. Do not commit ``.env``.
- LLM usage may incur costs - consider token limits (max tokens) and caching for repeated queries.