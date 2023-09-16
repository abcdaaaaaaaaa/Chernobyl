import csv

data_list = []
data_number = 1

while True:
    print(f"Data {data_number}:")
    data = input("Data: ")
    lpg = input("LPG: ")
    ch4 = input("CH4: ")
    co = input("CO: ")
    alcohol = input("Alcohol: ")
    smoke = input("Smoke: ")

    data_entry = {
        'Data': data,
        'LPG': lpg,
        'CH4': ch4,
        'CO': co,
        'Alcohol': alcohol,
        'Smoke': smoke
    }

    data_list.append(data_entry)

    continue_input = input("Do you want to add more data? (Y/N): ")
    if continue_input.lower() != 'y':
        break

    data_number += 1

with open('MQ-4.csv', 'w', newline='') as file:
    fieldnames = ['Data', 'LPG', 'CH4', 'CO', 'Alcohol', 'Smoke']
    writer = csv.DictWriter(file, fieldnames=fieldnames)
    
    writer.writeheader()
    
    for data_entry in data_list:
        writer.writerow(data_entry)

print("Data has been successfully written to the CSV file")