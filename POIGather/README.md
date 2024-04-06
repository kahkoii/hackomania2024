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
pip install -r requirements
```
3. Run API server
```sh
py getter.py
```

## API Endpoint
### GET /getLocationsJSON
```sh
http://127.0.0.1:5000/getLocationsJSON?slat=1.3060073721481869&elat=1.315768&slong=103.941255&elong=103.93056943894132
```

Optional Query Parameters:
- `slat`: Start of Latitude (map left bound)
- `elat`: End of Latitude (map right bound)
- `slong`: Start of Longitude (map top bound)
- `elong`: End of Longitude (map bottom bound)