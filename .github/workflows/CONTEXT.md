# Workflow Context

`workflows/` contains GitHub Actions stage definitions. `ci-pages.yml` has one primary responsibility: validate the static website remotely and deploy the verified artifact to GitHub Pages from `main`. Inputs are the repository and lockfile; outputs are checks, an artifact, and deployment status. Failure in any validation step blocks deployment. Human review occurs through the pushed commit and workflow result.
