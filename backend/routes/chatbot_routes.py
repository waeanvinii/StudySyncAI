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
    "GROQ_API_KEY"
)


@chatbot_bp.route(
    "/chatbot",
    methods=["POST"]
)
def chatbot():

    try:

        data = request.get_json()

        message = data.get(
            "message"
        )

        response = requests.post(
            "https://api.groq.com/openai/v1/chat/completions",
            headers={
                "Authorization":
                f"Bearer {API_KEY}",

                "Content-Type":
                "application/json"
            },
            json={
                "model":
                "llama-3.1-8b-instant",

                "messages": [
                    {
                        "role":
                        "system",

                        "content":
                        """
You are StudySync AI,
a smart student assistant.

Help with:
- coding
- assignments
- studies
- exams
- notes
- productivity

Keep answers simple
and student-friendly.
"""
                    },
                    {
                        "role":
                        "user",

                        "content":
                        message
                    }
                ]
            }
        )

        result = (
            response.json()
        )

        print(result)

        ai_reply = (
            result["choices"][0]
            ["message"]
            ["content"]
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