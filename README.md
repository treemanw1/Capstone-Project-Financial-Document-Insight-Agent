# Capstone

## READ HERE TO RUN

Put the .env file in the root of the project meaning inside the capstone-frontend folder. It cannot be in a folder inside capstone-frontend, e.g. in the backend or frontend folder.

### Frontend

1. cd into frontend and run "npm i"
2. Place all the pdfs into /frontend/public/pdfs folder (create the pdfs folder)

### Backend

1. cd into backend and run "poetry install"
2. Make sure you have the arched-forest json file in the backend folder
3. After that run "poetry shell" and "uvicorn main:app --reload" (This didn't work for me)
4. If that doesn't work run "poetry run uvicorn main:app --reload" (This did)
