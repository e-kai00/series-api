def individual_serial(turbine):
    return {
        "id": str(turbine["_id"]),
        "Dat/Zeit": turbine["Dat/Zeit"],
        "Wind": turbine["Wind"],
        "Leistung": turbine["Leistung"],        
        "turbine_id": turbine["turbine_id"],
    }

def list_serial(turbines):
    return [individual_serial(turbine) for turbine in turbines] 
