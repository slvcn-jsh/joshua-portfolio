"""Render owner-approved public PDFs without rewriting or repairing the originals."""
from pathlib import Path
import pymupdf

root = Path(__file__).resolve().parents[1]
output = root / "output" / "pdf"
output.mkdir(parents=True, exist_ok=True)
for name in ("it-specialist-python", "sap-autonomous-enterprise"):
    with pymupdf.open(root / "public" / "certificates" / f"{name}.pdf") as document:
        if len(document) != 1:
            raise ValueError(f"Review changed page count: {name}")
        document[0].get_pixmap(matrix=pymupdf.Matrix(2, 2)).save(output / f"{name}.png")
    print(f"Rendered {name}")
