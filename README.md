# Promotion home assignment

Build Promotions screen that will have a dynamic table structure and will be able
to host at least 10,000 rows with infinite scrolling without any performances issues

## Installation

Go to server/client directory

```bash
npm install
npm start
```

To open mongodb image with a docker:

```bash
docker run -d -p 27017:27017 --name mongodb mongo:3
docker exec -it mongodb bash
```

## Usage

Visit [http://localhost:3000/](http://localhost:3000/)

For generate 10K new fake promotion click on 'GENERATE NEW PROMOTIONS'
