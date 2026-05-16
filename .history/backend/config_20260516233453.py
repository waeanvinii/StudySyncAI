import os
from datetime import timedelta


class Config:

    SECRET_KEY = os.environ.get(
        "SECRET_KEY",
        "dev-secret-key"
    )

    JWT_SECRET_KEY = os.environ.get(
        "JWT_SECRET_KEY",
        "jwt-dev-secret-key"
    )

    JWT_ACCESS_TOKEN_EXPIRES = timedelta(
        days=1
    )

    BASE_DIR = os.path.abspath(
        os.path.dirname(__file__)
    )

    instance_path = os.path.join(
        BASE_DIR,
        "instance"
    )

    os.makedirs(
        instance_path,
        exist_ok=True
    )

    SQLALCHEMY_DATABASE_URI = (
        "sqlite:///" +
        os.path.join(
            instance_path,
            "studysync.db"
        )
    )

    SQLALCHEMY_TRACK_MODIFICATIONS = False