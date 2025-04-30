const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
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

// Data file path
const dataFilePath = path.join(__dirname, 'data', 'projects.json');

// Ensure data directory exists
if (!fs.existsSync(path.join(__dirname, 'data'))) {
  fs.mkdirSync(path.join(__dirname, 'data'));
}

// Initialize projects array
let projects = [];

// Load existing projects
try {
  if (fs.existsSync(dataFilePath)) {
    const data = fs.readFileSync(dataFilePath, 'utf8');
    projects = JSON.parse(data);
  }
} catch (error) {
  console.error('Error loading projects:', error);
}

// Save projects to file
const saveProjects = () => {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(projects, null, 2));
  } catch (error) {
    console.error('Error saving projects:', error);
  }
};

// API Routes
app.get('/api/projects', (req, res) => {
  res.json(projects);
});

app.get('/api/projects/:id', (req, res) => {
  const project = projects.find(p => p.id === req.params.id);
  if (!project) {
    return res.status(404).json({ error: 'Project not found' });
  }
  res.json(project);
});

app.post('/api/projects', (req, res) => {
  const { title, description, technologies, imageUrl, githubUrl, liveUrl } = req.body;
  
  if (!title || !description) {
    return res.status(400).json({ error: 'Title and description are required' });
  }

  const newProject = {
    id: Date.now().toString(),
    title,
    description,
    technologies: technologies || [],
    imageUrl: imageUrl || '',
    githubUrl: githubUrl || '',
    liveUrl: liveUrl || '',
    createdAt: new Date().toISOString()
  };

  projects.push(newProject);
  saveProjects();
  res.status(201).json(newProject);
});

app.put('/api/projects/:id', (req, res) => {
  const index = projects.findIndex(p => p.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Project not found' });
  }

  const updatedProject = { ...projects[index], ...req.body };
  projects[index] = updatedProject;
  saveProjects();
  res.json(updatedProject);
});

app.delete('/api/projects/:id', (req, res) => {
  const index = projects.findIndex(p => p.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Project not found' });
  }

  projects.splice(index, 1);
  saveProjects();
  res.status(204).send();
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(port, () => {
  console.log(`Backend running on port ${port}`);
});
