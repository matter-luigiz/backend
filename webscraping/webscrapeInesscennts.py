from selenium import webdriver
from selenium.webdriver.common.by import By
from collections import defaultdict
import json
import time

PATH = "/Users/Ian/Desktop/chromedriver"
url = "https://inesscents.com/shop-all/"
category_dict = defaultdict(list)
iness_dict = dict()
id = 2000
driver = webdriver.Chrome(PATH)


def getCategory(category, link):
    global id
    driver.get(link)
    grid = driver.find_element(By.XPATH, "//ul[@class='productGrid']")
    names = [name.text for name in grid.find_elements(By.XPATH, "//h4[@class='card-title']")]
    links = [link.get_attribute("href") for link in grid.find_elements(by=By.TAG_NAME, value="a")]
    images = [link.get_attribute("src") for link in grid.find_elements(By.XPATH, "//img[@class='card-image']")]
    costs = [name.text for name in grid.find_elements(By.XPATH, "//div[@data-test-info-type='price']")]
    for i in range(len(names)):
        category_dict[category].append(names[i])
        iness_dict[names[i]] = {"Cost": costs[i], "Image": images[i], "Link": links[i], "Category": category, "ID": id, "Site": "Inesscents"}
        iness_dict[names[i]]["Certifications"] = ["Fair Trade USA", "USDA Organic", "Oregon Tilth", "B Corporation", "Clean Energy partner"]
        id += 1


def run():

    driver.get(url)
    sidebar = driver.find_element(By.XPATH, "//div[@class='sidebarBlock']")
    options = sidebar.find_elements(By.XPATH, "//li[@class='navList-item']")
    setup = [(option.find_element(by=By.CLASS_NAME, value="navList-action").get_attribute("href"), option.text) for option in options]
    for opt in setup[:8]:
        getCategory(opt[1], opt[0])

    driver.quit()

    print(json.dumps(category_dict, indent=4))


run()
