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


@chatbot_bp.route(
    "/chatbot",
    methods=["POST"]
)
def chatbot():

    try:

        data = request.get_json()

        user_message = data.get(
            "message"
        )

        if not user_message:
            return jsonify({
                "error":
                "Message required"
            }), 400

        url = (
            "https://generativelanguage.googleapis.com"
            "/v1beta/models/"
            "gemini-2.0-flash:"
            "generateContent"
            f"?key={API_KEY}"
        )

        payload = {
            "contents": [
                {
                    "parts": [
                        {
                            "text":
                            f"""
You are StudySync AI.

You help students with:
- coding
- assignments
- study plans
- exams
- notes
- concepts

Answer clearly and simply.

Student question:
{user_message}
"""
                        }
                    ]
                }
            ]
        }

        response = requests.post(
            url,
            json=payload
        )

        result = (
            response.json()
        )

        print(result)

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

        print(
            "CHATBOT ERROR:",
            str(e)
        )

        return jsonify({
            "error":
            str(e)
        }), 500