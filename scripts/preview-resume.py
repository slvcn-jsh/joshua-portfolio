"""Render the unchanged approved PDF for its web preview; do not rewrite the PDF."""
from pathlib import Path
import fitz

root = Path(__file__).resolve().parents[1]
out = root / "output" / "pdf"
out.mkdir(parents=True, exist_ok=True)
with fitz.open(root / "public" / "Joshua-Salvacion-Resume.pdf") as pdf:
    if len(pdf) != 1:
        raise ValueError("Resume page count changed; review the page content before publishing.")
    pdf[0].get_pixmap(matrix=fitz.Matrix(1.5, 1.5)).save(out / "resume-preview.png")
print(out / "resume-preview.png")
