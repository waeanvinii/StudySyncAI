from werkzeug.security import (
    generate_password_hash,
    check_password_hash
)

from flask_jwt_extended import (
    create_access_token
)


def hash_password(password):
    """Hash password"""
    return generate_password_hash(password)


def verify_password(password, password_hash):
    """Verify password"""
    return check_password_hash(
        password_hash,
        password
    )


def generate_token(user_id):
    """Generate JWT token"""
    return create_access_token(
        identity=str(user_id)
    )