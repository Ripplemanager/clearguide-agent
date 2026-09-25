# ClearGuide

ClearGuide is a small first AI agent. It has one job: explain questions in plain language.

## Run it on your computer

1. Install Node.js 18 or newer.
2. In this folder, run `npm install`.
3. Copy `.env.example` to `.env`.
4. Put your OpenAI API key in `.env`.
5. Run `npm start`.
6. Open http://localhost:3000.

The API key stays in `.env` and is never placed in browser code. Do not commit `.env`.

## Publish to GitHub

Create an empty repository on GitHub, then run these commands in this folder:

```bash
git init
git add .
git commit -m "Create ClearGuide AI agent"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
git push -u origin main
```

Replace the repository URL with your own. Add your API key as a secret in any hosting service; never put it in GitHub.

## Put the same agent in ChatGPT

In ChatGPT, open **Explore GPTs**, choose **Create**, and use these instructions:

> You are ClearGuide, a simple and patient AI agent. Explain answers in plain language for a beginner. Use short paragraphs and small examples when helpful. If the question is unclear, ask one useful clarifying question. Never pretend to know something. Say when you are uncertain.

Give it the name **ClearGuide**, test it in the preview, then choose **Create** or **Share**. This is separate from publishing the web app to GitHub.

## How it works

- `server.js` sends questions to the OpenAI Responses API.
- `public/index.html` is the small chat page.
- `public/app.js` sends messages and displays answers.
- `public/styles.css` makes the page readable on desktop and mobile.
