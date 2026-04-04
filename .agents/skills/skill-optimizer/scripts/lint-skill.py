#!/usr/bin/env python3
import sys
import re
import argparse

def validate_skill(filepath):
    # Deterministic validation logic replacing LLM guessing
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    issues = []
    if not content.startswith('---'):
        issues.append("CRITICAL: Missing YAML frontmatter.")
    if 'description:' not in content:
        issues.append("CRITICAL: Missing 'description' semantic trigger.")
    if 'allowed-tools:' not in content:
        issues.append("WARNING: Missing 'allowed-tools' boundary.")
        
    if not issues:
        print(f"[PASS] {filepath} is K.E.R.N.E.L. compliant.")
    else:
        print(f"[FAIL] {filepath} requires optimization:")
        for issue in issues:
            print(f" - {issue}")

def execute_audit(target):
    if os.path.isdir(target):
        for root, _, files in os.walk(target):
            if "SKILL.md" in files:
                validate_skill(os.path.join(root, "SKILL.md"))
    else:
        validate_skill(target)

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Deterministic SKILL.md linter.")
    parser.add_argument('--target', required=True, help="Path to the SKILL.md file or directory")
    args = parser.parse_args()
    import os
    execute_audit(args.target)
