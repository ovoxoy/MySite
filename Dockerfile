# Dockerfile für GitHub → Cloud Run Deployment
# Stellt sicher, dass server.js verwendet wird für SPA-Routing

FROM node:20-alpine

WORKDIR /app

# Kopiere package files zuerst (für besseres Docker Layer Caching)
COPY package*.json ./

# Installiere alle Dependencies (auch devDependencies für Build)
RUN npm ci

# Kopiere alle Source-Dateien (außer node_modules, dist, etc. - siehe .dockerignore)
COPY . .

# Build die App (erstellt dist-Ordner mit statischen Dateien)
RUN npm run build

# Prüfe ob dist-Ordner existiert
RUN ls -la dist/ || (echo "ERROR: dist-Ordner wurde nicht erstellt!" && exit 1)

# Installiere nur Production Dependencies für Runtime (spart Platz)
RUN npm ci --only=production && npm cache clean --force

# Exponiere Port 8080 (Cloud Run setzt PORT automatisch via Umgebungsvariable)
EXPOSE 8080

# Wichtig: Starte den Express-Server für SPA-Routing
# Dieser Server leitet alle Routen (inkl. /en) auf index.html um
# Cloud Run verwendet automatisch process.env.PORT (standardmäßig 8080)
CMD ["node", "server.js"]

