# Cicadan OS - Cloudflare Pages Repository

This repository contains the complete **Cicadan OS** cyberpunk operating system environment configured for direct deployment to **Cloudflare Pages**.

## Repository Structure

cicadan-os/
├── functions/             # Cloudflare Pages Functions (Serverless API Routing)
│   └── api/
│       ├── status.js      # Serverless GET endpoint (/api/status)
│       └── decrypt.js     # Serverless POST endpoint (/api/decrypt)
├── tasks/                 # Task data JSON files
│   ├── task1.json
│   └── task2.json
├── images/                # Asset storage folder
│   └── wallpaper.jpg
├── scripts/               # Modular JavaScript utilities
├── index.html             # Cicadan OS single-file application
├── wrangler.toml          # Cloudflare Pages configuration
└── README.md              # Setup and deployment documentation
