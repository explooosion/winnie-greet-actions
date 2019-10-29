# Winnie Greet Actions

The cute winnie will greet to the user who created new issue.

## Installtion

Create .github/worlflows/main.yml

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

Have fun ~
