from flask import (
    Blueprint,
    request,
    jsonify
)

import requests
import os

from dotenv import (
    load_dotenv
)

load_dotenv()

chatbot_bp = Blueprint(
    "chatbot",
    __name__
)

API_KEY = os.getenv(
    "GEMINI_API_KEY"
)

URL = (
    "https://generativelanguage.googleapis.com"
    "/v1beta/models/gemini-1.5-flash:generateContent"
    f"?key={API_KEY}"
)


@chatbot_bp.route(
    "/chatbot",
    methods=["POST"]
)
def chatbot():

    data = request.get_json()

    user_message = data.get(
        "message"
    )

    if not user_message:
        return jsonify({
            "error":
            "Message required"
        }), 400

    payload = {
        "contents": [
            {
                "parts": [
                    {
                        "text":
                        f"""
You are StudySync AI.

Help students with:
- studies
- coding
- notes
- assignments
- exam prep

Student question:
{user_message}
"""
                    }
                ]
            }
        ]
    }

    try:

        response = requests.post(
            URL,
            json=payload
        )

        result = response.json()

        ai_reply = (
            result["candidates"][0]
            ["content"]["parts"][0]
            ["text"]
        )

        return jsonify({
            "reply":
            ai_reply
        })

    except Exception as e:
        return jsonify({
            "error":
            str(e)
        }), 500