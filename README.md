# Django Project Setup

This README provides instructions for setting up and managing your Django project using Poetry. Follow these steps to get started.

## Prerequisites

- Python 3.8 or higher
- Poetry installed

## Setup

### 1. **Install Dependencies**

To install the project dependencies, run:

```bash
make install
```

This command uses Poetry to install all required packages defined in `pyproject.toml`.

### 2. **Set Up Pre-commit Hooks**

To install or update pre-commit hooks, run:

```bash
make install-pre-commit
```

This command uninstalls and re-installs pre-commit hooks.

### 3. **Run Linter**

To run pre-commit checks on all files, use:

```bash
make lint
```

This will ensure your code adheres to the defined coding standards and practices.

## Django Commands

### 1. **Apply Migrations**

To apply database migrations, run:

```bash
make migrate
```

This command will execute `migrate` on the Django project.

### 2. **Create Migrations**

To create new migrations for changes in your models, use:

```bash
make migrations
```

This will generate new migration files based on changes in your Django models.

### 3. **Run Development Server**

To start the Django development server, run:

```bash
make run-server
```

This will start the server on `http://127.0.0.1:8000/` by default.

### 4. **Open Django Shell**

To open a Django shell, use:

```bash
make shell
```

This provides an interactive Python shell with Django's environment loaded.

### 5. **Create Superuser**

To create a Django superuser for accessing the admin interface, run:

```bash
make superuser
```

Follow the prompts to set up the superuser credentials.

## Updating the Project

To update the project, including installing dependencies, applying migrations, and setting up pre-commit hooks, run:

```bash
make update
```

This command is a shortcut for running `install`, `migrate`, and `install-pre-commit` tasks.

## Additional Notes

- Ensure Poetry is installed and available in your PATH.
- Modify `core/manage.py` if your Django project structure differs.
- Adjust any specific settings in the `pyproject.toml` as needed.