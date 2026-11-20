# 🖥️ Sam Ranjith Paul — Terminal Portfolio

A terminal-inspired developer portfolio with ASCII art, CRT effects, glitch animations, and a fully functional contact system powered by EmailJS.

Built to feel like a real command-line interface — minimal, dark, fast, and expressive.

## Project info

**Live site** [sam-terminal.vercel.app](https://sam-terminal.vercel.app/)

[Run locally](#run-the-site-on-your-computer) · [Deploy](#deploy-to-vercel) · [Fix common errors](#fix-common-errors)

## ✨ Features

- 🧠 Terminal-style UI (commands, prompts, file outputs)
- 🕷️ ASCII Spider Hero with subtle glitch / shake animation
- 📟 CRT scanline + ambient glitch effects
- 📱 Mobile-first responsive layout (tight spacing, no bloat)
- 📩 Working Contact Form using EmailJS
- 🌑 Dark-only email template (terminal-styled inbox message)
- ⚡ Vite frontend on Vercel, with Supabase Edge Functions for GitHub data

## 🛠️ What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- HTML5
- CSS3 (terminal + CRT effects)
- EmailJS
- Supabase
- Tailwind CSS

**Design Style:**
- Terminal / CLI
- Cyber green on black
- ASCII art
- Retro CRT aesthetics

## 📂 Commands Available
```bash
$ help           # Show available commands
$ about          # About me
$ skills         # Technical skills
$ projects       # Project portfolio
$ contact --info # Contact information
$ cat resume.pdf # Download resume
```

## Run the site on your computer

1. Install Git and a supported version of Node.js with npm. On macOS, press **Command + Space**, search for **Terminal**, and open it.
2. Run these commands one at a time. If you already cloned the repo, open that folder in Terminal and skip the clone command.

   ```bash
   git clone https://github.com/samranjithpaul/sam-terminal-portfolio.git
   cd sam-terminal-portfolio
   npm ci
   ```

3. In the folder beside `package.json`, create a file named `.env.local` and fill in the values below. Copy the URL and publishable key from the **same** Supabase project. In Supabase, open **Settings → API Keys** for the publishable key. The project URL is on the project overview. Set up EmailJS if you want to send messages from the contact form.

   ```dotenv
   VITE_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
   VITE_SUPABASE_PUBLISHABLE_KEY=YOUR_SUPABASE_PUBLISHABLE_KEY
   VITE_EMAILJS_SERVICE_ID=YOUR_EMAILJS_SERVICE_ID
   VITE_EMAILJS_TEMPLATE_ID=YOUR_EMAILJS_TEMPLATE_ID
   VITE_EMAILJS_PUBLIC_KEY=YOUR_EMAILJS_PUBLIC_KEY
   ```

4. Run `npm run dev` and open the address printed in Terminal. Run `npm run build` to check the production build. If you edit `.env.local` while the dev server is running, stop it with **Control + C** and start it again.

   The browser can read `VITE_*` values. Use the Supabase **publishable** key there. Keep your database password, Supabase secret key, GitHub token, and CLI login codes out of the frontend and GitHub.

## Set up the Supabase functions

The Projects page loads up to eight public repositories starred by `samranjithpaul` through `github-starred`. The Skills page uses `github-languages`. The repo deploys both functions from the `supabase/functions/` folder.

1. Open the [Supabase dashboard](https://supabase.com/dashboard). Open a healthy project or create a new one and wait for **Healthy**.
2. Copy its project ref. This is the part before `.supabase.co` in its Project URL. Use that ref explicitly in the deploy commands. The checked-in `supabase/config.toml` still lists an older ref.
3. In the local portfolio folder, pull the latest code with `git pull --ff-only`. Then run the commands below one at a time. Replace `YOUR_PROJECT_REF` with the ref you just copied. Complete the browser login and confirm the target when the CLI asks.

   ```bash
   npx supabase login
   npx supabase functions deploy github-starred --remote=YOUR_PROJECT_REF
   npx supabase functions deploy github-languages --remote=YOUR_PROJECT_REF
   ```

4. In Supabase, open **Edge Functions** and check that both names are listed. The CLI can show a Docker warning and still deploy successfully. Look for the final **Deployed Functions** message.
5. The functions can make public GitHub requests without a token. If you use a token for authenticated requests, add it as `GITHUB_TOKEN` under **Supabase → Edge Functions → Secrets**.

[Supabase deployment guide](https://supabase.com/docs/guides/functions/deploy) · [Edge Function secrets](https://supabase.com/docs/guides/functions/secrets)

## 📬 Contact Form Setup (EmailJS)

The contact form sends a terminal-themed email that looks like a CLI message inside the inbox.

1. Open the [EmailJS dashboard](https://dashboard.emailjs.com/) and create an email service.
2. Create a template using the three variables below.
3. Copy the service ID, template ID, and public key into the matching local or Vercel variables listed above. Redeploy if you changed them in Vercel.
4. Open the Contact page and send yourself a test message.

### EmailJS Template Variables
```
{{from_name}}
{{reply_to}}
{{message}}
```

The email template is fully dark, mobile-safe, and styled to match the portfolio UI.

## 📱 Mobile Optimization

- No unnecessary vertical gaps
- Terminal-density spacing
- Content stacks as one unit (ASCII → Name → Role → Commands)
- No forced widths (iOS-safe email rendering)

## 🎨 Design Philosophy

> "If it doesn't feel like a terminal, it doesn't belong."

- No gradients
- No bright whites
- No oversized UI
- Motion only when meaningful
- ASCII > SVG

## Deploy to Vercel

1. Open the Vercel project that lists [sam-terminal.vercel.app](https://sam-terminal.vercel.app/) under **Domains**. That project is named `sam-terminal`. The similarly named `sam-terminal-portfolio` project serves a different domain.
2. Under **Settings → Environment Variables**, set `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` for **Production**. Take both values from the healthy Supabase project where you deployed the functions. If an existing variable is shared with Preview or Development, check its targets before editing it. Add the three EmailJS variables from the local setup if you use the contact form.
3. Open **Deployments**, choose the latest production deployment, and choose **Redeploy** from its menu. Environment variable changes take effect in the next build. For a new Vercel project, first import this repository and choose **Vite**.
4. Wait for **Ready**. Open [Projects](https://sam-terminal.vercel.app/projects) directly and refresh. Look for repository cards. Open [Skills](https://sam-terminal.vercel.app/skills) and check that language data loads.

[Managing Vercel environment variables](https://vercel.com/docs/environment-variables/managing-environment-variables)

## Fix common errors

Start with the row that matches what you see.

| What you see | Start here |
| --- | --- |
| A full-page **404 NOT_FOUND** when opening or refreshing `/projects` | [Fix the Vercel route](#fix-a-404-on-refresh) |
| The terminal loads and says **Failed to send a request to the Edge Function** | [Check the Supabase connection](#fix-an-edge-function-connection-error) |
| The terminal says **Edge Function returned a non-2xx status code** | [Read the function logs](#fix-a-function-that-returns-an-error) |
| Supabase says **Paused** or **Restoration in progress** | [Restore or replace the project](#handle-a-paused-or-restoring-project) |
| The page loads, but a new GitHub repo is missing | [Check which repositories are listed](#a-new-github-repo-is-missing) |

### Fix a 404 on refresh

1. Try the homepage, then click **Show Projects**. If that works but refreshing fails, check that the root [vercel.json](vercel.json) file is in the commit Vercel deployed.
2. The file rewrites requests to `/index.html` so React Router can open the requested page. Restore it from Git if it was removed, then deploy that commit.
3. Test by opening `/projects` in a new tab and refreshing. Seeing the portfolio terminal means the route is loading. If a message inside it mentions an Edge Function, follow the next section.

[Vite routing on Vercel](https://vercel.com/docs/frameworks/frontend/vite#using-vite-to-make-spas)

### Fix an Edge Function connection error

1. Open the live portfolio. Open Chrome DevTools with **Command + Option + I** on Mac or **Ctrl + Shift + I** on Windows.
2. Click **Network**, type `github-starred` in the filter, then click **Retry** on the Projects page. Select the failed request and open **Headers → Request URL**.
3. Compare the hostname before `.supabase.co` with the project ref in your Supabase dashboard. If it differs or you see `ERR_NAME_NOT_RESOLVED`, confirm the intended Supabase project is healthy, then update **both** the URL and the publishable key in Vercel and redeploy using the steps above.
4. Try again. The request should go to the intended hostname. Look for **200** and visible repository cards.

### Fix a function that returns an error

1. In Supabase, open **Edge Functions → github-starred → Invocations** or **Logs**. Use `github-languages` if only Skills is failing.
2. Click **Retry** on the portfolio and open the newest entry. Check the request status and the function log message.

   | What you find | What to do |
   | --- | --- |
   | Supabase **404** or the function is missing | Deploy that function to the ref shown in the live request. Check the dashboard for the function name. |
   | Supabase **401** before the handler runs | Check that the URL and publishable key belong to the same project. Check that the deployed public function uses the repo's `verify_jwt = false` configuration. |
   | Function log says **GitHub API returned 401** | Pull the latest repo and redeploy the function. The updated `github-starred` only sends an authorization header when a token is set. If you set an expired or incorrect `GITHUB_TOKEN`, replace it in Supabase or remove it to use public requests. |
   | GitHub **403** or **429** | Check the GitHub response or logs for a rate limit. If rate limited, wait for the reset before retrying. |
   | GitHub **5xx** | Check [GitHub Status](https://www.githubstatus.com/) and retry after service recovers. |

3. After an Edge Function code change, deploy that function in Supabase and retry on the live site. Redeploy Vercel when you change frontend code or its build environment variables.

### Handle a paused or restoring project

1. Confirm the project ref matches the failed request in DevTools. Open that project in Supabase and click **Resume project** if it is paused.
2. Wait for **Healthy**, then retry the portfolio. Supabase runs the restoration on its servers, so you can close your browser while it runs.
3. If the dashboard says the restore is taking longer than usual and the message persists, use **Contact support**. Include the affected project ref, when you started the restore, and a screenshot of the message.
4. If you need the portfolio online while the restore runs, create a fresh project, deploy both functions, switch the two Vercel variables, and verify the live site. Keep the old project if you need to recover its database or storage data later.

[Supabase project pausing and restoration](https://supabase.com/docs/guides/platform/free-project-pausing)

### A new GitHub repo is missing

The page lists up to eight public starred repositories. To include a new public repo in that list, star it while signed in as `samranjithpaul`, allow up to five minutes for the function cache, then click **Refresh** on the Projects page. To list newly created public repos automatically, change the GitHub endpoint and the Projects labels together. See [GitHub's repository listing docs](https://docs.github.com/en/rest/repos/repos#list-repositories-for-a-user).

## 📸 Preview

Live preview recommended on both desktop + mobile for full effect.

## 📜 License

MIT License — Feel free to fork, remix, and customize — just don't remove the soul.

## 👤 Author

**Sam Ranjith Paul**  
Software / Web Developer

- GitHub: [@samranjithpaul](https://github.com/samranjithpaul)
- LinkedIn: [/samranjithpaul](https://linkedin.com/in/samranjithpaul)
- Portfolio: [samranjithpaul.dev](https://sam-terminal.vercel.app/)

---

Made with 💚 and terminal aesthetics
