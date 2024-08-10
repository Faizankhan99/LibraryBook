const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const regularUserFilePath = path.join(__dirname, '../csv/regular.csv');
const adminUserFilePath = path.join(__dirname, '../csv/admin.csv');

const parseCSV = (filePath) => {
    return new Promise((resolve, reject) => {
        const results = [];
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => resolve(results))
            .on('error', reject);
    });
};

exports.getBooks = async (req, res) => {
    try {
        const regularBooks = await parseCSV(regularUserFilePath);
        if (req.user.role === 'admin') {
            const adminBooks = await parseCSV(adminUserFilePath);
            return res.json([...regularBooks, ...adminBooks]);
        }
        res.json(regularBooks);
    } catch (error) {
        res.status(500).json({ message: 'Error reading books' });
    }
};

exports.addBook = (req, res) => {
    const { name, author, publicationYear } = req.body;

    if (typeof name !== 'string' || typeof author !== 'string' || typeof publicationYear !== 'number') {
        return res.status(400).json({ message: 'Invalid input data' });
    }

    const newBook = `${name},${author},${publicationYear}\n`;

    fs.appendFile(regularUserFilePath, newBook, (err,data) => {
        if (err) {
            return res.status(500).json({ message: 'Error adding book' });
        }
        res.status(201).json({ message: 'Book added successfully' ,data:data});
    });
};

exports.deleteBook = (req, res) => {
    const { name } = req.body;

    if (typeof name !== 'string') {
        return res.status(400).json({ message: 'Invalid book name' });
    }

    fs.readFile(regularUserFilePath, 'utf-8', (err, data) => {
        if (err) return res.status(500).json({ message: 'Error reading file' });

        const rows = data.split('\n');
        const filteredRows = rows.filter((row) => {
            const [bookName] = row.split(',');
            return bookName.toLowerCase() !== name.toLowerCase();
        });

        fs.writeFile(regularUserFilePath, filteredRows.join('\n'), (err) => {
            if (err) return res.status(500).json({ message: 'Error deleting book' });

            res.status(200).json({ message: 'Book deleted successfully' });
        });
    });
};
