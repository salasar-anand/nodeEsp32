// index.js
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

let pins = {};

app.post('/api/pin/:pinNumber', (req, res) => {
  const { mode, value } = req.body;
  const pinNumber = req.params.pinNumber;

  pins[pinNumber] = { mode, value: mode === 'output' ? value : null };
  res.json({ success: true, pin: pinNumber, mode, value });
});

app.get('/api/pin/:pinNumber', (req, res) => {
  const pin = pins[req.params.pinNumber];
  if (pin) {
    res.json(pin);
  } else {
    res.status(404).json({ error: "Pin not set" });
  }
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
