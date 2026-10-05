import json
import re
import unicodedata
from collections import Counter
from pathlib import Path

import pdfplumber


PDF_DIR = Path(
    r"C:\Users\Usuario\Downloads\SILABOS ING QUIMICA-20261005T193756Z-1-001\SILABOS ING QUIMICA"
)
DATA_PATH = Path("syllabi-data.js")


SPANISH_LEVELS = {
    "PRIMER": 1,
    "SEGUNDO": 2,
    "TERCER": 3,
    "CUARTO": 4,
    "QUINTO": 5,
    "SEXTO": 6,
    "SEPTIMO": 7,
    "SEPTIMO": 7,
    "OCTAVO": 8,
    "NOVENO": 9,
    "DECIMO": 10,
}

STOPWORDS = {
    "aprendizaje",
    "asignatura",
    "contacto",
    "docente",
    "unidad",
    "unidades",
    "subunidad",
    "subunidades",
    "grupo",
    "ciclo",
    "nivel",
    "horas",
    "practico",
    "experimental",
    "autonomo",
    "contenidos",
    "contenido",
    "para",
    "con",
    "los",
    "las",
    "del",
    "una",
    "por",
    "que",
    "como",
    "sus",
    "entre",
    "desde",
    "sobre",
    "este",
    "esta",
}


def load_data():
    raw = DATA_PATH.read_text(encoding="utf-8").strip()
    raw = re.sub(r"^const\s+syllabiContentData\s*=\s*", "", raw)
    raw = re.sub(r";\s*$", "", raw)
    return json.loads(raw)


def save_data(data):
    DATA_PATH.write_text(
        "const syllabiContentData = "
        + json.dumps(data, ensure_ascii=False, indent=2)
        + ";\n",
        encoding="utf-8",
    )


def clean_text(value):
    if not value:
        return ""
    text = str(value).replace("\r", "\n")
    text = re.sub(r"[ \t]*\n[ \t]*", " ", text)
    text = re.sub(r"\s+", " ", text)
    return text.strip(" -.;")


def normalize_key(value):
    text = clean_text(value).replace("�", "")
    text = unicodedata.normalize("NFD", text)
    text = "".join(ch for ch in text if unicodedata.category(ch) != "Mn")
    return re.sub(r"[^A-Z0-9]+", " ", text.upper()).strip()


def first_page_metadata(pdf_path):
    with pdfplumber.open(pdf_path) as doc:
        text = doc.pages[0].extract_text() or ""
    code = ""
    code_match = re.search(r"C.DIGO:\s*(\d+)", text, flags=re.IGNORECASE)
    if code_match:
        code = code_match.group(1)
    group = ""
    group_match = re.search(r"-\s*GRUPO:\s*(\d+)", text, flags=re.IGNORECASE)
    if group_match:
        group = group_match.group(1)
    level = None
    level_match = re.search(r"CICLO O SEMESTRE\s+([A-Z�]+)\s+NIVEL", text, flags=re.IGNORECASE)
    if level_match:
        level = SPANISH_LEVELS.get(normalize_key(level_match.group(1)).split()[0])
    return {"code": code, "group": group, "level": level}


def is_subunits_header(row):
    return any(cell and "SUB UNIDADES" in normalize_key(cell) for cell in row)


def other_cells_are_empty(row):
    return not any(clean_text(cell) for cell in row[1:])


def strip_number_prefix(text):
    return re.sub(r"^\s*\d+\.\s*", "", clean_text(text)).strip()


def is_numbered_cell(text):
    return bool(re.match(r"^\s*\d+\.\s+", clean_text(text)))


def split_subunit_cell(text):
    raw = str(text or "").replace("\r", "\n").strip()
    if not raw:
        return []
    starts = list(re.finditer(r"(?<!\S)\d+\.\s+", raw))
    if not starts:
        return [clean_text(raw)]
    parts = []
    for index, match in enumerate(starts):
        start = match.start()
        end = starts[index + 1].start() if index + 1 < len(starts) else len(raw)
        part = raw[start:end]
        part = strip_number_prefix(part)
        if part:
            parts.append(part)
    return parts


def extract_units(pdf_path):
    units = []
    current = None
    seen = set()

    with pdfplumber.open(pdf_path) as doc:
        for page in doc.pages:
            for table in page.extract_tables() or []:
                parsing = False
                for row in table:
                    row = list(row or [])
                    if not row:
                        continue
                    if is_subunits_header(row):
                        parsing = True
                        continue
                    if not parsing:
                        continue

                    first = clean_text(row[0] if row else "")
                    if not first:
                        continue

                    if is_numbered_cell(first) and other_cells_are_empty(row):
                        unit_number_match = re.match(r"^\s*(\d+)\.", first)
                        unit_number = unit_number_match.group(1) if unit_number_match else str(len(units) + 1)
                        title = strip_number_prefix(first)
                        current = {
                            "code": f"U{unit_number}",
                            "title": title,
                            "subunits": [],
                        }
                        units.append(current)
                        seen = set()
                        continue

                    if current is None:
                        current = {
                            "code": f"U{len(units) + 1}",
                            "title": "Contenidos",
                            "subunits": [],
                        }
                        units.append(current)
                        seen = set()

                    for title in split_subunit_cell(first):
                        title_key = normalize_key(title)
                        if not title_key or title_key in seen:
                            continue
                        seen.add(title_key)
                        current["subunits"].append(
                            {
                                "code": f"{current['code']}.{len(current['subunits']) + 1}",
                                "title": title,
                            }
                        )

    return units


def item_text(item):
    parts = [item.get("title", ""), item.get("description", "")]
    for unit in item.get("units", []):
        parts.append(unit.get("title", ""))
        parts.extend(sub.get("title", "") for sub in unit.get("subunits", []))
    return " ".join(parts)


def keywords_for(item):
    text = normalize_key(item_text(item)).lower()
    words = [word for word in text.split() if len(word) > 4 and word not in STOPWORDS]
    counts = Counter(words)
    return [word for word, _ in counts.most_common(16)]


def rebuild_similar(items):
    keyword_map = {item["id"]: set(keywords_for(item)) for item in items}
    similar = {}
    for item in items:
        current = keyword_map[item["id"]]
        matches = []
        for other in items:
            if other["id"] == item["id"]:
                continue
            shared = sorted(current & keyword_map[other["id"]])
            if not shared:
                continue
            score = round(len(shared) / max(1, min(len(current), len(keyword_map[other["id"]]))), 2)
            matches.append(
                {
                    "id": other["id"],
                    "title": other["title"],
                    "level": other["level"],
                    "score": score,
                    "keywords": shared[:4],
                }
            )
        matches.sort(key=lambda match: (-match["score"], match["level"], match["title"]))
        similar[item["id"]] = matches[:4]
    return similar


def main():
    data = load_data()
    pdf_units = {}
    for pdf_path in sorted(PDF_DIR.glob("*.pdf"), key=lambda path: path.name.lower()):
        meta = first_page_metadata(pdf_path)
        if not meta["code"] or not meta["group"]:
            continue
        key = (meta["code"], meta["group"])
        pdf_units.setdefault(key, extract_units(pdf_path))

    missing = []
    for item in data["items"]:
        key = (str(item.get("code", "")), str(item.get("group", "")))
        units = pdf_units.get(key)
        if not units:
            missing.append(f"{item.get('code')} grupo {item.get('group')} - {item.get('title')}")
            continue
        item["units"] = json.loads(json.dumps(units, ensure_ascii=False))
        item["unitCount"] = len(item["units"])
        item["subunitCount"] = sum(len(unit["subunits"]) for unit in item["units"])
        item.pop("file", None)
        item.pop("sourceFile", None)

    data["summary"]["count"] = len(data["items"])
    data["summary"]["units"] = sum(item["unitCount"] for item in data["items"])
    data["summary"]["subunits"] = sum(item["subunitCount"] for item in data["items"])
    data["similar"] = rebuild_similar(data["items"])
    save_data(data)

    print(f"updated={len(data['items']) - len(missing)}")
    print(f"missing={len(missing)}")
    print(f"units={data['summary']['units']}")
    print(f"subunits={data['summary']['subunits']}")
    if missing:
        print("\n".join(missing))


if __name__ == "__main__":
    main()
