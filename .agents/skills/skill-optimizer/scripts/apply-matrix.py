#!/usr/bin/env python3
import os
import json
import re

def load_matrix(matrix_path):
    with open(matrix_path, 'r') as f:
        return json.load(f)

def enforce_persona_boundaries(target_dir, matrix):
    patched_count = 0
    for root, _, files in os.walk(target_dir):
        if "SKILL.md" in files:
            filepath = os.path.join(root, "SKILL.md")
            skill_name = os.path.basename(root)
            
            # Determine mapped toolset or fallback to read-only for safety
            tool_set_key = matrix["persona_mapping"].get(skill_name, "READ_ONLY_TOOLS")
            tool_array = matrix["tool_sets"][tool_set_key]
            
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Pattern matching for YAML frontmatter
            match = re.match(r'^(---\n)(.*?\n)(---)', content, re.DOTALL)
            if not match:
                print(f"[ERROR] No valid YAML frontmatter found in {filepath}")
                continue
                
            frontmatter = match.group(2)
            
            # Case 1: allowed-tools already exists (replace)
            if 'allowed-tools:' in frontmatter:
                new_frontmatter = re.sub(
                    r'allowed-tools:.*?\n', 
                    f'allowed-tools: {tool_array}\n', 
                    frontmatter
                )
            # Case 2: allowed-tools is missing (inject)
            else:
                new_frontmatter = frontmatter + f"allowed-tools: {tool_array}\n"
                
            patched_content = f"---\n{new_frontmatter}---" + content[match.end():]
            
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(patched_content)
            print(f"[BOUNDED] {skill_name} -> {tool_set_key}")
            patched_count += 1
    
    print(f"\n[SUCCESS] {patched_count} SKILL.md files successfully bound to explicit tool sets.")

if __name__ == "__main__":
    matrix_path = ".agents/skills/skill-optimizer/scripts/tool-matrix.json"
    enforce_persona_boundaries(".agents/skills", load_matrix(matrix_path))
