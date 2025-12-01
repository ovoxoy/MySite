// Einfacher Express-Server für lokales Testen des Production-Builds
// Führt SPA-Routing aus: Alle Routen zeigen auf index.html

import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8080;

// Request-Logging für Debugging (nur in Production)
if (process.env.NODE_ENV !== 'production') {
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
  });
}

// Statische Dateien aus dem dist-Ordner servieren
app.use(express.static(join(__dirname, 'dist'), {
  index: false, // Verhindere automatisches index.html für Root
  extensions: ['html', 'js', 'css', 'json', 'png', 'jpg', 'jpeg', 'gif', 'svg', 'ico']
}));

// SPA Fallback: Alle Routen auf index.html umleiten
app.get('*', (req, res) => {
  console.log(`SPA Fallback für: ${req.url}`);
  const indexPath = join(__dirname, 'dist', 'index.html');
  res.sendFile(indexPath, (err) => {
    if (err) {
      console.error('Fehler beim Senden von index.html:', err);
      res.status(500).send('Internal Server Error');
    } else {
      console.log(`index.html erfolgreich gesendet für: ${req.url}`);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
  console.log('SPA-Routing aktiviert: Alle Routen zeigen auf index.html');
});

