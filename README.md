# LectureMind: AI-Powered PDF Study Assistant
"Turn your lecture PDFs into clear, step-by-step explanations"

LectureMind is designed for a simple workflow:

1. Upload a lecture PDF from your device.
2. Extract and chunk the document text.
3. Generate embeddings for each chunk using OpenAI.
4. Store those embeddings in PostgreSQL with `pgvector`.
5. Ask questions about the document and receive context-grounded answers.

Instead of manually searching through long lecture slides or notes, students can open a PDF and chat with it directly inside the app.

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

## Architecture
LectureMind follows a straightforward client-server architecture:

- Expo Mobile App: Handles onboarding, PDF selection, document viewing, and the chat interface.
- FastAPI Backend: Receives uploaded PDFs, extracts text, creates embeddings, and serves chat responses.
- PostgreSQL + pgvector: Stores document metadata and embedding vectors for similarity search.
- OpenAI API: Generates embeddings for document chunks and produces final grounded answers.

## User Flow
1. Open the app and tap `Try now`.
2. Select a lecture PDF from your device.
3. The app uploads the file to the FastAPI backend.
4. The backend extracts the PDF text, chunks it, embeds it, and stores the results.
5. Open the workspace and ask questions about the uploaded lecture content.

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
