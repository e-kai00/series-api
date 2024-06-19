from fastapi import FastAPI
from connect_db import turbine_collection
from fastapi.middleware.cors import CORSMiddleware
from schema import list_serial
from utils import format_date


app = FastAPI()

origins = [
    "http://localhost:3000",
    "localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get("/", tags=["root"])
def read_root():
    return {"message": "Welcome to the app! The app features 1 main endpoint: /data."}

@app.get('/data', tags=["data"])
def get_data(turbine_id, start_date, end_date):   
    
    formatted_start_date = format_date(start_date)
    formatted_end_date = format_date(end_date)    

    query = {
        "turbine_id": turbine_id,
        "Dat/Zeit": {
            "$gte": formatted_start_date,
            "$lte": formatted_end_date
        }
    }

    data = list_serial(turbine_collection.find(query))
       
    return data

