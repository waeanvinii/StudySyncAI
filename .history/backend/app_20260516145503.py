from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager

from config import Config
from models import db


def create_app():
    app = Flask(__name__)

    # Load config
    app.config.from_object(Config)

    # Enable CORS
    CORS(app)

    # Initialize JWT
    JWTManager(app)

    # Initialize database
    db.init_app(app)

    # Create database tables
    with app.app_context():
        db.create_all()

    @app.route("/")
    def home():
        return {
            "message": "StudySync AI Backend Running 🚀"
        }

    return app


app = create_app()


if __name__ == "__main__":
    app.run(debug=True)