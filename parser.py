import requests

def get_response(search_term):
    base_url = "https://api.r46.technodom.kz/search"
    params = {
        'shop_id': '74fd3b613553b97107bc4502752749',
        'did': 'n5qpmRNMxF',
        'type': 'full_search',
        'sid': 'XE7PRMhACg',
        'seance': 'XE7PRMhACg',
        'search_query': search_term,
        'input_query': '',
        'category_limit': '1000'
    }
    
    response = requests.get(url=base_url, params=params)
    if response.status_code == 200:
        try:
            return response.json()
        except ValueError:
            return "Invalid JSON response"
    else:
        return f"Bad response {response.status_code}"

# Example usage
search_term = "samsung"  # Example search term
response_data = get_response(search_term)
data = []
for item in response_data["products"]:
    prod = {
        "name": None,
        "price": None,
        "image": None,
        "plan": None
    }
    prod["name"] = item["name"]
    prod["price"] = item["price_formatted"]
    prod["image"] = item["image_url"]
    
    for i in item["params"]:
        if i["key"] == "Рассрочка":
            prod["plan"] = i["values"][0]
            break
        
    data.append(prod)
            
for i in data:
    print(i, "\n\n\n")
    
