from pathlib import Path

from split_settings.tools import include

BASE_DIR = Path(__file__).resolve().parent.parent.parent.parent
ENVVAR_SETTINGS_PREFIX = "TASKS_"

include(
    "base.py",
    "custom.py",
    "envvars.py",
    "logging.py",
)
