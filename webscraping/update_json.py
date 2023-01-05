import json

with open("./backend/files/new_data.json", 'r') as f:
    # Load the JSON data from the file
    data = json.load(f)

for dat in data:
    data[dat]["Site"] = data[dat]["Site"].split()[0]
    if data[dat]["Image"][:12] == "https:https:": 
        data[dat]["Image"] = data[dat]["Image"][6:]

with open("./backend/files/new_data.json", 'w') as f:
    # Write the modified JSON object to the file
    json.dump(data, f, indent=4)