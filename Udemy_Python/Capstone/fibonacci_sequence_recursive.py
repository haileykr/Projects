'''
Fibonacci_sequence program - recursive
12/8/2020
'''

def fibonacci(nth_number):
    if nth_number in (0,1):
        return nth_number
    else:
        return fibonacci(nth_number-2) +fibonacci(nth_number-1)

def main():
    nth_number = int(input("n = ?: "))
    print(fibonacci(nth_number))

if __name__ == '__main__':
    main()
