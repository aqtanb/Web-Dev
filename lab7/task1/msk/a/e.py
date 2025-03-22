v = int(input())
t = int(input())

distance = v * t
position = distance % 109

if position < 0:
    position += 109

print(position)