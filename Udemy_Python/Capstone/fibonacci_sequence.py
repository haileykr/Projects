'''
Fibonacci_sequence program
12/8/2020
'''

def fibonacci(nth_number):
    fibonacci = [0,1]

    for x in range(2,nth_number+1):
        fibonacci.append(fibonacci[x-2] + fibonacci[x-1])

    return fibonacci[nth_number]

def main():
    nth_number = int(input("n = ?: "))
    print(fibonacci(nth_number))

if __name__ == '__main__':
    main()
