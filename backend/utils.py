from datetime import datetime


def format_date(date_str):
    date_str = date_str.rstrip('Z')
    date_obj = datetime.fromisoformat(date_str)
    formatted_date = date_obj.strftime("%d.%m.%Y, %H:%M")
    return formatted_date