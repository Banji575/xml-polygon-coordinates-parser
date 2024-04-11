# XML to JSON Polygon Coordinates Parser

## Overview
This script is designed to parse XML files containing polygon vertex coordinates and convert them into a flat JSON structure. Each XML file in the `input` directory is processed individually, extracting all coordinates from `<polygon>` tags. The results are then saved as JSON files in the `output` directory, maintaining the same base filename.

## Installation
Before running the script, ensure you have Node.js installed on your system. You will also need to install the `xml2js` package, which can be done by running the following command in your project's root directory:

```bash
npm install xml2js
```


## Directory Structure
Ensure your project directory has the following structure:

```
project/
├── input/
├── output/
├── xmlParcer.js
└── package.json
```


- The `input` directory should contain all the XML files you wish to process.
- The `output` directory will be used to store the resulting JSON files.
- `xmlParser.js` is the script file containing the parsing logic.
- `package.json` should include `xml2js` as a dependency.

## Running the Script
To run the script, navigate to your project's root directory in the terminal and execute:

```bash 
node xmlParcer.js
```


The script will automatically process each XML file found in the `input` directory and output the corresponding JSON files in the `output` directory.

## File Format
The input XML files should have the following structure:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<bodydef version="1.0">
    <bodies numBodies="1">
        <body name="ExampleBody" dynamic="true" numFixtures="1">
            <fixture ...>
                <polygon numVertexes="3">
                    <vertex x="1.0" y="2.0" />
                    <vertex x="3.0" y="4.0" />
                    <vertex x="5.0" y="6.0" />
                </polygon>
                <!-- More polygons can be added here -->
            </fixture>
        </body>
    </bodies>
</bodydef>
```

Each <vertex> within <polygon> tags will be extracted and converted into JSON format.

The output JSON will be an array of objects, each representing a vertex with x and y coordinates:

```json
[
    {
        "x": 1.0,
        "y": 2.0
    },
    {
        "x": 3.0,
        "y": 4.0
    },
    {
        "x": 5.0,
        "y": 6.0
    }
    // More vertices will follow
]
```

## Notes
The script only processes .xml files and ignores all other file types in the input directory.
Ensure the output directory exists before running the script to avoid any file writing errors.

