# -*- coding: utf-8 -*-
import codecs

# Read the corrupted file and fix encoding
with open('index.html', 'rb') as f:
    content = f.read()

# Try to decode and fix
try:
    # Try UTF-8 first
    text = content.decode('utf-8', errors='ignore')
except:
    # Try other encodings
    try:
        text = content.decode('gbk', errors='ignore')
    except:
        text = content.decode('latin-1', errors='ignore')

# Replace corrupted characters with correct ones
replacements = {
    '出发�?/label>': '出发地</label>',
    '目的�?/label>': '目的地</label>',
    '30天价格趋�?/h3>': '30天价格趋势</h3>',
    '机�?': '机票',
    '�?': '地',
}

for old, new in replacements.items():
    text = text.replace(old, new)

# Write back with UTF-8 BOM to ensure proper encoding
with codecs.open('index_fixed.html', 'w', encoding='utf-8-sig') as f:
    f.write(text)

print("File fixed and saved as index_fixed.html")
