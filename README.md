# Winnie Greet Actions

The cute winnie will greet to the user who created new issue with simplified.

## Testing

Create the new issue, and wait for Actions.

👉 Create Issues: [winnie-greet-actions-test](https://github.com/explooosion/winnie-greet-actions-test/issues)

👉 Wait Actions: [winnie-greet-actions-test/actions](https://github.com/explooosion/winnie-greet-actions-test/actions)

## Installtion

1. Create new [personal access token](https://github.com/settings/tokens).

2. Scopes: checked all repo.

3. Add `ACCESS_TOKEN` secret from settings .

2. Create `.github/workflows/main.yml` in your repo.

```yml
name: Commit Issue Commenter

on: 
  issues:
    types: opened

jobs:
  checkIssue:
    name: Comment From New Issue
    runs-on: ubuntu-latest
    steps:
      - name: Use Winnie Greet Actions
        uses: explooosion/winnie-greet-actions@master
        env:
          ACCESS_TOKEN: ${{ secrets.ACCESS_TOKEN }}
```
