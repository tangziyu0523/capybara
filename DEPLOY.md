# Deployment Guide

This guide explains how to push your code to GitHub (`capybara` repository) and deploy the frontend to Tencent Cloud (or any Docker-compatible environment).

## 1. Push Code to GitHub

First, create a new repository named `capybara` on your GitHub account.

Then, run the following commands in your terminal (at the project root):

```bash
# Add your remote repository (Replace <YOUR_GITHUB_USERNAME> with your actual username)
git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/capybara.git

# Create a first commit
git commit -m "Initial commit: Million Cubic City project structure"

# Push to the main branch
git branch -M main
git push -u origin main
```

## 2. Build Docker Image (Local or Cloud)

To build the frontend image:

```bash
cd million-cubic-city
docker build -t capybara-frontend .
```

## 3. Deploy to Tencent Cloud

### Option A: Using Tencent Container Registry (TCR) + Lighthouse/CVM

1.  **Log in to TCR**:
    ```bash
    docker login ccr.ccs.tencentyun.com
    ```
2.  **Tag your image**:
    ```bash
    docker tag capybara-frontend ccr.ccs.tencentyun.com/<YOUR_NAMESPACE>/capybara-frontend:latest
    ```
3.  **Push the image**:
    ```bash
    docker push ccr.ccs.tencentyun.com/<YOUR_NAMESPACE>/capybara-frontend:latest
    ```
4.  **On your Tencent Cloud Server**:
    ```bash
    docker pull ccr.ccs.tencentyun.com/<YOUR_NAMESPACE>/capybara-frontend:latest
    docker run -d -p 80:80 --name capybara-web ccr.ccs.tencentyun.com/<YOUR_NAMESPACE>/capybara-frontend:latest
    ```

### Option B: Manual File Upload (Simpler for first time)

1.  Build the project locally:
    ```bash
    cd million-cubic-city
    npm run build
    ```
2.  Upload the `dist` folder to your server (e.g., using SCP or FileZilla).
3.  Configure Nginx on the server to point to the uploaded folder (use the provided `nginx.conf` as a reference).
