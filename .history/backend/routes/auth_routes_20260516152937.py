from flask import (
    Blueprint,
    request,
    jsonify
)

from models import db, User

from auth import (
    hash_password,
    verify_password,
    generate_token
)

auth_bp = Blueprint(
    "auth",
    __name__
)


# ---------------- REGISTER ----------------
@auth_bp.route(
    "/register",
    methods=["POST"]
)
def register():
    data = request.get_json()

    if (
        not data
        or not data.get("username")
        or not data.get("email")
        or not data.get("password")
    ):
        return jsonify({
            "error":
            "Username, email and password required"
        }), 400

    username = data["username"]
    email = data["email"]
    password = data["password"]

    # Check existing user
    existing_user = User.query.filter(
        (
            User.username == username
        ) |
        (
            User.email == email
        )
    ).first()

    if existing_user:
        return jsonify({
            "error":
            "Username or email already exists"
        }), 409

    # Create user
    hashed_password = hash_password(
        password
    )

    new_user = User(
        username=username,
        email=email,
        password_hash=hashed_password
    )

    db.session.add(new_user)
    db.session.commit()

    token = generate_token(
        new_user.id
    )

    return jsonify({
        "message":
        "User created successfully",
        "user":
        new_user.to_dict(),
        "token":
        token
    }), 201


# ---------------- LOGIN ----------------
@auth_bp.route(
    "/login",
    methods=["POST"]
)
def login():
    data = request.get_json()

    if (
        not data
        or not data.get("email")
        or not data.get("password")
    ):
        return jsonify({
            "error":
            "Email and password required"
        }), 400

    email = data["email"]
    password = data["password"]

    user = User.query.filter_by(
        email=email
    ).first()

    if not user:
        return jsonify({
            "error":
            "Invalid email or password"
        }), 401

    if not verify_password(
        password,
        user.password_hash
    ):
        return jsonify({
            "error":
            "Invalid email or password"
        }), 401

    token = generate_token(
        user.id
    )

    return jsonify({
        "message":
        "Login successful",
        "user":
        user.to_dict(),
        "token":
        token
    }), 200