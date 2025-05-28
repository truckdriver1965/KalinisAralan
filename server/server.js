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
const contactFilePath = path.join(__dirname, 'contact.json');


// Initialize data files if they don't exist
if (!fs.existsSync(recommendationsFilePath)) {
  fs.writeFileSync(recommendationsFilePath, JSON.stringify([]));
}


if (!fs.existsSync(donationsFilePath)) {
  fs.writeFileSync(donationsFilePath, JSON.stringify([]));
}


if (!fs.existsSync(contactFilePath)) {
  fs.writeFileSync(contactFilePath, JSON.stringify([]));
}


// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});


// Recommendations API endpoints
app.get('/api/recommendations', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(recommendationsFilePath));
    // Sort data by timestamp, newest first
    data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
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


// Contact API endpoints (for the contact form)
app.get('/api/contact', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(contactFilePath));
    // Sort data by createdAt date, newest first
    data.sort((a, b) => new Date(b.createdAt || b.timestamp) - new Date(a.createdAt || a.timestamp));
    res.json(data);
  } catch (error) {
    console.error('Error reading contact submissions:', error);
    res.status(500).json({ message: 'Error fetching contact submissions' });
  }
});


app.post('/api/contact', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(contactFilePath));
    const newContact = {
      _id: Date.now().toString(), // Using _id to match what frontend expects
      createdAt: new Date().toISOString(),
      status: 'pending',
      ...req.body
    };
   
    // Log the new contact for debugging
    console.log('New contact submission:', newContact);
   
    data.push(newContact);
    fs.writeFileSync(contactFilePath, JSON.stringify(data, null, 2));
   
    // Also add to recommendations for backward compatibility
    try {
      const recommendations = JSON.parse(fs.readFileSync(recommendationsFilePath));
      const recommendationEntry = {
        id: newContact._id,
        timestamp: newContact.createdAt,
        status: 'pending',
        name: newContact.name,
        email: newContact.email,
        category: newContact.subject,
        message: newContact.message,
        phone: newContact.phone
      };
      recommendations.push(recommendationEntry);
      fs.writeFileSync(recommendationsFilePath, JSON.stringify(recommendations, null, 2));
    } catch (recError) {
      console.error('Error adding to recommendations:', recError);
    }
   
    res.status(201).json(newContact);
  } catch (error) {
    console.error('Error saving contact submission:', error);
    res.status(500).json({ message: 'Error saving contact submission' });
  }
});


app.put('/api/contact/:id', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(contactFilePath));
    const index = data.findIndex(item => item._id === req.params.id);
   
    if (index === -1) {
      return res.status(404).json({ message: 'Contact submission not found' });
    }
   
    data[index] = { ...data[index], ...req.body };
    fs.writeFileSync(contactFilePath, JSON.stringify(data, null, 2));
   
    res.json(data[index]);
  } catch (error) {
    console.error('Error updating contact submission:', error);
    res.status(500).json({ message: 'Error updating contact submission' });
  }
});


app.delete('/api/contact/:id', (req, res) => {
  try {
    let data = JSON.parse(fs.readFileSync(contactFilePath));
    const filteredData = data.filter(item => item._id !== req.params.id);
   
    if (filteredData.length === data.length) {
      return res.status(404).json({ message: 'Contact submission not found' });
    }
   
    fs.writeFileSync(contactFilePath, JSON.stringify(filteredData, null, 2));
    res.json({ message: 'Contact submission deleted successfully' });
  } catch (error) {
    console.error('Error deleting contact submission:', error);
    res.status(500).json({ message: 'Error deleting contact submission' });
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
    const data = JSON.parse(fs.readFileSync(donationsFilePath));
    const newDonation = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      status: 'pending',
      ...req.body
    };
   
    data.push(newDonation);
    fs.writeFileSync(donationsFilePath, JSON.stringify(data, null, 2));
   
    res.status(201).json(newDonation);
  } catch (error) {
    console.error('Error saving donation:', error);
    res.status(500).json({ message: 'Error saving donation' });
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


// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ message: 'Internal server error', error: err.message });
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


// Combined endpoint for both contact and recommendations
app.get('/api/all-recommendations', (req, res) => {
  try {
    // Get contact data
    const contactData = fs.existsSync(contactFilePath) ?
      JSON.parse(fs.readFileSync(contactFilePath)) : [];
   
    // Get recommendations data
    const recommendationsData = fs.existsSync(recommendationsFilePath) ?
      JSON.parse(fs.readFileSync(recommendationsFilePath)) : [];
   
    // Map contact data to match recommendation format
    const formattedContactData = contactData.map(item => ({
      id: item._id,
      _id: item._id,
      timestamp: item.createdAt,
      createdAt: item.createdAt,
      status: item.status || 'pending',
      name: item.name,
      email: item.email,
      subject: item.subject,
      category: item.subject,
      message: item.message,
      phone: item.phone
    }));
   
    // Combine both datasets
    const combinedData = [...recommendationsData, ...formattedContactData];
   
    // Remove duplicates based on id/_id
    const uniqueData = [];
    const idSet = new Set();
   
    for (const item of combinedData) {
      const itemId = item.id || item._id;
      if (!idSet.has(itemId)) {
        idSet.add(itemId);
        uniqueData.push(item);
      }
    }
   
    // Sort by date, newest first
    uniqueData.sort((a, b) => {
      const dateA = new Date(a.timestamp || a.createdAt);
      const dateB = new Date(b.timestamp || b.createdAt);
      return dateB - dateA;
    });
   
    res.json(uniqueData);
  } catch (error) {
    console.error('Error fetching combined recommendations:', error);
    res.status(500).json({ message: 'Error fetching combined recommendations' });
  }
});
