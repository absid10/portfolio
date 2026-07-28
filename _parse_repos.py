import json

data = open(r'C:\Users\Abdullah\.gemini\antigravity-ide\brain\62342785-43b9-4f88-afa5-5b26ff34b4df\.system_generated\steps\45\content.md', encoding='utf-8').read()
idx = data.index('[{')
repos = json.loads(data[idx:])
for r in repos:
    name = r["name"]
    lang = r["language"]
    stars = r["stargazers_count"]
    size = r["size"]
    homepage = r.get("homepage", "")
    desc = (r.get("description") or "")[:120]
    created = r["created_at"][:10]
    print(f"{name} | {lang} | Stars:{stars} | Size:{size}KB | Live:{homepage} | Created:{created} | {desc}")
