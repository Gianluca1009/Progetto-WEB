import os
from fpdf import FPDF
import datetime

class PDF(FPDF):
    def header(self):
        # Logo (if you have one)
        # self.image('logo.png', 10, 8, 33)
        # Arial bold 15
        self.set_font('Arial', 'B', 15)
        # Move to the right
        self.cell(80)
        # Title
        self.cell(30, 10, 'Esonero Project Report', 0, 0, 'C')
        # Line break
        self.ln(20)

    def footer(self):
        # Position at 1.5 cm from bottom
        self.set_y(-15)
        # Arial italic 8
        self.set_font('Arial', 'I', 8)
        # Page number
        self.cell(0, 10, 'Page ' + str(self.page_no()) + '/{nb}', 0, 0, 'C')
        # Date
        self.cell(0, 10, datetime.datetime.now().strftime("%Y-%m-%d"), 0, 0, 'R')

def create_report():
    pdf = PDF()
    pdf.alias_nb_pages()
    pdf.add_page()
    
    # Title
    pdf.set_font('Arial', 'B', 16)
    pdf.cell(0, 10, 'Cinema Database Management System', 0, 1)
    pdf.ln(5)
    
    # Introduction
    pdf.set_font('Arial', '', 12)
    pdf.multi_cell(0, 10, 'This report provides an overview of the Esonero project, which is a web-based Cinema Database Management System. The system allows users to query and manage a database of movies and directors.')
    pdf.ln(5)
    
    # Project Architecture
    pdf.set_font('Arial', 'B', 14)
    pdf.cell(0, 10, '1. Project Architecture', 0, 1)
    pdf.set_font('Arial', '', 12)
    pdf.multi_cell(0, 10, 'The project follows a microservices architecture with three main components:')
    pdf.ln(2)
    
    # Components
    pdf.set_font('Arial', 'B', 12)
    pdf.cell(0, 10, '1.1 Frontend', 0, 1)
    pdf.set_font('Arial', '', 12)
    pdf.multi_cell(0, 10, 'A web interface built with FastAPI and Jinja2 templates that allows users to interact with the system. It runs on port 8001 and communicates with the backend service.')
    pdf.ln(2)
    
    pdf.set_font('Arial', 'B', 12)
    pdf.cell(0, 10, '1.2 Backend', 0, 1)
    pdf.set_font('Arial', '', 12)
    pdf.multi_cell(0, 10, 'A FastAPI service that handles business logic, database queries, and data processing. It runs on port 8003 and provides RESTful API endpoints for the frontend to consume.')
    pdf.ln(2)
    
    pdf.set_font('Arial', 'B', 12)
    pdf.cell(0, 10, '1.3 Database', 0, 1)
    pdf.set_font('Arial', '', 12)
    pdf.multi_cell(0, 10, 'A MariaDB database that stores information about movies and directors. It contains two main tables: "movies" and "director".')
    pdf.ln(5)
    
    # Database Schema
    pdf.set_font('Arial', 'B', 14)
    pdf.cell(0, 10, '2. Database Schema', 0, 1)
    pdf.set_font('Arial', '', 12)
    
    pdf.set_font('Arial', 'B', 12)
    pdf.cell(0, 10, '2.1 Director Table', 0, 1)
    pdf.set_font('Arial', '', 12)
    pdf.multi_cell(0, 10, 'Contains information about film directors with the following columns:\n- name (VARCHAR): The director\'s name (Primary Key)\n- age (INT): The director\'s age')
    pdf.ln(2)
    
    pdf.set_font('Arial', 'B', 12)
    pdf.cell(0, 10, '2.2 Movies Table', 0, 1)
    pdf.set_font('Arial', '', 12)
    pdf.multi_cell(0, 10, 'Contains information about movies with the following columns:\n- name (VARCHAR): The movie title (Primary Key with director)\n- director (VARCHAR): The director\'s name (Foreign Key to director table)\n- year (INT): The release year of the movie\n- genre (VARCHAR): The movie\'s genre\n- platform1 (VARCHAR): First streaming platform where the movie is available\n- platform2 (VARCHAR): Second streaming platform where the movie is available')
    pdf.ln(5)
    
    # Features
    pdf.set_font('Arial', 'B', 14)
    pdf.cell(0, 10, '3. System Features', 0, 1)
    pdf.set_font('Arial', '', 12)
    
    pdf.set_font('Arial', 'B', 12)
    pdf.cell(0, 10, '3.1 Database Schema Summary', 0, 1)
    pdf.set_font('Arial', '', 12)
    pdf.multi_cell(0, 10, 'Users can view the database schema structure through the "/schema_summary" endpoint, which returns a list of all tables and their columns.')
    pdf.ln(2)
    
    pdf.set_font('Arial', 'B', 12)
    pdf.cell(0, 10, '3.2 Search Functionality', 0, 1)
    pdf.set_font('Arial', '', 12)
    pdf.multi_cell(0, 10, 'The system supports natural language queries through the "/search/{query}" endpoint. Users can ask questions like:\n- "Elenca i film del 2010" (List movies from 2010)\n- "Quali sono i registi presenti su Netflix?" (Which directors have movies on Netflix?)\n- "Elenca tutti i film di fantascienza" (List all science fiction movies)\n- "Quali film sono stati fatti da un regista di almeno 80 anni?" (Which movies were made by directors at least 80 years old?)\n- "Quali registi hanno fatto più di un film?" (Which directors have made more than one movie?)')
    pdf.ln(2)
    
    pdf.set_font('Arial', 'B', 12)
    pdf.cell(0, 10, '3.3 Add New Movies', 0, 1)
    pdf.set_font('Arial', '', 12)
    pdf.multi_cell(0, 10, 'Users can add new movies to the database through the "/add" endpoint. The data must be provided in a specific format: "Title,Director,Director_Age,Year,Genre,Platform1,Platform2".')
    pdf.ln(5)
    
    # Deployment
    pdf.set_font('Arial', 'B', 14)
    pdf.cell(0, 10, '4. Deployment', 0, 1)
    pdf.set_font('Arial', '', 12)
    pdf.multi_cell(0, 10, 'The project is containerized using Docker and can be deployed using Docker Compose. The docker-compose.yaml file defines three services:\n- frontend: Exposes port 8001\n- backend: Exposes port 8003\n- mariadb: Exposes port 3307 (mapped to internal 3306)')
    pdf.ln(5)
    
    # Testing
    pdf.set_font('Arial', 'B', 14)
    pdf.cell(0, 10, '5. Testing', 0, 1)
    pdf.set_font('Arial', '', 12)
    pdf.multi_cell(0, 10, 'The project includes a test script (test_backend_esonero.py) that verifies the functionality of the backend API. The tests check:\n- Database schema format\n- Search functionality for different types of queries\n- Adding new movies\n- Error handling for invalid inputs')
    pdf.ln(5)
    
    # Conclusion
    pdf.set_font('Arial', 'B', 14)
    pdf.cell(0, 10, '6. Conclusion', 0, 1)
    pdf.set_font('Arial', '', 12)
    pdf.multi_cell(0, 10, 'The Esonero project is a comprehensive Cinema Database Management System that demonstrates the use of modern web technologies and microservices architecture. It provides a user-friendly interface for querying and managing movie data, with support for natural language processing to interpret user queries.')
    
    # Save the PDF
    pdf.output('Esonero_Project_Report.pdf')
    print("Report generated successfully: Esonero_Project_Report.pdf")

if __name__ == "__main__":
    create_report()
