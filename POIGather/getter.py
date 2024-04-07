import json
import types
import googlemaps
import random
from flask import Flask, request
from flask_cors import CORS

# Initialize the Google Maps client with your API key
gmaps = googlemaps.Client(key='AIzaSyDW2qGfcZXNnkFE7DdfzjJj6i6XtFsuqfE ')
types = ['school','hospital','shopping_mall']

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
  return 'Server Works!'

@app.route('/getLocationsJSON')
def getLocationsJSON():
    # startLat = float(request.args.get('slat', 1.3060073721481869)) # top left of viewport 
    # endLat = float(request.args.get('elat', 1.315768)) # top right of viewport
    # startLong = float(request.args.get('slong', 103.941255)) # top of viewport
    # endLong = float(request.args.get('elong', 103.93056943894132)) # bottom of viewport

    latitude = float(request.args.get('lat',1.3121681))#(endLat + startLat) / 2 #center of viewport 
    longitude = float(request.args.get('long',103.9281638))#(endLong + startLong) / 2 #center of viewport
    radius = 2000 #metres
    places_data = []

    for type in types:
        # print("Currently finding: ", type)
        # Perform a Places Nearby Search request with the specified keyword(s)
        results = gmaps.places_nearby(location=(latitude, longitude), radius=radius, type=type)

        # Process the results and store in a dictionary
        for place in results['results']:
            place_details = gmaps.place(place['place_id'], fields=['name', 'geometry', 'user_ratings_total'])
            # print(place_details)  # Print the place_details response for debugging
            if 'user_ratings_total' in place_details['result']:
                total_reviews = place_details['result']['user_ratings_total']
            else:
                total_reviews = None  # or any default value you want to assign
            if type == 'school':
                if place_details['result']['name'].lower().find("pre") != -1:
                    riskLevel = random.randint(61,100)
                else:
                    riskLevel = random.randint(40,60)
            elif type == 'hospital':
                riskLevel = random.randint(50,80)
            else:
                riskLevel = random.randint(1,40)
            place_data = {
                "name": place_details['result']['name'],
                "latitude": place_details['result']['geometry']['location']['lat'],
                "longitude": place_details['result']['geometry']['location']['lng'],
                "total_reviews": total_reviews,
                "risk" : riskLevel
            }
            places_data.append(place_data)

    places_data = sorted(places_data, key=lambda x: x['risk'], reverse=True)
    return places_data

if __name__ == '__main__':
    app.run(debug=True)