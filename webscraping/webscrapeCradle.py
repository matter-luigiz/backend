from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.select import Select
import json
import time

PATH = "/Users/Ian/Desktop/chromedriver"
driver = webdriver.Chrome(PATH)
url = "https://www.c2ccertified.org/products/registry"
textile_dict = {}

driver.get(url)
item_list = driver.find_element(by=By.ID, value="nav_categories")
fashion = item_list.find_element(By.XPATH, "//label[@for='category_fashion-textiles']")
fashion.click()

time.sleep(3)

results = driver.find_element(by=By.ID, value="results")
for i in range(4):
    more = results.find_element(By.XPATH, "//a[@id='more']")
    more.click()
    time.sleep(3)
    

items = results.find_elements(By.XPATH, "//div[@class='registry-item__meta']")
headers = results.find_elements(By.XPATH, "//span[@class='registry-item__header-level']")
links = results.find_elements(By.XPATH, "//figure[@class='registry-item__image-wrap']")
print(headers)
print("----------------------------------------------------------------------------------------------------------")
print(links)
print("----------------------------------------------------------------------------------------------------------")
# print(headers)
# print("----------------------------------------------------------------------------------------------------------")

header_text = [header.text for header in headers]

link_images = [link.find_element(by=By.CLASS_NAME, value="registry-item__image").get_attribute("src") for link in links]
link_pages = [link.find_element(by=By.CLASS_NAME, value="main").get_attribute("href") for link in links]

for idx, item in enumerate(items):
    text = item.text.splitlines()
    ndict = {}
    ndict["supplier"] = text[1]
    ndict["description"] = text[2]
    ndict["Sustainability Rating"] = header_text[idx]
    ndict["Image"] = "https:" + link_images[idx]
    ndict["Link"] = link_pages[idx]
    textile_dict[text[0]] = ndict

# print(textile_dict)
print(json.dumps(textile_dict, indent=4))
time.sleep(10)
# 

driver.quit()

