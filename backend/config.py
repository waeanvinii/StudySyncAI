import os
from datetime import timedelta


class Config:
    # Secret key
    SECRET_KEY = os.environ.get(
        "SECRET_KEY",
        "dev-secret-key"
    )

    # JWT secret
    JWT_SECRET_KEY = os.environ.get(
        "JWT_SECRET_KEY",
        "jwt-dev-secret-key"
    )

    # JWT expires after 1 day
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(days=1)

    # Database path
    BASE_DIR = os.path.abspath(
        os.path.dirname(__file__)
    )

    SQLALCHEMY_DATABASE_URI = (
        "sqlite:///" +
        os.path.join(
            BASE_DIR,
            "instance",
            "studysync.db"
        )
    )

    SQLALCHEMY_TRACK_MODIFICATIONS = False