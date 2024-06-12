from pymongo.mongo_client import MongoClient
import os
import env


DB_URI = os.environ["MONGODB_URI"]

client = MongoClient(DB_URI)
db = client['SERIES-API']
turbine_collection = db['turbines']
