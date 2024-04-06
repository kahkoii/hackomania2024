import json
import googlemaps
import random

# Initialize the Google Maps client with your API key
gmaps = googlemaps.Client(key='AIzaSyDW2qGfcZXNnkFE7DdfzjJj6i6XtFsuqfE ')

# Define the bounds of the area (latitude and longitude ranges)
startLat = 1.3052
endLat = 1.3163
startLong = 103.925
endLong = 103.941
latitude1,latitude2 = 1.3052, 1.3163
longitude1,longitude2 = 103.925, 103.941
#The Summit (Top right boundary) Latitude: 1.3163969 Longitude: 103.9410684
#East Coast Park carpark (bottom left) Latitude: 1.3052181 Longitude: 103.9257876


# Specify the radius of the area (in meters)
radius = 50  # Example radius

alreadyCounted = {}
places_data = []
# Make the Text Search request without specifying types
while latitude1 <= latitude2:
    while longitude1 <= longitude2:
        results = gmaps.places_nearby(location=(latitude1, longitude1), radius=radius)
        # Process the results and store in a dictionary
        for place in results['results']:
            place_details = gmaps.place(place['place_id'], fields=['name', 'geometry', 'user_ratings_total'])
            print(place_details)  # Print the place_details response for debugging
            if place_details['result']['name'] in alreadyCounted:
                continue
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
            alreadyCounted[place_details['result']['name']] = True
            if 1.3052181 <= place_data["latitude"] <= 1.3163969 and 103.9257876 <= place_data["longitude"] <= 103.9410684 and place_data["total_reviews"] and place_data["total_reviews"] >= 5:
                places_data.append(place_data)
        longitude1 += 0.001
        print(len(places_data))
    longitude1 = startLong
    latitude1 += 0.001
# Write data to a JSON file
with open('places.json', 'w') as f:
    places_data = sorted(places_data, key=lambda x: x['risk'], reverse=True)
    json.dump(places_data, f, indent=4)
