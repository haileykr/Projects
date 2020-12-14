import math

pi = str(math.pi)
num_digits = -1
while num_digits not in (0,15):
    num_digits = int(input("How many digits of PI do you want?: (0-15)"))
print(pi[:num_digits+2])

# Note. other examples
# : https://stackoverflow.com/questions/9004789/1000-digits-of-pi-in-python