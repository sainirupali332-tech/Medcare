const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/trainingdb')
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

// Schema
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    subject: String,
    message: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Model
const Contact = mongoose.model('Contacts', contactSchema);

// API
app.post('/api/contact', async (req, res) => {

    try {

        const { name, email, subject, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: 'Please fill all required fields.'
            });
        }

        const newContact = new Contact({
            name,
            email,
            subject,
            message
        });

        await newContact.save();

        res.status(200).json({
            success: true,
            message: 'Contact saved successfully',
            data: newContact
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

app.get('/api/contacts', async (req, res) => {

    try {

        const contacts = await Contact.find();

        return res.status(200).json({
            success: true,
            message: "Contacts fetched successfully!",
            data: contacts
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
});

app.get('/', (req, res) => {
    res.send('Node.js Contact API Running...');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});