'''
Check if Palindrome
If the string entered by the user is a palindrome
12/28/20
'''

strInput = input("Which word do you want to check for palindrome? ;) ")

if strInput == strInput[::-1]:
    print("Yes it is a palindrome!")
else:
    print(f"No it's not a palindrome!: {strInput} != {strInput[::-1]}")