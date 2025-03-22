n = int(input())
count_zero = 0
for _ in range(n):
    x = int(input())
    if x == 0:
        count_zero += 1
print(count_zero)
