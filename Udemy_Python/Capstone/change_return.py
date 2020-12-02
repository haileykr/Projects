# Initialize variables
quarters = dimes = nickels = pennies = 0

# Get the user input
cost = float(input("How much does it cost?: "))
money = float(input("How much are you paying?: "))

# Get the change amount and convert it to all cents
change = int((cost - money) * 100)
print(type(change))

while change != 0:
    # quarters: 25 cents
    quarters = change // 25
    change -= quarters * 25

    # dimes : 10 cents
    dimes = change // 10
    change -= dimes * 10

    # nickels : 5 cents
    nickels = change // 5
    change -= nickels *5

    # pennies: 1 cent
    pennies = change
    change -= pennies

print("Your changes are: \nQuarters: {}\nDimes: {}\nNickels: {}\nPennies: {}".format(quarters, dimes, nickels, pennies))