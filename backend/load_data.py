import pandas as pd
from datetime import datetime
from connect_db import turbine_collection


csv_files = ['../csv_data/Turbine1.csv', '../csv_data/Turbine2.csv']

for file in csv_files:
    data = pd.read_csv(file, delimiter=';', decimal=',')
    data.columns = data.columns.str.strip()
    
    turbine_id = file.split('/')[-1].split('.')[0]  
    data['turbine_id'] = turbine_id
    print(turbine_id)    

    records = data.to_dict('records')

    turbine_collection.insert_many(records)

print("Data loaded into MongoDB successfully.")

# result = turbine_collection.delete_many({})
# print(f"{result.deleted_count} documents deleted.")
