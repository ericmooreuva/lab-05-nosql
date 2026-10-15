#!/usr/bin/env python3
import logging
import os

from pymongo import MongoClient

MONGODB_ATLAS_URL = os.getenv("MONGODB_ATLAS_URL")
MONGODB_ATLAS_USER = os.getenv("MONGODB_ATLAS_USER")
MONGODB_ATLAS_PWD = os.getenv("MONGODB_ATLAS_PWD")

logging.basicConfig(level=logging.INFO)


def main():
    try:
        client = MongoClient(MONGODB_ATLAS_URL, username=MONGODB_ATLAS_USER, password=MONGODB_ATLAS_PWD)
        logging.info("Connected to MongoDB Atlas")

        db = client["bookstore"]
        author_ids = ["author_002", "author_003", "author_004"]

        print(f"Authors: {db.authors.count_documents({'_id': {'$in': author_ids}})}\n")

        for author_id in author_ids:
            author = db.authors.find_one({"_id": author_id})
            print(author["name"])
            for book in db.books.find({"author_ids": author_id}):
                print(f"  {book['title']} ({book['published_year']})")
            print()

        client.close()
    except Exception as e:
        logging.error(e)


if __name__ == "__main__":
    main()