#!/usr/bin/env python3
"""Replace module hero photo URLs with local generated images."""

import re

# (file_path, line_number, new_url)
UPDATES = [
    # data.ts — order: sales, procurement, production, deckle, inventory, finance, hr, ai
    ("src/lib/modules/data.ts", 40, "/images/heroes/sales-hero.png"),
    ("src/lib/modules/data.ts", 192, "/images/heroes/procurement-hero.png"),
    ("src/lib/modules/data.ts", 287, "/images/heroes/production-hero.png"),
    ("src/lib/modules/data.ts", 474, "/images/heroes/deckle-hero.png"),
    ("src/lib/modules/data.ts", 597, "/images/heroes/inventory-hero.png"),
    ("src/lib/modules/data.ts", 719, "/images/heroes/finance-hero.png"),
    ("src/lib/modules/data.ts", 840, "/images/heroes/hr-hero.png"),
    ("src/lib/modules/data.ts", 981, "/images/heroes/ai-hero.png"),
    # extra-data.ts — order: stock-preparation(8), converting-finishing(40), broke-management(72),
    #   recipe-development(104), crm(136), helpdesk(168), marketing(200), field-service(232),
    #   iot-devices(264), digital-twin(296), sustainability(328), edge(360), rpa(392)
    ("src/lib/modules/extra-data.ts", 8, "/images/heroes/stock-preparation-hero.png"),
    ("src/lib/modules/extra-data.ts", 40, "/images/heroes/converting-finishing-hero.png"),
    ("src/lib/modules/extra-data.ts", 72, "/images/heroes/broke-management-hero.png"),
    ("src/lib/modules/extra-data.ts", 104, "/images/heroes/recipe-development-hero.png"),
    ("src/lib/modules/extra-data.ts", 136, "/images/heroes/crm-hero.png"),
    # platform-data.ts
    ("src/lib/modules/platform-data.ts", 481, "/images/heroes/maintenance-hero.png"),
    ("src/lib/modules/platform-data.ts", 588, "/images/heroes/quality-hero.png"),
]

import os

BASE = os.path.join(os.path.dirname(__file__), "..")

def update_line(filepath, lineno, new_url):
    full = os.path.join(BASE, filepath)
    with open(full, "r") as f:
        lines = f.readlines()
    idx = lineno - 1
    line = lines[idx]
    # Replace the URL in the photo: "..." pattern
    new_line = re.sub(
        r'(photo:\s*")[^"]+(")',
        rf'\g<1>{new_url}\2',
        line
    )
    if new_line == line:
        print(f"  WARN no change at {filepath}:{lineno}: {line.strip()[:80]}")
        return False
    lines[idx] = new_line
    with open(full, "w") as f:
        f.writelines(lines)
    print(f"  OK   {filepath}:{lineno} → {new_url}")
    return True

def main():
    ok = 0
    fail = 0
    for filepath, lineno, new_url in UPDATES:
        if update_line(filepath, lineno, new_url):
            ok += 1
        else:
            fail += 1
    print(f"\nDone: {ok} updated, {fail} unchanged/failed")

if __name__ == "__main__":
    main()
