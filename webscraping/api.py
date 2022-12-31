import json

items = []

with open("./backend/files/new_data.json", "r") as infile:
    # Write the dictionary to the file, using 4 spaces for indentation
    data = json.load(infile)

with open("./backend/files/category_data.json", "r") as cat_infile:
    # Write the dictionary to the file, using 4 spaces for indentation
    categories = json.load(cat_infile)


def product(id):
    for thingo in data:
        if thingo["ID"] == id:
            return thingo

def search(offset, category, search):
    global items
    items = []
    if category not in categories.keys():
        return None
    for thingo in categories[category]:
        if search in thingo:
            items.append(data[thingo])
    return next_data(0)
    


def next_data(place):
    if not data or place * 20 < len(data):
        return None
    return items[place * 20:min((place + 1) * 20, len(data))]