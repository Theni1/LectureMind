# LectureMind: AI-Powered PDF Study Assistant


<div align="center">
  <img src="assets/logo.png" alt="LectureMind Logo" width="250"/>
</div>

---

## About This Project

This repository hosts the source code for **LectureMind**. LectureMind is a mobile app that allows students to upload lecture slides or notes and interact with them through a built-in chat interface, all within a single, side-by-side workspace. Instead of manually searching through lengthy materials, students can open a PDF and ask questions directly within the app.

## 📸 Screenshots

| **Home page** |
|:---:|
| <img src="assets/home.jpeg" width="300" /> |


## Key Features
- PDF Upload: Import lecture notes and slide decks directly from the mobile app.
- Automatic Text Extraction: Parses PDF contents on upload using PyMuPDF.
- Vector Search: Stores document chunks with embeddings in PostgreSQL using `pgvector`.
- AI Q&A: Answers study questions by retrieving the most relevant chunks from the uploaded lecture.
- Split Workspace View: Displays the PDF alongside the chat assistant on larger screens.
- Mobile-First Experience: Built with Expo and React Native for an accessible cross-platform workflow.

## Tech Stack
### Frontend
- Framework: React Native with Expo Router
- Language: TypeScript
- PDF Viewing: `react-native-pdf`
- File Upload: `expo-document-picker`

### Backend
- Framework: FastAPI
- Language: Python 3.11
- Database: PostgreSQL
- Vector Search: `pgvector`
- ORM: SQLAlchemy
- PDF Processing: PyMuPDF
- AI Models:
  - Embeddings: `text-embedding-3-small`
  - Chat: `gpt-4o-mini`

## Getting Started
### Prerequisites
- Node.js and npm
- Python 3.11+
- Docker Desktop
- An OpenAI API key

### 1. Backend Setup
```bash
cd backend
cp .env.example .env
```

Add the following values to `.env`:

```env
OPENAI_API_KEY=your_openai_api_key
DATABASE_URL=postgresql://postgres:postgres@db:5432/lecturemind
```

Then start the backend services:

```bash
docker-compose up --build
```

The API will be available at `http://localhost:8000`.

### 2. Frontend Setup
From the project root:

```bash
npm install
npm start
```

You can then run the app with Expo on:
- iOS simulator
- Android emulator
- Expo Go
- Web

## Important Notes
- The current frontend code sends requests to `http://localhost:8000`, so device testing works best on a simulator running on the same machine as the backend.
- The backend currently expects PDF uploads and OpenAI access to be available before chat can work.
- There is no committed `.env.example` file in the repository yet, so you may need to create `.env` manually inside `backend/`.
