#!/usr/bin/env python3
"""
validate_response.py — K.E.R.N.E.L. compliance checker for CWV responses.

Usage:
    python scripts/validate_response.py <response_file.md>

Exit codes:
    0 = PASS (all checks pass)
    1 = FAIL (one or more checks failed)
    2 = ERROR (file not found or unreadable)

Output:
    Prints a checklist with PASS/FAIL per criterion.
    Prints a final summary line.
"""

import sys
import re
from pathlib import Path


CHECKS = {
    "single_goal": {
        "desc": "Single fix / goal scoped (not a list of 5+ unrelated fixes)",
        "pattern": None,  # heuristic check
    },
    "has_metric": {
        "desc": "References at least one CWV metric (LCP / INP / CLS)",
        "pattern": r"\b(LCP|INP|CLS|Largest Contentful Paint|Interaction to Next Paint|Cumulative Layout Shift)\b",
    },
    "has_verification": {
        "desc": "Includes a verification step (Lighthouse or DevTools command)",
        "pattern": r"(lighthouse|DevTools|pagespeed\.web\.dev|web-vitals|lhci|--only-audits)",
    },
    "has_before_after": {
        "desc": "States before/after metric value or delta",
        "pattern": r"(→|before|after|current|target|delta|from .* to .*|\d+\s*(ms|s)\s*(→|to)\s*\d+)",
    },
    "has_code_or_command": {
        "desc": "Contains code snippet or CLI command",
        "pattern": r"```",
    },
    "no_multi_option_dump": {
        "desc": "Does NOT offer 5+ unrelated options without being asked",
        "pattern": None,  # heuristic: count top-level H3 sections
    },
    "has_scope_note": {
        "desc": "Includes a scope / 'this does NOT cover' note",
        "pattern": r"(does NOT|does not cover|out of scope|scope note|not address|not cover)",
    },
}

CWV_THRESHOLDS = {
    "LCP": {"good": 2500, "unit": "ms"},
    "INP": {"good": 200, "unit": "ms"},
    "CLS": {"good": 0.1, "unit": ""},
}


def load_file(path: str) -> str:
    try:
        return Path(path).read_text(encoding="utf-8")
    except FileNotFoundError:
        print(f"ERROR: File not found: {path}")
        sys.exit(2)
    except Exception as e:
        print(f"ERROR: Could not read file: {e}")
        sys.exit(2)


def count_h3_sections(text: str) -> int:
    return len(re.findall(r"^### ", text, re.MULTILINE))


def run_checks(text: str) -> dict:
    results = {}

    for key, check in CHECKS.items():
        if check["pattern"]:
            match = bool(re.search(check["pattern"], text, re.IGNORECASE))
            results[key] = ("PASS" if match else "FAIL", check["desc"])
        elif key == "single_goal":
            # Heuristic: if > 8 H2/H3 sections, likely multiple unrelated goals
            sections = len(re.findall(r"^##+ ", text, re.MULTILINE))
            results[key] = ("PASS" if sections <= 8 else "WARN", check["desc"])
        elif key == "no_multi_option_dump":
            h3_count = count_h3_sections(text)
            results[key] = ("PASS" if h3_count <= 6 else "WARN", check["desc"])

    return results


def print_report(results: dict, path: str) -> int:
    print(f"\nK.E.R.N.E.L. Compliance Check: {path}")
    print("=" * 60)

    failed = 0
    warned = 0
    for key, (status, desc) in results.items():
        icon = "✓" if status == "PASS" else ("⚠" if status == "WARN" else "✗")
        print(f"  [{icon}] {status:4s}  {desc}")
        if status == "FAIL":
            failed += 1
        elif status == "WARN":
            warned += 1

    print("=" * 60)
    total = len(results)
    passed = total - failed - warned
    print(f"  Result: {passed}/{total} passed, {warned} warnings, {failed} failures")

    if failed == 0:
        print("  STATUS: PASS — Response meets K.E.R.N.E.L. criteria.\n")
    else:
        print("  STATUS: FAIL — Fix the issues above before delivering.\n")

    return 0 if failed == 0 else 1


def main():
    if len(sys.argv) < 2:
        print("Usage: python scripts/validate_response.py <response_file.md>")
        sys.exit(2)

    path = sys.argv[1]
    text = load_file(path)
    results = run_checks(text)
    exit_code = print_report(results, path)
    sys.exit(exit_code)


if __name__ == "__main__":
    main()
