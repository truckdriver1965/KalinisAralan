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
const donationsFilePath = path.join(__dirname, 'donations.json');

// Initialize data files if they don't exist
if (!fs.existsSync(recommendationsFilePath)) {
  fs.writeFileSync(recommendationsFilePath, JSON.stringify([]));
}

if (!fs.existsSync(donationsFilePath)) {
  fs.writeFileSync(donationsFilePath, JSON.stringify([]));
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
    const data = JSON.parse(fs.readFileSync(recommendationsFilePath));
    const newRecommendation = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      status: 'pending',
      ...req.body
    };
    
    data.push(newRecommendation);
    fs.writeFileSync(recommendationsFilePath, JSON.stringify(data, null, 2));
    
    res.status(201).json(newRecommendation);
  } catch (error) {
    console.error('Error saving recommendation:', error);
    res.status(500).json({ message: 'Error saving recommendation' });
  }
});

app.put('/api/recommendations/:id', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(recommendationsFilePath));
    const index = data.findIndex(item => item.id === req.params.id);
    
    if (index === -1) {
      return res.status(404).json({ message: 'Recommendation not found' });
    }
    
    data[index] = { ...data[index], ...req.body };
    fs.writeFileSync(recommendationsFilePath, JSON.stringify(data, null, 2));
    
    res.json(data[index]);
  } catch (error) {
    console.error('Error updating recommendation:', error);
    res.status(500).json({ message: 'Error updating recommendation' });
  }
});

app.delete('/api/recommendations/:id', (req, res) => {
  try {
    let data = JSON.parse(fs.readFileSync(recommendationsFilePath));
    const filteredData = data.filter(item => item.id !== req.params.id);
    
    if (filteredData.length === data.length) {
      return res.status(404).json({ message: 'Recommendation not found' });
    }
    
    fs.writeFileSync(recommendationsFilePath, JSON.stringify(filteredData, null, 2));
    res.json({ message: 'Recommendation deleted successfully' });
  } catch (error) {
    console.error('Error deleting recommendation:', error);
    res.status(500).json({ message: 'Error deleting recommendation' });
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
    console.log('Received donation request:', req.body);
    
    const data = JSON.parse(fs.readFileSync(donationsFilePath));
    const newDonation = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      status: 'pending',
      ...req.body
    };
    
    data.push(newDonation);
    fs.writeFileSync(donationsFilePath, JSON.stringify(data, null, 2));
    
    console.log('Donation saved successfully:', newDonation.id);
    res.status(201).json(newDonation);
  } catch (error) {
    console.error('Error saving donation:', error);
    res.status(500).json({ message: 'Error saving donation: ' + error.message });
  }
});

app.put('/api/donations/:id', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(donationsFilePath));
    const index = data.findIndex(item => item.id === req.params.id);
    
    if (index === -1) {
      return res.status(404).json({ message: 'Donation not found' });
    }
    
    data[index] = { ...data[index], ...req.body };
    fs.writeFileSync(donationsFilePath, JSON.stringify(data, null, 2));
    
    res.json(data[index]);
  } catch (error) {
    console.error('Error updating donation:', error);
    res.status(500).json({ message: 'Error updating donation' });
  }
});

app.delete('/api/donations/:id', (req, res) => {
  try {
    let data = JSON.parse(fs.readFileSync(donationsFilePath));
    const filteredData = data.filter(item => item.id !== req.params.id);
    
    if (filteredData.length === data.length) {
      return res.status(404).json({ message: 'Donation not found' });
    }
    
    fs.writeFileSync(donationsFilePath, JSON.stringify(filteredData, null, 2));
    res.json({ message: 'Donation deleted successfully' });
  } catch (error) {
    console.error('Error deleting donation:', error);
    res.status(500).json({ message: 'Error deleting donation' });
  }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });