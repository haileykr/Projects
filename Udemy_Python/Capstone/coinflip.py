'''
Coin Flip
Flipping a single coin however many times the user decides.
The code should record the outcomes and count the number of tails and heads.
12/22/20
'''

from random import randint

def coinFlip(numOfFlips):
    coinSides = {0: "head", 1:"tail"}
    flips = []
    numHeads = numTails = 0
    for num in range(0,numOfFlips):
        flip = randint(0,1)
        flips.append(coinSides[flip])
        if flip == 0:
            numHeads += 1
        else:
            numTails += 1
    return f"Your flip results are: {flips}, with {numHeads} heads and {numTails} tails"

def main():
    numOfFlips = int(input("How many times do you wanna flip a coin?: "))

    print(coinFlip(numOfFlips))

if __name__ == '__main__':
    main()

