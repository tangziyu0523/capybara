# Configure Tencent Cloud Deployment

## Summary
Prepare the project for deployment to Tencent Cloud (or any container-based cloud provider). This involves containerizing the frontend application (`million-cubic-city`) using Docker and Nginx, and establishing a Git workflow for the repository `capybara`.

## Requirements
1.  **Containerization**:
    *   Create a `Dockerfile` for the `million-cubic-city` frontend.
    *   Use multi-stage build: Build React app -> Serve with Nginx.
    *   Create `nginx.conf` for proper routing (SPA support).

2.  **Git Repository Setup**:
    *   Initialize Git repository at the workspace root.
    *   Configure `.gitignore` to exclude build artifacts and environment files.
    *   Provide instructions for pushing to GitHub remote `capybara`.

3.  **Deployment Documentation**:
    *   Add a `DEPLOY.md` guide explaining how to build and run the docker container.
