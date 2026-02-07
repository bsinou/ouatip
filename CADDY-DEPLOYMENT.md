# Caddy Deployment Guide

Client-side authentication has been removed. The app is now protected by Caddy basic authentication.

## Build

```bash
npm install
npm run build
```

This creates `dist/` folder with all static files.

## Deploy to Server

Upload the built files to your server:

```bash
# Upload dist contents to server
scp -r dist/* user@yourserver:/var/www/ouatip/
```

Or use rsync:

```bash
rsync -avz --delete dist/ user@yourserver:/var/www/ouatip/
```

## Caddy Configuration

Your Caddy configuration should handle basic auth. Example:

```caddy
yourdomain.com {
    root * /var/www/ouatip

    basicauth * {
        username hashedpassword
    }

    try_files {path} /index.html
    file_server
    encode gzip
}
```

## Notes

- ✅ Client-side auth removed (was insecure)
- ✅ All authentication handled by Caddy
- ✅ Single app deployment at `/var/www/ouatip`
- ✅ No environment variables needed
- ✅ No password in JavaScript

## Update Workflow

1. Make changes to source code
2. Run `npm run build`
3. Upload `dist/*` to `/var/www/ouatip/`
4. Done! (No server restart needed)
