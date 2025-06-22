/*

✅ CI (Continuous Integration)
“Continuous Integration is the practice of automatically building and testing code every time a developer pushes changes to a shared repository.”

The goal is to catch bugs early by integrating code frequently.

It runs unit tests, linters, and build processes on each commit or PR.

Ensures that the app is always in a deployable state.

Tools commonly used: Jenkins, GitHub Actions, GitLab CI, CircleCI.

“For example, in my current Angular project, every pull request triggers a CI pipeline that builds the app, runs unit tests using Jasmine/Karma, and checks for accessibility and security issues using tools like Checkmarx.”



✅ CD (Continuous Delivery / Deployment)
“Continuous Delivery is about automatically delivering validated code to a staging or production environment. Continuous Deployment takes it a step further by actually pushing changes to production without manual approval.”

After CI passes, CD takes over to package the app and deploy it to servers or cloud platforms.

Ensures frequent, reliable, and low-risk releases.

You can deploy on every commit, daily, or on demand.

Common tools: Jenkins, GitHub Actions, ArgoCD, AWS CodePipeline.

“In my experience, once a PR is merged, CD builds the Angular app, pushes it to our S3/CloudFront or web server, and notifies QA automatically. We’ve streamlined the release pipeline so we can push updates multiple times a day with confidence.”

🔁 Summary:
“CI ensures the code is clean and working. CD ensures that it’s ready and smoothly delivered to users. Together, they let teams move fast without breaking things.”


*/