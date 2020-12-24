'''
Tax Calculator
Ask the user to enter a cost and a USA city, then it returns the tax plus the total cost with tax!
12/24/20
'''

import requests
import bs4
import math


def getSource():
    res = requests.get(
        "https://taxfoundation.org/sales-tax-rates-major-cities-2019/")
    return bs4.BeautifulSoup(res.text, "lxml")


def getTaxRates(soup):
    # On the website, there is ONE table which lists tax rates of some cities
    # all the table contents are in <tbody>
    # the tabel columns are City | State | State Rate | Local Rate | Total Rate | Rank

    # loop through the table row in tbody to save the tax info
    # Let's use the total tax rate
    tax_rate_dic = {}

    table_contents = soup.select('tbody tr')

    for i in range(len(table_contents)):
        content = table_contents[i].select('td')
        tax_rate_dic[content[0].text.lower()] = float(content[4].text[:-1])
        i += 1

    return tax_rate_dic


def findTaxRate(tax_rate_dic, city_name):
    for item in tax_rate_dic:
        if city_name in item:
            return tax_rate_dic[item]

    return False


def main():
    # Web Scraping
    soup = getSource()

    # Make tax rate info into a dictionary
    tax_rate_dic = getTaxRates(soup)

    total_tax = False
    city_name = ''
    # non-empty string returns True
    while (total_tax == False or len(city_name) < 4):
        city_name = input("Which USA city tax would you want to use?: ")
        total_tax = findTaxRate(tax_rate_dic, city_name)

    # Print the total amount based on the base money and total tax rate!
    base = float(input("How much is the base amount?: "))
    total_cost = math.ceil(base*(1+total_tax*0.01)*100)/100

    print(f"\nCalc done! {city_name} has the total tax rate of {total_tax}.\nSo the total cost after calculating tax on ${'{:.2f}'.format(base)} is ${ '{:.2f}'.format(total_cost)}!")


if __name__ == "__main__":
    main()