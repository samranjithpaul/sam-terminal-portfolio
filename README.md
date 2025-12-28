# 🖥️ Sam Ranjith Paul — Terminal Portfolio

A terminal-inspired developer portfolio with ASCII art, CRT effects, glitch animations, and a fully functional contact system powered by EmailJS.

Built to feel like a real command-line interface — minimal, dark, fast, and expressive.

## Project info

**URL**: https://your-portfolio-url.com

## ✨ Features

- 🧠 Terminal-style UI (commands, prompts, file outputs)
- 🕷️ ASCII Spider Hero with subtle glitch / shake animation
- 📟 CRT scanline + ambient glitch effects
- 📱 Mobile-first responsive layout (tight spacing, no bloat)
- 📩 Working Contact Form using EmailJS
- 🌑 Dark-only email template (terminal-styled inbox message)
- ⚡ No backend required

## 🛠️ What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- HTML5
- CSS3 (terminal + CRT effects)
- EmailJS
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

## 🚀 How can I edit this code?

There are several ways of editing your application.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:
```sh
# Step 1: Clone the repository using the project's Git URL.
git clone https://github.com/your-username/terminal-portfolio.git

# Step 2: Navigate to the project directory.
cd terminal-portfolio

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## 📬 Contact Form Setup (EmailJS)

The contact form sends a terminal-themed email that looks like a CLI message inside the inbox.

### Environment Variables

Create a `.env` file in the root directory:
```env
VITE_EMAILJS_SERVICE_ID=service_xxx
VITE_EMAILJS_TEMPLATE_ID=template_xxx
VITE_EMAILJS_PUBLIC_KEY=xxxx
```

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

## 🚀 How can I deploy this project?

### Deploy to Vercel
```bash
npm run build
# Then connect your repository to Vercel
```

### Deploy to Netlify
```bash
npm run build
# Then drag and drop the dist folder to Netlify
```

### Deploy to GitHub Pages

Add to `vite.config.ts`:
```typescript
base: '/your-repo-name/'
```

Then run:
```bash
npm run build
# Push the dist folder to gh-pages branch
```

## 📸 Preview

Live preview recommended on both desktop + mobile for full effect.

## 📜 License

MIT License — Feel free to fork, remix, and customize — just don't remove the soul.

## 👤 Author

**Sam Ranjith Paul**  
Software / Web Developer

- GitHub: [@samranjithpaul](https://github.com/samranjithpaul)
- LinkedIn: [/samranjithpaul](https://linkedin.com/in/samranjithpaul)
- Portfolio: [samranjithpaul.dev](https://samranjithpaul.dev)

---

Made with 💚 and terminal aesthetics
Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
