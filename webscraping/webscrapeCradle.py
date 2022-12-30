from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.select import Select
import json
import time

PATH = "/Users/Ian/Desktop/chromedriver"
url = "https://www.c2ccertified.org/products/registry"
data_dict = {}
category_dict = {"fashion-textiles": [], "home_office_supply": []}
id = 0

def scrape_page(category, drive):
    item_list = drive.find_element(by=By.ID, value="nav_categories")
    category_search = "//label[@for=\'category_" + category + "\']"
    item = item_list.find_element(By.XPATH, category_search)
    item.click()
    time.sleep(3)

    results = drive.find_element(by=By.ID, value="results")
    for i in range(3):
        more = results.find_element(By.XPATH, "//a[@id='more']")
        more.click()
        time.sleep(3)
        

    items = results.find_elements(By.XPATH, "//div[@class='registry-item__meta']")
    headers = results.find_elements(By.XPATH, "//span[@class='registry-item__header-level']")
    links = results.find_elements(By.XPATH, "//figure[@class='registry-item__image-wrap']")

    header_text = [header.text for header in headers]

    link_images = [link.find_element(by=By.CLASS_NAME, value="registry-item__image").get_attribute("src") for link in links]
    link_pages = [link.find_element(by=By.CLASS_NAME, value="main").get_attribute("href") for link in links]

    for idx, item in enumerate(items):
        global id
        text = item.text.splitlines()
        ndict = {}
        ndict["supplier"] = text[1]
        ndict["description"] = text[2]
        ndict["Sustainability Rating"] = header_text[idx]
        ndict["Image"] = "https:" + link_images[idx]
        ndict["Link"] = link_pages[idx]
        ndict["Category"] = category
        ndict["ID"] = id

        data_dict[text[0]] = ndict
        category_dict[category].append(text[0])
        id += 1

    time.sleep(5)

def run():

    driver = webdriver.Chrome(PATH)

    driver.get(url)
    for name in category_dict.keys():
        scrape_page(name, driver)

    driver.quit()

    return data_dict, category_dict



