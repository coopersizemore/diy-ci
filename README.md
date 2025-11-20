# Instructions

This is a basic React app. Create some CI for it using [GitHub Actions](https://docs.github.com/en/actions/how-tos/write-workflows) that does the following whenever a) main is pushed to, or b) a PR is opened into main:

1. Checks out the repository
2. Ensures that the code compiles (npm run build)
3. Runs tests (npm run test)
4. Verifies that the code is formatted correctly (npm run check)

(and fails if any of the above steps fails)

Bonus: set up automated deploys to [GitHub Pages](https://vite.dev/guide/static-deploy).

Instructions for how to fork a repository can be found [here](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo).
