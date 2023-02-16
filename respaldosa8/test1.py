import requests

url = "http://ec2-54-162-2-109.compute-1.amazonaws.com:3000"


response = requests.get(url)
print(response.json())