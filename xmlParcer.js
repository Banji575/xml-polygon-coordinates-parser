const xml2js = require('xml2js');
const fs = require('fs');
const path = require('path');

// Функция для парсинга XML файла
const parseXMLFile = (filePath) => {
    const xml = fs.readFileSync(filePath, 'utf8');
    const parser = new xml2js.Parser();

    parser.parseString(xml, (err, result) => {
        if (err) {
            console.error(`Error parsing XML from ${filePath}:`, err);
            return;
        }

        const polygons = result.bodydef.bodies[0].body[0].fixture[0].polygon;
        const vertices = polygons.reduce((acc, polygon) => {
            const coords = polygon.vertex.map(v => ({
                x: parseFloat(v.$.x),
                y: parseFloat(v.$.y)
            }));
            return acc.concat(coords);
        }, []);

        // Определение имени выходного файла
        const outputFileName = path.basename(filePath, '.xml') + '.json';
        const outputPath = path.join('output', outputFileName);

        // Запись результата в файл
        fs.writeFileSync(outputPath, JSON.stringify(vertices, null, 2));
        console.log(`Processed ${filePath}, result saved to ${outputPath}`);
    });
};

// Чтение и обработка каждого XML файла в папке input
const inputDirPath = 'input';
fs.readdirSync(inputDirPath).forEach(file => {
    const filePath = path.join(inputDirPath, file);
    if (path.extname(file) === '.xml') {
        parseXMLFile(filePath);
    }
});
