#!/usr/bin/env python3
"""
validate_skill.py — Structural validator for theo-browne-fullstack-advisor skill.
No external dependencies required.

Usage:
    python scripts/validate_skill.py [skill_root_dir]
    Default skill_root_dir: parent directory of this script's location.

Exit codes:
    0 — All checks passed
    1 — One or more checks failed
"""

import sys
import os
import re

def check(label, condition, fix_hint=""):
    status = "PASS" if condition else "FAIL"
    print(f"  [{status}] {label}")
    if not condition and fix_hint:
        print(f"         → {fix_hint}")
    return condition


def main():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    skill_root = sys.argv[1] if len(sys.argv) > 1 else os.path.dirname(script_dir)

    print(f"\n=== Skill Validator: {os.path.basename(skill_root)} ===\n")

    results = []
    skill_md_path = os.path.join(skill_root, "SKILL.md")

    # --- File existence ---
    print("File Structure:")
    results.append(check("SKILL.md exists", os.path.isfile(skill_md_path), "Create SKILL.md in skill root."))
    results.append(check(
        "references/t3-stack-patterns.md exists",
        os.path.isfile(os.path.join(skill_root, "references", "t3-stack-patterns.md")),
        "Create references/t3-stack-patterns.md"
    ))

    if not os.path.isfile(skill_md_path):
        print("\nCannot continue — SKILL.md missing.")
        sys.exit(1)

    content = open(skill_md_path).read()

    # --- Frontmatter ---
    print("\nFrontmatter:")
    fm_match = re.match(r'^---\n(.*?)\n---', content, re.DOTALL)
    results.append(check("YAML frontmatter present", bool(fm_match), "Wrap top of SKILL.md with --- blocks."))

    if fm_match:
        fm = fm_match.group(1)

        name_match = re.search(r'^name:\s*(.+)$', fm, re.MULTILINE)
        name_val = name_match.group(1).strip() if name_match else ""
        results.append(check("name field present", bool(name_val), "Add 'name:' to frontmatter."))
        results.append(check(
            f"name is lowercase/hyphens only ('{name_val}')",
            bool(re.fullmatch(r'[a-z0-9\-]+', name_val)),
            "name must match [a-z0-9-]+ only."
        ))
        results.append(check(
            f"name ≤ 64 chars ({len(name_val)} chars)",
            len(name_val) <= 64,
            "Shorten the name."
        ))

        desc_match = re.search(r'^description:\s*(.+)$', fm, re.MULTILINE)
        desc_val = desc_match.group(1).strip() if desc_match else ""
        results.append(check("description field present", bool(desc_val), "Add 'description:' to frontmatter."))
        results.append(check(
            f"description ≤ 1024 chars ({len(desc_val)} chars)",
            len(desc_val) <= 1024,
            "Trim description to under 1024 characters."
        ))
        results.append(check(
            "description uses third-person (no 'I can', 'You can')",
            not re.search(r'\bI can\b|\bYou can\b', desc_val),
            "Rewrite description in third person."
        ))

    # --- Body quality ---
    print("\nBody Quality:")
    lines = content.split('\n')
    results.append(check(
        f"SKILL.md ≤ 500 lines ({len(lines)} lines)",
        len(lines) <= 500,
        "Move verbose content to references/."
    ))

    body = content[fm_match.end():] if fm_match else content
    results.append(check(
        "References t3-stack-patterns.md",
        "t3-stack-patterns.md" in body,
        "Add a reference to references/t3-stack-patterns.md in the SKILL.md body."
    ))
    results.append(check(
        "K.E.R.N.E.L. format documented",
        "K.E.R.N.E.L" in body,
        "Include K.E.R.N.E.L. response format section."
    ))
    results.append(check(
        "ReAct loop documented",
        "ReAct" in body,
        "Include ReAct loop section."
    ))
    results.append(check(
        "Pattern flags table present",
        "Pattern Flags" in body or "Pattern Flag" in body,
        "Include a pattern flags table."
    ))
    results.append(check(
        "No hardcoded secrets or URLs",
        not re.search(r'(sk-|api_key|SECRET|password\s*=)', body, re.IGNORECASE),
        "Remove any hardcoded credentials."
    ))

    # --- Reference file quality ---
    print("\nReference File Quality:")
    ref_path = os.path.join(skill_root, "references", "t3-stack-patterns.md")
    if os.path.isfile(ref_path):
        ref_content = open(ref_path).read()
        ref_lines = ref_content.split('\n')
        results.append(check(
            f"Reference file has ToC (>100 lines, {len(ref_lines)} lines)",
            "Table of Contents" in ref_content or "## Table" in ref_content,
            "Add a Table of Contents since file exceeds 100 lines."
        ))
        results.append(check(
            "No deeply nested references (no links to other .md files)",
            not re.search(r'\[.*\]\(.*\.md\)', ref_content),
            "References must not chain to other .md files."
        ))

    # --- Summary ---
    passed = sum(results)
    total = len(results)
    print(f"\n{'='*40}")
    print(f"Result: {passed}/{total} checks passed")
    if passed == total:
        print("✓ Skill is valid and deployment-ready.")
    else:
        print(f"✗ {total - passed} issue(s) found. Fix before deploying.")
    print()

    sys.exit(0 if passed == total else 1)


if __name__ == "__main__":
    main()
