/*

🔹 What is CI/CD?

CI/CD is a software engineering practice that automates building, testing, and deploying applications to deliver changes faster, safer, and with less manual effort.

CI (Continuous Integration) → Developers frequently merge (integrate) code changes into a shared repository, triggering automated builds and tests.
CD (Continuous Delivery/Deployment) → After successful CI, changes automatically move through release pipelines (staging, UAT, production).

Continuous Delivery: Code is always in a deployable state, but release to production may still require manual approval.
Continuous Deployment: Every change that passes the pipeline is deployed automatically to production.

🔹 Continuous Integration (CI)

Code Commit → Developers push changes to GitHub/GitLab/Bitbucket.
Build Automation → A pipeline (Jenkins, GitHub Actions, GitLab CI, Azure DevOps, CircleCI) compiles and builds the app.
Automated Testing → Unit tests, integration tests, linting, and static analysis (SonarQube, ESLint) run.
Feedback Loop → CI ensures errors are caught early. If tests fail, the pipeline blocks merging.

👉 Example: In an Angular app, pushing code triggers npm install, ng build, ng test, ng lint.


🔹 Continuous Delivery (CD)

Artifact Creation → CI produces deployable artifacts (Docker images, build bundles, .jar, .war, etc.).
Environment Promotion → Deploy automatically to staging/UAT environments for further testing.
Manual Approval Gate → Ops or QA team can approve before going to production.
Rollback Strategy → Versioned artifacts allow reverting if issues occur.

👉 Example: Angular build output (dist/) is packaged, pushed to S3 or an artifact repository, then deployed to staging server.


🔹 Continuous Deployment

Extends Delivery by removing the manual approval step.
Every successful pipeline run → automatically pushed to production.
Requires strong test automation, monitoring, and observability.

👉 Example: A commit merged into main triggers full pipeline → deploys Angular frontend to AWS S3 + CloudFront and backend to Kubernetes.

🔹 Typical CI/CD Pipeline Stages

Source → Code pushed to Git repository.
Build → Install dependencies, compile, bundle code.
Test → Unit tests, integration tests, security scans.
Package → Build Docker image or artifact.
Deploy → Push to staging/prod environments.
Monitor → Check logs, metrics, alerts after deployment.

🔹 Benefits

Faster delivery of features.
Early bug detection.
Consistent, repeatable deployments.
Reduced human error in production releases.
Confidence in scaling teams/projects.

🔹 Tools Commonly Used

CI Tools: GitHub Actions, GitLab CI, Jenkins, CircleCI, Azure DevOps.
CD Tools: ArgoCD, Spinnaker, FluxCD, Octopus Deploy.

Infra/Containerization: Docker, Kubernetes, Terraform, Ansible.
Cloud Deployments: AWS CodePipeline, Azure DevOps, GCP Cloud Build.

✅ Interview Tip (short answer):

“CI/CD is about automating software delivery. CI ensures every commit is built and tested, while CD ensures changes are reliably delivered to environments. Continuous Deployment goes further by automatically deploying every successful build to production.”

*/