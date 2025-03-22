import math

a = int(input())
b = int(input())

for i in range(a, b + 1):
    sqrt_i = math.isqrt(i)
    if sqrt_i * sqrt_i == i:
        print(i, end=" ")