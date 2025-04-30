const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parse');
const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());
app.use(express.static('public'));

// CSV file path
const csvFilePath = path.join(__dirname, 'Portfolio_Project_Categories.csv');

// Function to read and parse CSV
const readProjects = () => {
  return new Promise((resolve, reject) => {
    const projects = [];
    fs.createReadStream(csvFilePath)
      .pipe(csv.parse({ columns: true, trim: true }))
      .on('data', (row) => {
        projects.push({
          id: row.Project.replace(/\s+/g, '-').toLowerCase(),
          title: row.Project,
          category: row.Category,
          description: row.Description,
          technologies: ['Unity', 'C#'],
          imageUrl: `/project-images/${row.Project.replace(/\s+/g, '-').toLowerCase()}.jpg`,
          videoUrl: `/project-videos/${row.Project.replace(/\s+/g, '-').toLowerCase()}.mp4`,
        });
      })
      .on('end', () => resolve(projects))
      .on('error', reject);
  });
};

// Get all categories
app.get('/api/categories', async (req, res) => {
  try {
    const projects = await readProjects();
    const categories = [...new Set(projects.map(p => p.category))].sort();
    res.json(categories);
  } catch (error) {
    console.error('Error reading categories:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

// Get all projects
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await readProjects();
    res.json(projects);
  } catch (error) {
    console.error('Error reading projects:', error);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

// Get projects by category
app.get('/api/projects/category/:category', async (req, res) => {
  try {
    const projects = await readProjects();
    const categoryProjects = projects.filter(p => 
      p.category.toLowerCase() === req.params.category.toLowerCase()
    );
    res.json(categoryProjects);
  } catch (error) {
    console.error('Error reading projects:', error);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

// Get project by ID
app.get('/api/projects/:id', async (req, res) => {
  try {
    const projects = await readProjects();
    const project = projects.find(p => p.id === req.params.id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    console.error('Error reading project:', error);
    res.status(500).json({ error: 'Failed to fetch project' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(port, () => {
  console.log(`Backend running on port ${port}`);
});
