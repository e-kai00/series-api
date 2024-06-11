from pymongo.mongo_client import MongoClient
from dotenv import load_dotenv
import os


load_dotenv()

DB_URI = os.getenv("MONGODB_URI")

client = MongoClient(DB_URI)
db = client['SERIES-API']
turbine_collection = db['turbines']
