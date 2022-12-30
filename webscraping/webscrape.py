import json
import webscrapeCirplus
import webscrapeCradle

final_dict, category_dict = webscrapeCirplus.run()
final_update, category_update = webscrapeCradle.run()
final_dict.update(final_update)
category_dict.update(category_update)

with open("./backend/files/new_data.json", "w") as outfile:
    # Write the dictionary to the file, using 4 spaces for indentation
    json.dump(final_dict, outfile, indent=4)

with open("./backend/files/category_data.json", "w") as outfile:
    # Write the dictionary to the file, using 4 spaces for indentation
    json.dump(category_dict, outfile, indent=4)
