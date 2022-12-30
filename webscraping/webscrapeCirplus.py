from selenium import webdriver
from selenium.webdriver.common.by import By
import json
import time

PATH = "/Users/Ian/Desktop/chromedriver"
url = "https://www.cirplus.com/app?$page:"
textile_dict = {}
category_dict = {"RECYCLATE": [], "COMPOUND": [], "OFF-SPEC": []}
id = 1000

def parse_webpage(fullUrl, drive):
    drive.get(fullUrl)
    time.sleep(10)
    root = drive.find_element(by=By.ID, value="root")
    jss14 = root.find_element(by=By.CLASS_NAME, value="jss14")
    jss28 = jss14.find_element(by=By.CLASS_NAME, value="jss28")
    jss29 = jss28.find_element(by=By.CLASS_NAME, value="jss29")
    images = jss28.find_elements(by=By.TAG_NAME, value="img")
    links = jss28.find_elements(By.XPATH, "//a[contains(@href,'/app/offer')]")
    link_hrefs = [link.get_attribute("href") for link in links]
    image_srcs = [image.get_attribute("src") for image in images]
    return ((jss29.text).splitlines(), image_srcs[1:], link_hrefs)

def add_to_dict(values, index, image, link):
    global id
    keyStr = values[0] + "-" + str(index)
    category = keyStr.split()[0]
    newDict = {"Commodity type": None, "Pickup location": None, "Source": None, "Amount": None, "Price per tons": None, "Recycled content": None}
    for idx, val in enumerate(values):
        if val in newDict.keys():
            newDict[val] = values[idx + 1]
    newDict["Image"] = image
    newDict["Link"] = link
    newDict["Category"] = category
    newDict["ID"] = id
    textile_dict[keyStr] = newDict
    category_dict[category].append(keyStr)
    id += 1

def run():

    driver = webdriver.Chrome(PATH)

    for i in range(1, 8):
        fullUrl = url + str(i)
        messy_values, messy_images, links = parse_webpage(fullUrl, driver)
        track = 0
        for idx, val in enumerate(messy_values):    
            if val == "Commodity type":
                add_to_dict(messy_values[idx - 2:idx + 12], idx, messy_images[track], links[track])
                track += 1

    driver.quit()
    return textile_dict, category_dict



