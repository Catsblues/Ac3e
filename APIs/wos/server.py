import requests

apikey = "cc369e7fe729a62bbb01048470df4ed604027c45"
url = "https://wos-api.clarivate.com/api/woslite/?databaseId=WOK&usrQuery=DO%3D%2810.1080%2F00207179.2014.924630%29&count=1&firstRecord=1"

response = requests.get(url, headers = {"X-ApiKey" : apikey})
print(response)
print(response.content.decode())
