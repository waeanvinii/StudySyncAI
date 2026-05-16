from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()


# ---------------- USER MODEL ----------------
class User(db.Model):
    __tablename__ = "user"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    username = db.Column(
        db.String(80),
        unique=True,
        nullable=False
    )

    email = db.Column(
        db.String(120),
        unique=True,
        nullable=False
    )

    password_hash = db.Column(
        db.String(200),
        nullable=False
    )

    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )

    # Relationships
    assignments = db.relationship(
        "Assignment",
        backref="user",
        lazy=True,
        cascade="all, delete-orphan"
    )

    attendances = db.relationship(
        "Attendance",
        backref="user",
        lazy=True,
        cascade="all, delete-orphan"
    )

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "created_at": (
                self.created_at.isoformat()
                if self.created_at
                else None
            )
        }


# ---------------- ASSIGNMENT MODEL ----------------
class Assignment(db.Model):
    __tablename__ = "assignment"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    title = db.Column(
        db.String(100),
        nullable=False
    )

    description = db.Column(
        db.Text,
        default=""
    )

    due_date = db.Column(
        db.Date,
        nullable=False
    )

    status = db.Column(
        db.String(20),
        default="Pending"
    )

    user_id = db.Column(
        db.Integer,
        db.ForeignKey("user.id"),
        nullable=False
    )

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "due_date": (
                self.due_date.isoformat()
                if self.due_date
                else None
            ),
            "status": self.status,
            "user_id": self.user_id
        }


# ---------------- ATTENDANCE MODEL ----------------
class Attendance(db.Model):
    __tablename__ = "attendance"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    subject = db.Column(
        db.String(50),
        nullable=False
    )

    date = db.Column(
        db.Date,
        nullable=False
    )

    status = db.Column(
        db.String(10),
        nullable=False
    )  # Present / Absent

    user_id = db.Column(
        db.Integer,
        db.ForeignKey("user.id"),
        nullable=False
    )

    # Prevent duplicate attendance
    __table_args__ = (
        db.UniqueConstraint(
            "user_id",
            "subject",
            "date",
            name="_user_subject_date_uc"
        ),
    )

    def to_dict(self):
        return {
            "id": self.id,
            "subject": self.subject,
            "date": self.date.isoformat(),
            "status": self.status,
            "user_id": self.user_id
        }