const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parse');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
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

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Admin credentials (in production, use environment variables)
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

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

// Function to write projects to CSV
const writeProjects = async (projects) => {
  const csvData = projects.map(project => ({
    Project: project.title,
    Category: project.category,
    Description: project.description
  }));
  
  const csvString = csvData.map(row => 
    Object.values(row).map(value => `"${value}"`).join(',')
  ).join('\n');
  
  await fs.promises.writeFile(csvFilePath, 'Project,Category,Description\n' + csvString);
};

// Admin authentication middleware
const authenticateAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.username !== ADMIN_USERNAME) {
      return res.status(401).json({ error: 'Invalid token' });
    }
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Admin login
app.post('/api/admin/login', async (req, res) => {
  const { username, password } = req.body;
  
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Admin routes
app.post('/api/admin/projects', authenticateAdmin, async (req, res) => {
  try {
    const projects = await readProjects();
    const newProject = {
      id: req.body.title.replace(/\s+/g, '-').toLowerCase(),
      ...req.body
    };
    projects.push(newProject);
    await writeProjects(projects);
    res.json(newProject);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add project' });
  }
});

app.put('/api/admin/projects/:id', authenticateAdmin, async (req, res) => {
  try {
    const projects = await readProjects();
    const index = projects.findIndex(p => p.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    projects[index] = {
      ...projects[index],
      ...req.body,
      id: req.body.title ? req.body.title.replace(/\s+/g, '-').toLowerCase() : projects[index].id
    };
    
    await writeProjects(projects);
    res.json(projects[index]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update project' });
  }
});

app.delete('/api/admin/projects/:id', authenticateAdmin, async (req, res) => {
  try {
    const projects = await readProjects();
    const filteredProjects = projects.filter(p => p.id !== req.params.id);
    await writeProjects(filteredProjects);
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete project' });
  }
});

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
