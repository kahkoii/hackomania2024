# QuickSave - React Project

QuickSave is a first responder system meant to aid our heroes in times of crises, including natural disasters and emergencies. QuickSave combines a number of featuree that work together to tive users real-time data that is quick to absorb, allowing them to make better decisions to save people. Oour features utilize the use of big data analytics to provide custom data with the goal of conveying the status of an ongoing emergency.

## Project Setup

Clone this repository in your desired directory and run `yarn install`.

## Relevant Commands

`yarn start` - to run the dev server

# Points of Interest API Server
## Setup Instructions
1. Initialize local Python venv
```sh
cd POIGather
py -m venv .venv
```
2. Setup virtual environment
```sh
.venv\Scripts\activate
pip install -r requirements.txt
```
3. Run API server
```sh
py getter.py
```

## API Endpoint
### GET /getLocationsJSON
```sh
http://127.0.0.1:5000/getLocationsJSON?lat=1.24433&long=103.21444
```

Optional Query Parameters:
- `lat`: latitude
- `long`: longitude

## Test Cases
Enter google map url, (eg. https://www.google.com/maps/@1.317967,103.9089941,17z?entry=ttu) into the search bar to get all the point of interest.
Navigate through to the place you want to go.