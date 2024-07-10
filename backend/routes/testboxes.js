var spawn = require('child_process').spawn;
var express = require('express');
var router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

let testboxes = [
  { id: 1, name: 'Testbox 1', status: 'READY', services: [], jobs: [] },
  { id: 2, name: 'Testbox 2', status: 'READY', services: [], jobs: [] },
  { id: 3, name: 'Testbox 3', status: 'READY', services: [], jobs: [] },
  { id: 4, name: 'Testbox 4', status: 'READY', services: [], jobs: [] },
  { id: 5, name: 'Testbox 5', status: 'READY', services: [], jobs: [] },
  { id: 6, name: 'Testbox 6', status: 'READY', services: [], jobs: [] },
];

router.get('/', (req, res) => {
  res.json(testboxes);
});

router.get('/:id', (req, res) => {
  const testbox = testboxes.find(tb => tb.id === parseInt(req.params.id));
  if (!testbox) return res.status(404).send('Testbox not found');
  res.json(testbox);
});

router.post('/:id/claim', (req, res) => {
  const testbox = testboxes.find(tb => tb.id === parseInt(req.params.id));
  if (!testbox) return res.status(404).send('Testbox not found');
  testbox.status = 'PENDING';
  res.send(testbox);
});

router.post('/:id/setup',  upload.single('Dockerfile')), (req, res) => {
  const { repoUrl } = req.body;
  const testbox = testboxes.find(tb => tb.id === parseInt(req.params.id));
  if (!testbox) return res.status(404).send('Testbox not found');
  
  
  // Save the Dockerfile to a temporary location
  const dockerfilePath = `uploads/${req.file.filename}`;

  // Build the Docker image
  const buildCommand = spawn(`docker', ['build', '-t', 'testbox:${testbox.id}', '-f', '${dockerfilePath}','.']);

  
exec(buildCommand, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error building Docker image: ${error}`);
    return res.status(500).send('Error building Docker image');
  } else {
    console.log(`Docker image built successfully: ${stdout}`);
    testbox.status = 'TAKEN';
    res.send('Dockerfile uploaded and built successfully');
    res.send('Setup completed');
  }

spawn(`docker', ['run', 'testbox:${testbox.id}'
  
}); 
};

router.post('/:id/fail', (req, res) => {
  const testbox = testboxes.find(tb => tb.id === parseInt(req.params.id));
  if (!testbox) return res.status(404).send('Testbox not found');
  testbox.status = 'FAILED';
  res.send(testbox);
});

module.exports = router;
