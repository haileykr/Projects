import re

# Get the Conversion System and Number to Convert
system = input("Choose between [1: Binary -> Decimal, 2: Decimal -> Binary] ")

number = input("Enter your number: ")
    
def binary_to_decimal(number):    
    # regular expression to validate the number
    if len(re.findall('[^01]',number)) != 0:
        print('Enter a valid binary number')
        return

    i = converted = 0
    number = int(number)
    while number != 0:
        converted += number % 10 * 2**i
        number = number // 10
        i += 1
    return converted

def decimal_to_binary(number):    
    # regular expression to validate the number
    if len(re.findall('[^\d]',number)) != 0:
        print('Enter a valid decimal number')
        return

    converted = ''
    number = int(number)

    if number in (0,1):
        return number
    
    while number != 0:
        converted += str(number % 2)
        number = number // 2
    return int(converted[::-1])

if system == '1':
    print(binary_to_decimal(number))
if system == '2':
    print(decimal_to_binary(number))