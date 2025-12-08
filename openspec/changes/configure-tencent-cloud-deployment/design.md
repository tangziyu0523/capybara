# Design: Deployment Architecture

## Docker Strategy
We will use a standard 2-stage Docker build for React/Vite applications.

### Stage 1: Build
- Base Image: `node:18-alpine` (Lightweight)
- Action: `npm install` -> `npm run build`
- Output: `dist/` folder

### Stage 2: Serve
- Base Image: `nginx:alpine`
- Action: Copy `dist/` from Stage 1 to `/usr/share/nginx/html`.
- Configuration: Custom `nginx.conf` to handle `React Router` history mode (redirect 404 to index.html).

## Repository Structure
The git root will be `/Users/tangziyu/Desktop/百万立方+Trea/`.
We need a root `.gitignore` that covers all subprojects.

## Tencent Cloud
For Tencent Cloud (CVM or Lighthouse or TKE), the standard artifact is a Docker Image.
Users can:
1.  Push code to GitHub.
2.  Use GitHub Actions (optional future step) or manual build to push Docker image to Tencent Container Registry (TCR).
3.  Deploy image.

For this proposal, we focus on *local preparation*: Dockerfile + Git setup.
