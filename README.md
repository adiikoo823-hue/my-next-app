# Octo GitHub sign-in

This Next.js app uses Auth.js (NextAuth.js) to sign users in with GitHub.

## Configure GitHub OAuth

Create an OAuth App in **GitHub Settings → Developer settings → OAuth Apps**. Set the authorization callback URL to:

```text
http://localhost:3000/api/auth/callback/github
```

Create `.env.local` in the project root with the OAuth app credentials and a session secret:

```text
GITHUB_ID=your-github-oauth-client-id
GITHUB_SECRET=your-github-oauth-client-secret
NEXTAUTH_SECRET=your-generated-secret
NEXTAUTH_URL=http://localhost:3000
```

Generate a session secret with:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Keep `.env.local` private; it is ignored by Git.
In development only, if `NEXTAUTH_SECRET` is omitted, the app uses an ephemeral random secret; sessions will not survive a server restart. Always set a persistent secret in production.

## Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and choose **Continue with GitHub**. For deployment, configure these environment variables in the hosting provider and add the production callback URL to the GitHub OAuth App.
