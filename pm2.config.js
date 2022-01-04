module.exports = {
  apps: [
    {
      name: 'Remix',
      script: 'remix watch',
      autorestart: false,
      ignore_watch: ['.'],
      env: {
        NODE_ENV: 'development',
      },
    },
    {
      name: 'Miniflare',
      script: 'npm run start',
      autorestart: false,
      ignore_watch: ['.'],
      watch_options: {
        followSymlinks: false,
      },
      env: {
        NODE_ENV: 'development',
      },
    },
    {
      name: 'Tailwind CSS',
      script: 'npm run css:watch',
      autorestart: false,
      ignore_watch: ['.'],
      env: {
        NODE_ENV: 'development',
      },
    },
    {
      name: 'Content',
      script: 'npm run content:watch',
      autorestart: false,
      ignore_watch: ['.'],
      env: {
        NODE_ENV: 'development',
      },
    },
  ],
}
