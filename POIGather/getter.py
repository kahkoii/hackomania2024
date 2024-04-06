import json
import types
import googlemaps
import random

# Initialize the Google Maps client with your API key
gmaps = googlemaps.Client(key='AIzaSyDW2qGfcZXNnkFE7DdfzjJj6i6XtFsuqfE ')

startLat = 1.3060073721481869 # top left of viewport 
endLat = 1.315768 # top right of viewport
startLong = 103.941255 # top of viewport
endLong = 103.93056943894132 # bottom of viewport  , , 
latitude = (endLat + startLat) / 2 #center of viewport 
print(latitude)
longitude = (endLong + startLong) / 2 #center of viewport
print(longitude)
radius = 1000 #metres

types = ['school','hospital','shopping_mall']
places_data = []
for type in types:
    print("Currently finding: ", type)
    # Perform a Places Nearby Search request with the specified keyword(s)
    results = gmaps.places_nearby(location=(latitude, longitude), radius=radius, type=type)

    # Process the results and store in a dictionary
    for place in results['results']:
        place_details = gmaps.place(place['place_id'], fields=['name', 'geometry', 'user_ratings_total'])
        print(place_details)  # Print the place_details response for debugging
        if 'user_ratings_total' in place_details['result']:
            total_reviews = place_details['result']['user_ratings_total']
        else:
            total_reviews = None  # or any default value you want to assign
        place_data = {
            "name": place_details['result']['name'],
            "latitude": place_details['result']['geometry']['location']['lat'],
            "longitude": place_details['result']['geometry']['location']['lng'],
            "total_reviews": total_reviews,
            "risk" : random.randint(1,100)
        }
        if startLat <= place_data["latitude"] <= endLat and endLong <= place_data["longitude"] <= startLong:
            places_data.append(place_data)
print(len(places_data))
with open('testPlaces.json', 'w') as f:
    places_data = sorted(places_data, key=lambda x: x['risk'], reverse=True)
    json.dump(places_data, f, indent=4)
