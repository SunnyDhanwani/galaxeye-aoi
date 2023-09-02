# Galaxeye AOI Task

## Instructions for Execution:
- To initiate, either clone the repository or retrieve the zip file

### Run with Docker:
   - In your terminal, navigate to the project directory and execute the following command `docker-compose -f docker-compose.dev.yml up`
   - Then, the application can be accessed at [localhost:5173](http://localhost:5173/)

### Run without Docker:
   - In your terminal, navigate to the project directory and execute the following command: `npm install`
   - After all dependencies have been installed, run the following command in your terminal: `npm run dev` to access the application at [localhost:5173](http://localhost:5173/)

### How does the area of interest (AOI) work?
   - There is a base map and an option to draw an AOI (Area of Interest) in any polygon shape
   - Upon drawing any polygon, the area will be presented with all the tiles (pre-configured satellite image's metadata) that intersect that AOI
   - To draw a new polygon, delete the current polygon using the delete button
