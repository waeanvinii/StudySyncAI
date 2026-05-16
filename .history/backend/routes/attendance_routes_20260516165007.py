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
    Attendance
)

from datetime import (
    datetime,
    date
)

attendance_bp = Blueprint(
    "attendance",
    __name__
)


# ---------- DATE HELPER ----------
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


# ---------- GET ATTENDANCE ----------
@attendance_bp.route(
    "/attendance",
    methods=["GET"]
)
@jwt_required()
def get_attendance():

    user_id = int(
        get_jwt_identity()
    )

    records = (
        Attendance.query.filter_by(
            user_id=user_id
        )
        .order_by(
            Attendance.date.desc()
        )
        .all()
    )

    return jsonify([
        record.to_dict()
        for record
        in records
    ]), 200


# ---------- MARK ATTENDANCE ----------
@attendance_bp.route(
    "/attendance",
    methods=["POST"]
)
@jwt_required()
def mark_attendance():

    user_id = int(
        get_jwt_identity()
    )

    data = request.get_json()

    if (
        not data
        or not data.get("subject")
        or not data.get("status")
    ):
        return jsonify({
            "error":
            "subject and status required"
        }), 400

    subject = data["subject"]
    status = data["status"]

    if status not in [
        "Present",
        "Absent"
    ]:
        return jsonify({
            "error":
            "Status must be Present or Absent"
        }), 400

    date_string = data.get(
        "date"
    )

    if date_string:

        attendance_date = (
            parse_date(
                date_string
            )
        )

        if attendance_date is None:
            return jsonify({
                "error":
                "Invalid date format"
            }), 400

    else:
        attendance_date = (
            date.today()
        )

    existing_record = (
        Attendance.query.filter_by(
            user_id=user_id,
            subject=subject,
            date=attendance_date
        ).first()
    )

    # Update existing
    if existing_record:

        existing_record.status = (
            status
        )

        db.session.commit()

        return jsonify(
            existing_record.to_dict()
        ), 200

    # Create new
    new_record = Attendance(
        user_id=user_id,
        subject=subject,
        date=attendance_date,
        status=status
    )

    db.session.add(
        new_record
    )

    db.session.commit()

    return jsonify(
        new_record.to_dict()
    ), 201


# ---------- DELETE ----------
@attendance_bp.route(
    "/attendance/<int:record_id>",
    methods=["DELETE"]
)
@jwt_required()
def delete_attendance(
    record_id
):

    user_id = int(
        get_jwt_identity()
    )

    record = (
        Attendance.query.filter_by(
            id=record_id,
            user_id=user_id
        ).first()
    )

    if not record:
        return jsonify({
            "error":
            "Attendance record not found"
        }), 404

    db.session.delete(record)

    db.session.commit()

    return jsonify({
        "message":
        "Attendance deleted"
    }), 200


# ---------- PERCENTAGE ----------
@attendance_bp.route(
    "/attendance/percentage",
    methods=["GET"]
)
@jwt_required()
def get_attendance_percentage():

    user_id = int(
        get_jwt_identity()
    )

    records = (
        Attendance.query.filter_by(
            user_id=user_id
        ).all()
    )

    subject_stats = {}

    for record in records:

        subject = record.subject

        if subject not in subject_stats:
            subject_stats[
                subject
            ] = {
                "present_count": 0,
                "total_days": 0
            }

        subject_stats[
            subject
        ]["total_days"] += 1

        if (
            record.status
            == "Present"
        ):
            subject_stats[
                subject
            ]["present_count"] += 1

    result = {}

    for (
        subject,
        stats
    ) in subject_stats.items():

        total = stats[
            "total_days"
        ]

        present = stats[
            "present_count"
        ]

        percentage = (
            present / total * 100
        ) if total > 0 else 0

        result[
            subject
        ] = {
            "present_count":
            present,

            "total_days":
            total,

            "percentage":
            round(
                percentage,
                2
            )
        }

    return jsonify(
        result
    ), 200