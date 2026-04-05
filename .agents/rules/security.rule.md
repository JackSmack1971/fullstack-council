---
name: state-exfiltration-protection
activation: always
---

# State Transfer Security Boundaries

<user_rules>
1. Terminal Command Auto Execution MUST be set to "Request Review" to prevent DEV#POPPER payload execution.
2. Any terminal command referencing `$ARCH_STATE` or `// capture` variables MUST require human authorization.
3. Strict Mode MUST be enabled with "Sandbox Allow Network" explicitly disabled during state passing.
</user_rules>
