# Github Notes

### Repository creation
```bash
git init
git add .
git commit -c "initial commit"
git branch -M main
git remote add origin git@github.com:dwalbeck/personal_main.git
git push -u origin main

git subtree add --prefix personal_api git@github.com:dwalbeck/personal_api.git main --squash
git subtree add --prefix personal_site git@github.com:dwalbeck/personal_site.git main --squash
```

### Pull changes from subtree remote
```bash
git subtree pull --prefix personal_api git@github.com:dwalbeck/personal_api.git main --squash
git subtree pull --prefix personal_site git@github.com:dwalbeck/personal_site.git main --squash

```

### Push changes back to the subtree remote
```bash
git subtree push --prefix personal_api git@github.com:dwalbeck/personal_api.git main
git subtree push --prefix personal_site git@github.com:dwalbeck/personal_site.git main 

```