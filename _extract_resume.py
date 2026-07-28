import subprocess
import sys

try:
    from pypdf import PdfReader
except ImportError:
    subprocess.check_call([sys.executable, "-m", "pip", "install", "pypdf", "-q"])
    from pypdf import PdfReader

reader = PdfReader(r"c:\Users\Abdullah\Desktop\Projects!!\Portfolio Site\Abdullah_Ahmed_Siddiqui_Resume.pdf")
import io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")
for i, page in enumerate(reader.pages):
    print(f"--- Page {i + 1} ---")
    print(page.extract_text())
