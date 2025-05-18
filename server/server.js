const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Data file paths
const recommendationsFilePath = path.join(__dirname, 'recommendations.json');
const messagesFilePath = path.join(__dirname, 'messages.json');
const donationsFilePath = path.join(__dirname, 'donations.json');

// Initialize data files if they don't exist
if (!fs.existsSync(recommendationsFilePath)) {
  fs.writeFileSync(recommendationsFilePath, JSON.stringify([]));
  console.log('Created recommendations.json file');
}

if (!fs.existsSync(messagesFilePath)) {
  fs.writeFileSync(messagesFilePath, JSON.stringify([]));
  console.log('Created messages.json file');
}

if (!fs.existsSync(donationsFilePath)) {
  fs.writeFileSync(donationsFilePath, JSON.stringify([]));
  console.log('Created donations.json file');
}

// Recommendations API endpoints
app.get('/api/recommendations', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(recommendationsFilePath));
    res.json(data);
  } catch (error) {
    console.error('Error reading recommendations:', error);
    res.status(500).json({ message: 'Error fetching recommendations' });
  }
});

app.post('/api/recommendations', (req, res) => {
  try {
    console.log('Received recommendation:', req.body);
    const data = JSON.parse(fs.readFileSync(recommendationsFilePath));
    const newRecommendation = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      status: 'pending',
      ...req.body
    };
    
    data.push(newRecommendation);
    fs.writeFileSync(recommendationsFilePath, JSON.stringify(data, null, 2));
    console.log('Saved recommendation:', newRecommendation.id);
    
    res.status(201).json(newRecommendation);
  } catch (error) {
    console.error('Error saving recommendation:', error);
    res.status(500).json({ message: 'Error saving recommendation: ' + error.message });
  }
});

// Messages API endpoints
app.get('/api/messages', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(messagesFilePath));
    res.json(data);
  } catch (error) {
    console.error('Error reading messages:', error);
    res.status(500).json({ message: 'Error fetching messages' });
  }
});

app.post('/api/messages', (req, res) => {
  try {
    console.log('Received message:', req.body);
    const data = JSON.parse(fs.readFileSync(messagesFilePath));
    const newMessage = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      status: 'unread',
      ...req.body
    };
    
    data.push(newMessage);
    fs.writeFileSync(messagesFilePath, JSON.stringify(data, null, 2));
    console.log('Saved message:', newMessage.id);
    
    res.status(201).json(newMessage);
  } catch (error) {
    console.error('Error saving message:', error);
    res.status(500).json({ message: 'Error saving message: ' + error.message });
  }
});

// Donations API endpoints
app.get('/api/donations', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(donationsFilePath));
    res.json(data);
  } catch (error) {
    console.error('Error reading donations:', error);
    res.status(500).json({ message: 'Error fetching donations' });
  }
});

app.post('/api/donations', (req, res) => {
  try {
    console.log('Received donation:', req.body);
    const data = JSON.parse(fs.readFileSync(donationsFilePath));
    const newDonation = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      status: 'pending',
      ...req.body
    };
    
    data.push(newDonation);
    fs.writeFileSync(donationsFilePath, JSON.stringify(data, null, 2));
    console.log('Saved donation:', newDonation.id);
    
    res.status(201).json(newDonation);
  } catch (error) {
    console.error('Error saving donation:', error);
    res.status(500).json({ message: 'Error saving donation: ' + error.message });
  }
});

// Add or update this PUT endpoint for recommendations
app.put('/api/recommendations/:id', (req, res) => {
  try {
    console.log('Updating recommendation:', req.params.id, req.body);
    const data = JSON.parse(fs.readFileSync(recommendationsFilePath));
    const index = data.findIndex(item => item.id === req.params.id);
    
    if (index === -1) {
      return res.status(404).json({ message: 'Recommendation not found' });
    }
    
    // Update the recommendation with new data
    data[index] = { ...data[index], ...req.body };
    fs.writeFileSync(recommendationsFilePath, JSON.stringify(data, null, 2));
    console.log('Updated recommendation:', data[index]);
    
    res.json(data[index]);
  } catch (error) {
    console.error('Error updating recommendation:', error);
    res.status(500).json({ message: 'Error updating recommendation: ' + error.message });
  }
});

// Add this DELETE endpoint for deleting recommendations
app.delete('/api/recommendations/:id', (req, res) => {
  try {
    console.log('Deleting recommendation:', req.params.id);
    const data = JSON.parse(fs.readFileSync(recommendationsFilePath));
    const index = data.findIndex(item => item.id === req.params.id);
    
    if (index === -1) {
      return res.status(404).json({ message: 'Recommendation not found' });
    }
    
    // Remove the recommendation
    const deleted = data.splice(index, 1)[0];
    fs.writeFileSync(recommendationsFilePath, JSON.stringify(data, null, 2));
    console.log('Deleted recommendation:', deleted);
    
    res.json({ message: 'Recommendation deleted successfully', deleted });
  } catch (error) {
    console.error('Error deleting recommendation:', error);
    res.status(500).json({ message: 'Error deleting recommendation: ' + error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API endpoints available at http://localhost:${PORT}/api/`);
});