from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager

from config import Config
from models import db

# Blueprints
from routes.auth_routes import auth_bp
from routes.assignment_routes import (
    assignment_bp
)
from routes.attendance_routes import (
    attendance_bp
)

def create_app():
    app = Flask(__name__)

    # Config
    app.config.from_object(
        Config
    )

    # Extensions
    CORS(app)

    JWTManager(app)

    db.init_app(app)

    # Register routes
    app.register_blueprint(
        auth_bp,
        url_prefix="/api"
    )

    app.register_blueprint(
        assignment_bp,
        url_prefix="/api"
    )
    app.register_blueprint(
        attendance_bp,
        url_prefix="/api"
    # Create tables
    with app.app_context():
        db.create_all()

    @app.route("/")
    def home():
        return {
            "message":
            "StudySync AI Backend Running 🚀"
        }

    return app


app = create_app()

if __name__ == "__main__":
    app.run(
        debug=True,
        port=5000
    )