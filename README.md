# yarn-workspace-isolator

## What it does

This script isolates a single workspace by

* Making a copy of the workspace to some `new-folder/`
* Placing a copy for each needed workspace dependency into `new-folder/node_modules/{workspace-dependency}`
* Rewriting the version of each workspace dependency to `file:new-folder/node_modules/{workspace-dependency}`

Now you can simply run `yarn install` inside of `new-folder/` and yarn will install all dependencies as if you had not
used workspaces at all without having to publish any workspace dependency.

## Example usage

```
npm install -g yarn-workspace-isolator
cd my-project-using-yarn-workspaces
isolate-workspace -w my-package-name -o ~/new-folder
```

Note: This needs `yarn@>=1.50`!
