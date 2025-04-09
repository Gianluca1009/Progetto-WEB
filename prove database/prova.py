import http.client
import json

conn = http.client.HTTPSConnection("v3.football.api-sports.io")

headers = {
    'x-rapidapi-host': "v3.football.api-sports.io",
    'x-rapidapi-key': "de4877e73394d60fa8216a8edfadd9c0"
}

conn.request("GET", "/players?id=276", headers=headers)

res = conn.getresponse()
data = res.read()

# Converti la risposta in JSON e formattala in modo leggibile
json_data = json.loads(data.decode("utf-8"))
formatted_json = json.dumps(json_data, indent=4, ensure_ascii=False)

print(formatted_json)
