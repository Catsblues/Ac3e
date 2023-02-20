import requests

url = "http://54.162.2.109:80/"


response = requests.get(url)
print(response.json())