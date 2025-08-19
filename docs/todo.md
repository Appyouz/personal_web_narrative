# Project: A Journey of Us (Secure Django Edition)

## Revised To-Do List (Phased Approach)

### Phase 1: Setup & User Authentication (~1.5 hours)
- [ ] **Create Project & Virtual Environment**: Create the journey-of-us project folder. Inside it, set up and activate a Python virtual environment.
- [ ] **Install Dependencies**: Install Django and other required packages like django-storages, Pillow (for image processing), and python-dotenv (for managing your Cloudinary credentials securely).
- [ ] **Start Project & App**: Run the commands to create the Django project and the memories app.
- [ ] **Initial Configuration**: Update settings.py to include your new app and configure the base URL for static and media files.
- [ ] **Set up Authentication**: Create the URL patterns for login/ and logout/ in myproject/urls.py and a basic login.html template.
- [ ] **Create the Admin**: Run `python manage.py makemigrations` and `migrate`, then `python manage.py createsuperuser` to set up your admin account. You will use this account to add your partner as a standard user later on.

---

### Phase 2: Secure Media & Data Modeling (~1.5 hours)
- [ ] **Configure Cloudinary**: Set up your Cloudinary account and get the API credentials. Configure Django to use Cloudinary as the backend for your media files using the django-storages library. **Note**: Never put your credentials directly in settings.py. Use python-dotenv for this.
- [ ] **Define Data Models**: In memories/models.py, create your Memory model. You'll use a CloudinaryField for the images and a CharField or TextField for the story.
- [ ] **Create the Admin Interface**: Register your Memory model in memories/admin.py so you can add and edit content easily.
- [ ] **Secure Media Views**: This is critical. Create a view that uses the `@login_required` decorator to check if the user is authenticated before serving the image from Cloudinary. This ensures your private photos are safe.

---

### Phase 3: Frontend Integration & Deployment (~2 hours)
- [ ] **Create Frontend Templates**: Create the main timeline.html template. This is where your HTML, CSS, and JavaScript will live.
- [ ] **Retrieve Data**: Write a view that queries your Memory model and passes the data to the timeline.html template.
- [ ] **Render with Template Language**: Use Django's template language (for loops and variables) to dynamically generate the timeline content from the data you passed from the backend.
- [ ] **Test Locally**: Verify that all pages, from login to the timeline, work correctly on your local machine.
- [ ] **Git & Deployment**: Initialize a private Git repository, add your project, and push it. Deploy your project to PythonAnywhere.
