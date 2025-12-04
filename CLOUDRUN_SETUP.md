# Google Cloud Run Continuous Deployment Setup

Diese Anleitung hilft dir, deine Website automatisch von GitHub zu Google Cloud Run bereitzustellen.

## Voraussetzungen

1. Ein Google Cloud Project
2. Ein GitHub Repository mit deinem Code
3. Google Cloud CLI (`gcloud`) installiert
4. Zugriff auf GitHub und Google Cloud Console

## Schritt 1: Google Cloud Project vorbereiten

```bash
# Project ID setzen (ersetze PROJECT_ID mit deiner ID)
gcloud config set project PROJECT_ID

# Cloud Run API aktivieren
gcloud services enable run.googleapis.com

# Cloud Build API aktivieren
gcloud services enable cloudbuild.googleapis.com

# Container Registry API aktivieren
gcloud services enable containerregistry.googleapis.com
```

## Schritt 2: GitHub mit Google Cloud Connect

### Option A: Mit Google Cloud Console (empfohlen)

1. Gehe zu [Cloud Build](https://console.cloud.google.com/cloud-build/triggers)
2. Klicke auf "Create Trigger"
3. Wähle "GitHub" als Repository
4. Authentifiziere dich mit GitHub
5. Wähle dein Repository aus
6. Konfiguriere:
   - **Name**: `mysite-deployment`
   - **Branch**: `main` (oder dein Hauptzweig)
   - **Build Configuration**: `Cloud Build configuration file`
   - **Cloud Build configuration file location**: `cloudbuild.yaml`

### Option B: Mit gcloud CLI

```bash
gcloud builds connect github \
  --repository-name=MySite \
  --repository-owner=ovoxoy \
  --region=us-central1
```

## Schritt 3: Service Account Permissions konfigurieren

```bash
# Cloud Build Service Account die nötigen Rechte geben
PROJECT_ID=$(gcloud config get-value project)
PROJECT_NUMBER=$(gcloud projects describe $PROJECT_ID --format='value(projectNumber)')

gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member=serviceAccount:${PROJECT_NUMBER}@cloudbuild.gserviceaccount.com \
  --role=roles/run.admin

gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member=serviceAccount:${PROJECT_NUMBER}@cloudbuild.gserviceaccount.com \
  --role=roles/iam.serviceAccountUser
```

## Schritt 4: Umgebungsvariablen setzen (optional)

Wenn deine App Umgebungsvariablen benötigt (z.B. GEMINI_API_KEY):

1. Gehe zu Cloud Build Trigger Settings
2. Füge unter "Substitutions" hinzu:
   ```
   _GEMINI_API_KEY: dein-api-key
   ```

3. Aktualisiere `cloudbuild.yaml`:
   ```yaml
   env:
     - 'GEMINI_API_KEY=${_GEMINI_API_KEY}'
   ```

## Schritt 5: Deployment testen

Manueller Build zum Testen:

```bash
# Im Repository Root
gcloud builds submit --config=cloudbuild.yaml
```

## Automatisches Deployment

Sobald alles konfiguriert ist, wird bei jedem Push zu `main`:
1. Cloud Build wird automatisch ausgelöst
2. Docker Image wird erstellt
3. Image wird zu Container Registry gepusht
4. Die neue Version wird zu Cloud Run deployed

## Monitoring und Debugging

```bash
# Cloud Build Logs ansehen
gcloud builds log --stream=true

# Cloud Run Service Details
gcloud run services describe mysite --region=us-central1

# Logs vom Cloud Run Service
gcloud run services logs read mysite --region=us-central1 --limit=50

# Deployment Status
gcloud builds list --limit=10
```

## Fehlerbehandlung

### Build schlägt fehl
```bash
# Letzte fehlgeschlagene Builds anschauen
gcloud builds list --filter="status!=SUCCESS" --limit=5

# Details eines spezifischen Builds
gcloud builds log BUILD_ID
```

### Service ist nicht erreichbar
```bash
# Service Status prüfen
gcloud run services describe mysite --region=us-central1

# Cloud Run Logs prüfen
gcloud run services logs read mysite --region=us-central1 --limit=100
```

## Kosten

**Kostenlos** (im Free Tier):
- Cloud Run: 2 Millionen Requests/Monat
- Cloud Build: 120 Build-Minuten/Tag

**Bezahlte Features:**
- Jeder weitere Request kostet $0.40 pro 1 Million
- Zusätzliche Build-Minuten kostenlos bis 1.000 Minuten/Monat

## Weitere Konfiguration

### Custom Domain

```bash
gcloud run services update mysite \
  --update-env-vars=DOMAIN=yourdomain.com \
  --region=us-central1
```

### HTTPS und Sicherheit

Cloud Run stellt automatisch HTTPS bereit. Deine Service ist bereits sicher!

### Autoscaling

Cloud Run skaliert automatisch. Standard:
- Min: 0 Instanzen
- Max: 100 Instanzen

Zum Ändern:
```bash
gcloud run services update mysite \
  --min-instances=1 \
  --max-instances=50 \
  --region=us-central1
```

## Weitere Ressourcen

- [Google Cloud Run Dokumentation](https://cloud.google.com/run/docs)
- [Cloud Build Dokumentation](https://cloud.google.com/build/docs)
- [GitHub + Cloud Build Integration](https://cloud.google.com/build/docs/deploying-builds/deploy-cloud-run)
