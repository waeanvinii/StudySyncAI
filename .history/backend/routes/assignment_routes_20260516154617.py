from flask import (
    Blueprint,
    request,
    jsonify
)

from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity
)

from models import (
    db,
    Assignment
)

from datetime import datetime

assignment_bp = Blueprint(
    "assignment",
    __name__
)


# ---------- HELPER ----------
def parse_date(date_string):
    try:
        return datetime.strptime(
            date_string,
            "%Y-%m-%d"
        ).date()

    except (
        ValueError,
        TypeError
    ):
        return None


# ---------- GET ASSIGNMENTS ----------
@assignment_bp.route(
    "/assignments",
    methods=["GET"]
)
@jwt_required()
def get_assignments():

    user_id = int(
        get_jwt_identity()
    )

    assignments = (
        Assignment.query.filter_by(
            user_id=user_id
        )
        .order_by(
            Assignment.due_date
        )
        .all()
    )

    return jsonify([
        assignment.to_dict()
        for assignment
        in assignments
    ]), 200


# ---------- CREATE ASSIGNMENT ----------
@assignment_bp.route(
    "/assignments",
    methods=["POST"]
)
@jwt_required()
def create_assignment():

    user_id = int(
        get_jwt_identity()
    )

    data = request.get_json()

    if (
        not data
        or not data.get("title")
        or not data.get("due_date")
    ):
        return jsonify({
            "error":
            "Title and due_date required"
        }), 400

    title = data["title"]

    description = data.get(
        "description",
        ""
    )

    due_date_string = data[
        "due_date"
    ]

    status = data.get(
        "status",
        "Pending"
    )

    if status not in [
        "Pending",
        "Completed"
    ]:
        return jsonify({
            "error":
            "Invalid status"
        }), 400

    due_date = parse_date(
        due_date_string
    )

    if due_date is None:
        return jsonify({
            "error":
            "Invalid date format. Use YYYY-MM-DD"
        }), 400

    new_assignment = Assignment(
        title=title,
        description=description,
        due_date=due_date,
        status=status,
        user_id=user_id
    )

    db.session.add(
        new_assignment
    )

    db.session.commit()

    return jsonify(
        new_assignment.to_dict()
    ), 201


# ---------- UPDATE ASSIGNMENT ----------
@assignment_bp.route(
    "/assignments/<int:assignment_id>",
    methods=["PUT"]
)
@jwt_required()
def update_assignment(
    assignment_id
):

    user_id = int(
        get_jwt_identity()
    )

    assignment = (
        Assignment.query.filter_by(
            id=assignment_id,
            user_id=user_id
        ).first()
    )

    if not assignment:
        return jsonify({
            "error":
            "Assignment not found"
        }), 404

    data = request.get_json()

    if not data:
        return jsonify({
            "error":
            "No data provided"
        }), 400

    if "title" in data:
        assignment.title = (
            data["title"]
        )

    if "description" in data:
        assignment.description = (
            data["description"]
        )

    if "due_date" in data:
        due_date = parse_date(
            data["due_date"]
        )

        if due_date is None:
            return jsonify({
                "error":
                "Invalid date format"
            }), 400

        assignment.due_date = (
            due_date
        )

    if "status" in data:

        if data["status"] not in [
            "Pending",
            "Completed"
        ]:
            return jsonify({
                "error":
                "Invalid status"
            }), 400

        assignment.status = (
            data["status"]
        )

    db.session.commit()

    return jsonify(
        assignment.to_dict()
    ), 200


# ---------- DELETE ASSIGNMENT ----------
@assignment_bp.route(
    "/assignments/<int:assignment_id>",
    methods=["DELETE"]
)
@jwt_required()
def delete_assignment(
    assignment_id
):

    user_id = int(
        get_jwt_identity()
    )

    assignment = (
        Assignment.query.filter_by(
            id=assignment_id,
            user_id=user_id
        ).first()
    )

    if not assignment:
        return jsonify({
            "error":
            "Assignment not found"
        }), 404

    db.session.delete(
        assignment
    )

    db.session.commit()

    return jsonify({
        "message":
        "Assignment deleted successfully"
    }), 200