FROM python:3.11 
LABEL org.opencontainers.image.source=https://github.com/Theni1/LectureMind

                  
WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]  