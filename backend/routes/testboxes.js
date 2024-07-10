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
  const buildCommand = spawn("docker", ["build", "-t", "testbox:${testbox.id}", "-f", "${dockerfilePath}", "."]);
  
  buildCommand.stdout.on('data', (data) => {
    testbox.logs += data.toString();
  }); 

  buildCommand.stderr.on('data', (data) => {
    // Append the build errors to the testbox logs
    testbox.logs += data.toString();
  });

  buildCommand.on('close', (code) => {
    if (code === 0) {
      // Docker image built successfully
      // Run the Docker container
      const runCommand = spawn("docker", ["run", "testbox:${testbox.id}"]);

      runCommand.stdout.on('data', (data) => {
        // Append the run output to the testbox logs
        testbox.logs += data.toString();
      });

      runCommand.stderr.on('data', (data) => {
        // Append the run errors to the testbox logs
        testbox.logs += data.toString();
      });

      runCommand.on('close', (code) => {
        if (code === 0) {
          // Docker container started successfully
          testbox.status = 'TAKEN';
          res.send('Dockerfile uploaded, built, and started successfully');
        } else {
          // Error starting the Docker container
          testbox.status = 'FAILED';
          res.status(500).send('Error starting Docker container');
        }
      });
    } else {
      // Error building the Docker image
      testbox.status = 'FAILED';
      res.status(500).send('Error building Docker image');
    }
  });  
}; 

router.post('/:id/fail', (req, res) => {
  const testbox = testboxes.find(tb => tb.id === parseInt(req.params.id));
  if (!testbox) return res.status(404).send('Testbox not found');
  testbox.status = 'FAILED';
  res.send(testbox);
});

module.exports = router;
