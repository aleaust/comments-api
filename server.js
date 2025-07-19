const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import cors
const db = require('./database'); // Ensure this path is correct
const app = express();

app.use(bodyParser.json());
app.use(cors()); // Use cors

// Utility function to get IP address
function getClientIp(req) {
  const xForwardedFor = req.headers['x-forwarded-for'];
  if (xForwardedFor) {
    return xForwardedFor.split(',')[0];
  }
  return req.connection.remoteAddress;
}

// Endpoint to read comments
app.get('/comments', (req, res) => {
  db.all('SELECT * FROM comments', (err, rows) => {
    if (err) {
      res.status(500).json({ message: 'Internal Server Error' });
    } else {
      res.json(rows);
    }
  });
});

// Endpoint to store a comment
app.post('/comments', (req, res) => {
  const { email, name, comment } = req.body;
  const date = new Date().toISOString();
  const ip = getClientIp(req);

  if (email && name && comment) {
    db.run(
      'INSERT INTO comments (email, name, comment, date, ip) VALUES (?, ?, ?, ?, ?)',
      [email, name, comment, date, ip],
      function(err) {
        if (err) {
          res.status(500).json({ message: 'Internal Server Error' });
        } else {
          res.status(201).json({ message: 'Comment added successfully!' });
        }
      }
    );
  } else {
    res.status(400).json({ message: 'Invalid input!' });
  }
});

// Endpoint to read reportabuse
app.get('/reportabuse', (req, res) => {
  db.all('SELECT * FROM reportabuse', (err, rows) => {
    if (err) {
      res.status(500).json({ message: 'Internal Server Error' ,err});
    } else {
      res.json(rows);
    }
  });
});

// Endpoint to store a reportInfo
app.post('/reportabuse', (req, res) => {
  const { email, name, reportInfo } = req.body;
  const date = new Date().toISOString();
  const ip = getClientIp(req);

  if (email && name && reportInfo) {
    db.run(
      'INSERT INTO reportabuse (email, name, reportInfo, date, ip) VALUES (?, ?, ?, ?, ?)',
      [email, name, reportInfo, date, ip],
      function(err) {
        if (err) {
          res.status(500).json({ message: 'Internal Server Error' });
        } else {
          res.status(201).json({ message: 'Comment added successfully!' });
        }
      }
    );
  } else {
    res.status(400).json({ message: 'Invalid input!' });
  }
});

// Endpoint to read reportabuse
app.get('/visitors', (req, res) => {
  db.all('SELECT * FROM visitors', (err, rows) => {
    if (err) {
      res.status(500).json({ message: 'Internal Server Error' ,err});
    } else {
      res.json(rows);
    }
  });
});

// Endpoint to store a reportInfo
app.post('/visitors', (req, res) => {
  const { timestamp, ipAddress, hostname,country,city,region,userAgent,page } = req.body;  


  if (timestamp && ipAddress && hostname && country && city && region && userAgent && page ) {
    db.run(
      'INSERT INTO visitors (timestamp, ipAddress, hostname,country,city,region,userAgent,page) VALUES (?, ?, ?, ?, ?,?,?,?)',
      [timestamp, ipAddress, hostname,country,city,region,userAgent,page ],
      function(err) {
        if (err) {
          res.status(500).json({ message: 'Internal Server Error' });
        } else {
          res.status(201).json({ message: 'Comment added successfully!' });
        }
      }
    );
  } else {
    res.status(400).json({ message: 'Invalid input!' });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
