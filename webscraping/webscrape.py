from selenium import webdriver
from selenium.webdriver.common.by import By
import json
import time

PATH = "/Users/Ian/Desktop/chromedriver"
driver = webdriver.Chrome(PATH)
url = "https://www.cirplus.com/app?$page:"
textile_dict = {}

def parse_webpage(fullUrl):
    driver.get(fullUrl)
    time.sleep(10)
    root = driver.find_element(by=By.ID, value="root")
    jss14 = root.find_element(by=By.CLASS_NAME, value="jss14")
    jss28 = jss14.find_element(by=By.CLASS_NAME, value="jss28")
    jss29 = jss28.find_element(by=By.CLASS_NAME, value="jss29")
    images = jss28.find_elements(by=By.TAG_NAME, value="img")
    image_srcs = [image.get_attribute("src") for image in images]
    return ((jss29.text).splitlines(), image_srcs[1:])

def add_to_dict(values, index, image):
    keyStr = values[0] + "-" + str(index)
    newDict = {"Commodity type": None, "Pickup location": None, "Source": None, "Amount": None, "Price per tons": None, "Recycled content": None}
    for idx, val in enumerate(values):
        if val in newDict.keys():
            newDict[val] = values[idx + 1]
    newDict["Image"] = image
    textile_dict[keyStr] = newDict


for i in range(1, 8):
    fullUrl = url + str(i)
    messy_values, messy_images = parse_webpage(fullUrl)
    image_track = 0
    for idx, val in enumerate(messy_values):    
        if val == "Commodity type":
            add_to_dict(messy_values[idx - 2:idx + 12], idx, messy_images[image_track])
            image_track += 1

print(json.dumps(textile_dict, indent=4))

driver.quit()

