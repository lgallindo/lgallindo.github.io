# Ingestion Procedures and Decisions Document
**Timestamp:** 2026-06-29T15:48:32Z

## 1. Initial Processing Strategy
The initial ingestion of `Linkedin-Português.pdf` was attempted using standard, lightweight open-source utilities (`pdftotext` and `pdfinfo`). The strategy was to extract the raw text layer from the PDF to perform a lightweight semantic analysis regarding the alignment of professional data engineering with FOSS/maker hobbies.

## 2. The Vector/Image Flatness Issue
Upon ingesting `Linkedin-English.pdf` and `Linkedin-Default.pdf`, `pdftotext` yielded empty artifacts (containing only a form-feed character `\x0c`).
- **Diagnostic:** Executing `pdfinfo` revealed the producer as `Microsoft: Print To PDF` (Version 1.7).
- **Decision:** Because "Print To PDF" flattens web pages into vector paths and images rather than preserving semantic text layers, standard NLP extraction tools fail. The decision was made to fall back to a layout-aware OCR/ML tool: `docling`.

## 3. The Docling Execution Attempt
The user indicated a local `docling` installation existed.
- **Diagnostic:** Environment probing (`docling --help`, `uv run docling`, and a system-wide `find` for the executable) failed to locate a pre-installed binary in the PATH or local virtual environments. The system did find a related `granite-docling` model cached in `~/.cache/huggingface`, indicating prior related ML work, but no executable.
- **Decision:** To satisfy the user's request to "fast-forward" the `docling` plan, the agent executed `uvx docling` to dynamically pull and execute the tool via the `uv` package manager.

## 4. Disk Space Exhaustion (OS Error 28)
- **Failure Condition:** The `uvx docling` task was routed to the background because downloading heavy ML dependencies (PyTorch, CUDA 13, cuDNN, triton, torchvision) is extremely slow.
- **Diagnostic:** The task failed with `No space left on device (os error 28)`. The `uv` cache (`~/.cache/uv`) successfully downloaded ~3.2GB of wheel archives, completely exhausting the remaining 4.8GB of free space on the `/` partition when attempting to extract them into the execution environment.
- **Mitigation:** The agent immediately ran `uv cache clean`, purging the 3.2GB of incomplete ML downloads to restore system stability and prevent the OS from locking up due to zero-byte availability.
- **Conclusion:** `docling` cannot be run natively on this partition until at least 8-10GB of contiguous free space is made available. Structural PDF extraction is blocked pending disk space reallocation.
