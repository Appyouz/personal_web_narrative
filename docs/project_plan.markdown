# Project: A Journey of Us (Secure Django Edition)

## Core Idea
An interactive web application built with Django to securely share a journey of memories.
The app will feature user authentication to protect private images and content, a timeline 
of significant moments, and a final, personal letter.

## Technologies
- **Backend**: Django (Python)
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla JS)
- **Database**: SQLite (for local development), or PostgreSQL (for production on platforms like PythonAnywhere)
- **Version Control**: Git
- **Hosting**: PythonAnywhere (recommended for ease of use and security)

## Colors
- **Black**: #000000
- **Turquoise**: #40E0D0
- **Blue Jay**: #2A6099
- **Soft Lilac**: #E6E6FA
- **Deep Berry**: #4B0082

## Project Structure
The project will be structured with a single Django app to keep things simple and organized.

```
/journey-of-us/
|-- myproject/          // Main Django project folder
|   |-- settings.py
|   |-- urls.py
|   |-- ...
|-- memories/           // Our custom Django app
|   |-- migrations/
|   |-- templates/
|   |-- static/
|   |-- views.py
|   |-- models.py
|   |-- urls.py
|   |-- ...
|-- media/              // Folder for private, user-uploaded images
|-- .gitignore
|-- manage.py
|-- README.md
|-- requirements.txt
```

## To-Do List (Phased Approach)

### Phase 1: Django Setup & Authentication (~1.5 hours)
- [ ] Create a new Django project and a single app (memories).
- [ ] Configure `settings.py` to include the `memories` app and set up the static and media file directories.
- [ ] Use Django's built-in authentication system. Create custom URL patterns for `login/`, `logout/`, and a redirect to the main page upon successful login.
- [ ] Create a basic login template (`login.html`) that allows her to log in.
- [ ] Run `python manage.py createsuperuser` to create your partner's login credentials.

### Phase 2: Secure Media Serving & Data Modeling (~1.5 hours)
- [ ] Define a simple model (e.g., `Memory`) in `models.py` to hold data for each chapter of your journey. It should include fields for a title, description, and an `ImageField` for the picture.
- [ ] Create an admin site for this model so you can easily upload images and add chapter data.
- [ ] Create a custom Django view to serve the private images. This view will check if the user is authenticated before allowing access to the image file, thus protecting your personal images from public view.
- [ ] Upload your images and add the chapter data through the Django admin panel.

### Phase 3: Frontend Integration & Deployment (~2 hours)
- [ ] Create the core HTML template (`timeline.html`) for your project. This will be the main page she sees after logging in.
- [ ] Write the necessary CSS and JavaScript to create the interactive timeline layout (CSS Grid or Flexbox).
- [ ] In the Django view for the timeline page, retrieve the `Memory` objects from the database and pass them to the template's context.
- [ ] Use Django template language (`{% for %}`, `{{ }}`, etc.) to dynamically render the chapter data and image URLs on the timeline.
- [ ] Test the entire application locally.
- [ ] Create a private GitHub repository and push your code.
- [ ] Deploy the project on PythonAnywhere and send the secure link to her.
