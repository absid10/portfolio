import urllib.request
import re
from datetime import datetime

url = 'https://github.com/users/absid10/contributions'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
html = urllib.request.urlopen(req).read().decode('utf-8')

# Extract days: date, level, tooltips if available
# e.g. <td ... data-date="2025-08-01" ... data-level="2" id="contribution-day-component-0-2">...</td>
# <tool-tip ...>3 contributions on August 1, 2025</tool-tip>
pattern = r'data-date="([^"]+)".*?data-level="(\d+)"'
matches = re.findall(pattern, html, re.DOTALL)

# Sort by date
days = []
for date_str, level in matches:
    days.append((date_str, int(level)))
days.sort(key=lambda x: x[0])

print(f"Total days processed: {len(days)}")
print("First day:", days[0])
print("Last day:", days[-1])

# Color palette for levels
color_map = {
    0: "#181818",  # No contributions (dark tile)
    1: "#521f18",  # Low
    2: "#943423",  # Medium
    3: "#c74730",  # High
    4: "#E8553A"   # Vibrant accent
}

# SVG dimensions
cell_size = 11
cell_gap = 3
col_width = cell_size + cell_gap
row_height = cell_size + cell_gap
left_margin = 35
top_margin = 25
width = left_margin + 53 * col_width + 10
height = top_margin + 7 * row_height + 15

svg_lines = []
svg_lines.append(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}" width="100%" height="100%">')
svg_lines.append('<style>')
svg_lines.append('  .month-label { font-family: "Space Grotesk", sans-serif; font-size: 10px; fill: rgba(255,255,255,0.4); }')
svg_lines.append('  .wday-label { font-family: "Space Grotesk", sans-serif; font-size: 9px; fill: rgba(255,255,255,0.35); }')
svg_lines.append('  .day-rect { transition: all 0.2s ease; cursor: pointer; }')
svg_lines.append('  .day-rect:hover { stroke: #fff; stroke-width: 1px; transform: scale(1.1); transform-origin: center; }')
svg_lines.append('</style>')

# Day labels
day_labels = [(1, 'Mon'), (3, 'Wed'), (5, 'Fri')]
for row_idx, label in day_labels:
    y = top_margin + row_idx * row_height + 9
    svg_lines.append(f'<text x="5" y="{y}" class="wday-label">{label}</text>')

# Group days into weeks
# Determine starting weekday of first day
first_dt = datetime.strptime(days[0][0], "%Y-%m-%d")
# Sunday = 0, Monday = 1, ... Saturday = 6
# Python strftime %w: 0 = Sunday
start_wday = int(first_dt.strftime("%w"))

current_col = 0
current_row = start_wday
last_month = None
last_month_col = -5

month_names = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

for date_str, level in days:
    dt = datetime.strptime(date_str, "%Y-%m-%d")
    m_name = month_names[dt.month - 1]
    
    # Place month label if month changes and at least 3 columns apart
    if dt.month != last_month:
        if current_col - last_month_col >= 3:
            x_pos = left_margin + current_col * col_width
            svg_lines.append(f'<text x="{x_pos}" y="14" class="month-label">{m_name}</text>')
            last_month_col = current_col
        last_month = dt.month

    x = left_margin + current_col * col_width
    y = top_margin + current_row * row_height
    color = color_map.get(level, color_map[0])
    
    svg_lines.append(f'<rect x="{x}" y="{y}" width="{cell_size}" height="{cell_size}" rx="2" ry="2" fill="{color}" class="day-rect"><title>{date_str}: level {level}</title></rect>')
    
    current_row += 1
    if current_row > 6:
        current_row = 0
        current_col += 1

svg_lines.append('</svg>')

svg_content = "\n".join(svg_lines)
with open("assets/images/github-contributions.svg", "w", encoding="utf-8") as f:
    f.write(svg_content)

print("Saved assets/images/github-contributions.svg successfully!")
