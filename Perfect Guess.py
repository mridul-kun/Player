import random

r = random.randint(0 , 1000)
n = -1
gusses = 1
while (n != r):
    n = int(input("Guess the Number : "))
    if (n > r):
        print("Please! guess lower number.")
        gusses += 1
    elif (n == r):
        break
    else:
        print("Please! guess higher number.")
        gusses += 1
print(f"Congratulation!! you have gussed the number {r} correctly in {gusses} attempts.")