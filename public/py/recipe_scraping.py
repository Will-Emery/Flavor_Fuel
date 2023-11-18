""""Module: recipe_scraping.py

This module contains the functions for scraping recipes from the web.
I chose to use Python forthis part of the project due to difficulties with getting a JS API to work.
"""
import json
from recipe_scrapers import scrape_me
import pandas as pd
import os

def import_recipe_urls(file_name = "public/json/recipe_links.json"):
    """Function: import_recipe_urls

    This function imports the recipe urls from the csv file.

    Args:
        file_name (str): The file path for the csv file.
    
    Returns:
        recipe_url_df (pandas.DataFrame): The dataframe containing the recipe urls.
    """
   #import the recipe urls
    recipe_url_df = pd.read_json(file_name)
    #rename the columns
    recipe_url_df.columns = ["url"]

    return recipe_url_df


def get_recipe_data(url):
    """Function: get_recipe_data

    This function scrapes the recipe data from the url.

    Args:
        url (str): The url for the recipe.

    Returns:
        recipe_data (dict): The dictionary containing the recipe data.
    """
    #create the scraper
    scraper = scrape_me(url)

    return scraper.to_json()


def write_recipe_data(recipe_data):
    """Function: write_recipe_data

    This function writes the recipe data to a json file.


    Args:
        recipe_data (dict): The dictionary containing the recipe data.

    Returns:
        None
    """

    file_path = "public/json/recipe_data.json"

    with open(file_path, "a") as f:
        f.write(json.dumps(recipe_data))
        f.write("\n")
        print(recipe_data["canonical_url"] + " written to file")


def write_recipe_data_array(recipe_data_array):
    """Function: write_recipe_data_array

    This function writes the recipe data to a json file as an array.

    Args:
        recipe_data_array (list): The list containing the recipe data.

    Returns:
        None
    """

    file_path = "public/json/recipe_data.json"

    with open(file_path, "w") as f:  # Use "w" instead of "a" to write a new file
        json.dump(recipe_data_array, f, indent=2)  # Use json.dump with indent for better readability
        print("Recipe data written to file")

def add_recipe_id_to_recipe_data():
    """Function: add_recipe_id_to_recipe_data

    This function adds a recipe id to the recipe data.

    Args:
        None

    Returns:
        None
    """
    #read in the recipe data
    recipe_data_df = pd.read_json("public/json/recipe_data.json")

    #add the recipe id
    recipe_data_df["recipe_id"] = recipe_data_df.index

    #write the recipe data to a json file
    write_recipe_data_array(recipe_data_df.to_dict("records"))

def main():
    """Function: main

    This function runs the main program.
    """
    #import the recipe urls
    recipe_urls = import_recipe_urls()

    recipe_data_array = []

    for url in recipe_urls["url"]:
        #get the recipe data
        recipe_data = get_recipe_data(url)
        recipe_data_array.append(recipe_data)
        print(url + " scraped")

    #write the recipe data to a json file
    write_recipe_data_array(recipe_data_array)

if __name__ == "__main__":
    print("This module is meant to be run directly from the command line right now.")
    # main()
    add_recipe_id_to_recipe_data()