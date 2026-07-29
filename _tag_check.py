import re

for fname in ['index.html', 'projects.html']:
    with open(fname, encoding='utf-8') as f:
        content = f.read()
    print(f"\n--- {fname} ---")
    for tag in ['div', 'ul', 'li', 'button', 'section', 'nav', 'header', 'footer', 'article']:
        opens = len(re.findall(rf'<{tag}[\s>]', content, re.I))
        closes = len(re.findall(rf'</{tag}>', content, re.I))
        status = "OK" if opens == closes else "MISMATCH"
        print(f"{tag:10s}: opens={opens:<4d} closes={closes:<4d} -> {status}")

    style = re.search(r'<style[^>]*>(.*?)</style>', content, re.DOTALL)
    if style:
        css = style.group(1)
        o = css.count('{')
        c = css.count('}')
        print(f"CSS Braces : opens={o:<4d} closes={c:<4d} -> {'OK' if o == c else 'MISMATCH'}")
