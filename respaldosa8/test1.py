import requests

url = "http://127.0.0.1:3000"


response = requests.get(url)
print(response.json())