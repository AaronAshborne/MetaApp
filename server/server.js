const express = require('express');
const axios = require('axios');
const winston = require('winston');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 8080;

// MongoDB connection
mongoose.connect('mongodb+srv://Aaron4:ClusterForAaron4@metaapp.b8pw8n5.mongodb.net/Accounts?retryWrites=true&w=majority&appName=MetaApp')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// User model
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
});
const User = mongoose.model('User', userSchema);

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

// Endpoint to handle user signup
app.post('/api/signup', async (req, res) => {
    const { name, email, password } = req.body;
    
    // Basic validation
    if (!name || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already in use' });
        }

        const newUser = new User({ name, email, password });
        await newUser.save();

        res.status(201).json({ message: 'Signup successful' });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ error: `Internal server error: ${error.message}` });
    }
});

// Endpoint to handle user login
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        // Check password
        if (user.password !== password) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Logger setup
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.Console({
            format: winston.format.simple()
        })
    ]
});

// Endpoint to fetch user data
app.get('/api/user-data', async (req, res) => {
    try {
        const accessToken = 'EAA8ADjey6ooBO6hb1ryfZBanZCB34gveb898I8HlgT2rCqUxrD3cI92wPY7ZCGrjxME9C73eozdi2RKgwBEyLB5li3SFmls9aEZALVEDavTz8KIE5pCdbiYKzcZBC5eA3tvCQjqyJwKuIhWpZCnUYemaOgOjkWSv6MuZAmzhgFqUFfLiVRdpfsbisFUrroVi6yx'; // Replace with your actual access token
        const url = `https://graph.facebook.com/v20.0/4222185714674314?access_token=${accessToken}`;

        const response = await axios.get(url);

        if (!response.data) {
            logger.info('No data received from Meta API');
            throw new Error('No data received from Meta API');
        }

        logger.info('Data fetched successfully from Meta API');
        res.json(response.data);
    } catch (error) {
        logger.error('Error fetching user data from Meta Graph API:', error.response ? error.response.data : error.message);
        res.status(500).send(`Error fetching user data from Meta Graph API: ${error.response ? error.response.data : error.message}`);
    }
});

app.listen(port, () => {
    logger.info(`Server is running on port ${port}`);
});
