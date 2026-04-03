#!/usr/bin/env python3
"""
validate_kernel.py — Validates that a K.E.R.N.E.L.-structured response
contains all required sections and identity markers.

Usage:
    python scripts/validate_kernel.py <response_file.md>
    echo "response text" | python scripts/validate_kernel.py -

Exit codes:
    0 — All checks passed
    1 — One or more checks failed
"""

import sys
import re


REQUIRED_SECTIONS = [
    r'\[K\]|##\s*Context|\*\*Context\*\*',
    r'\[E\]|##\s*Task|\*\*Task\*\*',
    r'\[R\]|##\s*Constraints|\*\*Constraints\*\*',
    r'\[N\]|##\s*Format|\*\*Format\*\*',
    r'\[E\].*Verify|##\s*Verify|\*\*Verify\*\*',
    r'\[L\]|##\s*Call to Action|Call to Action|\*\*Call to Action\*\*',
]

IDENTITY_MARKERS = [
    r'\bI\b',           # First person
    r'Vercel|Next\.js|edge|Server Component|DX',  # Domain vocabulary
]

ANTI_PATTERNS = [
    (r'getServerSideProps|getStaticProps', 'Legacy Pages Router data fetching detected'),
    (r'useEffect\(.*fetch|useEffect\(.*axios', 'Client-side data fetching in useEffect detected'),
    (r'express\(\)|require\([\'"]express', 'Custom Express server detected'),
    (r'NEXT_PUBLIC_.*SECRET|NEXT_PUBLIC_.*KEY|NEXT_PUBLIC_.*TOKEN',
     'Sensitive key exposed as NEXT_PUBLIC_ env var'),
]


def load_text(source: str) -> str:
    if source == '-':
        return sys.stdin.read()
    with open(source, 'r', encoding='utf-8') as f:
        return f.read()


def check_sections(text: str) -> list[str]:
    errors = []
    labels = ['[K] Context', '[E] Task', '[R] Constraints',
              '[N] Format', '[E] Verify', '[L] Call to Action']
    for pattern, label in zip(REQUIRED_SECTIONS, labels):
        if not re.search(pattern, text, re.IGNORECASE):
            errors.append(f'MISSING section: {label}')
    return errors


def check_identity(text: str) -> list[str]:
    errors = []
    for pattern in IDENTITY_MARKERS:
        if not re.search(pattern, text):
            errors.append(f'MISSING identity marker matching: {pattern}')
    return errors


def check_anti_patterns(text: str) -> list[str]:
    warnings = []
    for pattern, message in ANTI_PATTERNS:
        if re.search(pattern, text):
            warnings.append(f'ANTI-PATTERN: {message}')
    return warnings


def main():
    if len(sys.argv) < 2:
        print('Usage: python scripts/validate_kernel.py <file.md | ->', file=sys.stderr)
        sys.exit(1)

    text = load_text(sys.argv[1])
    errors = []
    warnings = []

    errors.extend(check_sections(text))
    errors.extend(check_identity(text))
    warnings.extend(check_anti_patterns(text))

    if warnings:
        print('--- WARNINGS ---')
        for w in warnings:
            print(f'  ⚠  {w}')

    if errors:
        print('--- ERRORS ---')
        for e in errors:
            print(f'  ✗  {e}')
        print(f'\nValidation FAILED ({len(errors)} error(s), {len(warnings)} warning(s))')
        sys.exit(1)
    else:
        print(f'✓ Validation PASSED (0 errors, {len(warnings)} warning(s))')
        sys.exit(0)


if __name__ == '__main__':
    main()
