#!/usr/bin/env python3
import json
import re
import sys
import zipfile
import xml.etree.ElementTree as ET

path = sys.argv[1]
CATEGORY_NAME_TO_ID = {
    "Reflections": "reflections",
    "Perspectives": "perspectives",
    "Political Analysis": "political-analysis",
    "Nation-Building": "nation-building",
    "Leadership": "leadership",
}

with zipfile.ZipFile(path) as z:
    ss = []
    if "xl/sharedStrings.xml" in z.namelist():
        root = ET.fromstring(z.read("xl/sharedStrings.xml"))
        NS = {"m": "http://schemas.openxmlformats.org/spreadsheetml/2006/main"}
        for si in root.findall(".//m:si", NS):
            parts = []
            for t in si.iter("{http://schemas.openxmlformats.org/spreadsheetml/2006/main}t"):
                if t.text:
                    parts.append(t.text)
                if t.tail:
                    parts.append(t.tail)
            ss.append("".join(parts))
    sheet = ET.fromstring(z.read("xl/worksheets/sheet1.xml"))
    NS = {"m": "http://schemas.openxmlformats.org/spreadsheetml/2006/main"}
    rows = []
    for row in sheet.findall(".//m:sheetData/m:row", NS):
        cells = {}
        for c in row.findall("m:c", NS):
            ref = c.get("r", "")
            col = re.match(r"([A-Z]+)", ref).group(1)
            t = c.get("t")
            v = c.find("m:v", NS)
            val = v.text if v is not None else ""
            if t == "s" and val:
                val = ss[int(val)]
            cells[col] = val.strip()
        rows.append(cells)

out = {}
for r in rows[1:]:
    url = r.get("B", "")
    cat = r.get("C", "")
    if url and cat:
        slug = url.rstrip("/").split("/")[-1]
        out[slug] = CATEGORY_NAME_TO_ID.get(cat, "perspectives")

print(json.dumps(out))
