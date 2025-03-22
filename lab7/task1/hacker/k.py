def capitalize_name(s):
    return ' '.join(word.capitalize() for word in s.split())

print(capitalize_name(input()))
