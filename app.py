from flask import Flask, render_template, request, redirect, url_for, flash
import sqlite3

app = Flask(__name__)

app.secret_key = "nirvana-secret-key"


# =====================================================
# DATABASE
# =====================================================

def init_db():
    connection = sqlite3.connect("nirvana.db")

    cursor = connection.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS registrations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            student_id TEXT NOT NULL,
            course TEXT NOT NULL,
            event TEXT NOT NULL,
            team_members INTEGER NOT NULL,
            email TEXT NOT NULL,
            phone TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)

    connection.commit()
    connection.close()


# =====================================================
# HOME PAGE
# =====================================================

@app.route("/")
def home():
    return render_template("index.html")


# =====================================================
# REGISTRATION PAGE
# =====================================================

@app.route("/registration")
def form():
    return render_template("form.html")


# =====================================================
# HANDLE REGISTRATION
# =====================================================

@app.route("/register", methods=["POST"])
def register():

    # Get form data
    name = request.form.get("name", "").strip()
    student_id = request.form.get("student_id", "").strip()
    course = request.form.get("course", "").strip()
    event = request.form.get("event", "").strip()
    team_members = request.form.get("team_members", "").strip()
    email = request.form.get("email", "").strip()
    phone = request.form.get("phone", "").strip()

    # =================================================
    # CHECK REQUIRED FIELDS
    # =================================================

    if not all([
        name,
        student_id,
        course,
        event,
        team_members,
        email,
        phone
    ]):

        flash(
            "Please fill all required fields.",
            "error"
        )

        return redirect(url_for("form"))

    # =================================================
    # CHECK TEAM MEMBERS VALUE
    # =================================================

    try:
        team_members = int(team_members)

        if team_members < 1:

            flash(
                "Team members must be at least 1.",
                "error"
            )

            return redirect(url_for("form"))

    except ValueError:

        flash(
            "Invalid team members value.",
            "error"
        )

        return redirect(url_for("form"))

    # =================================================
    # INSERT INTO DATABASE
    # =================================================

    try:

        connection = sqlite3.connect("nirvana.db")

        cursor = connection.cursor()

        cursor.execute("""
            INSERT INTO registrations
            (
                name,
                student_id,
                course,
                event,
                team_members,
                email,
                phone
            )
            VALUES (?, ?, ?, ?, ?, ?, ?)
        """, (
            name,
            student_id,
            course,
            event,
            team_members,
            email,
            phone
        ))

        connection.commit()
        connection.close()

        flash(
            "Registration successful! Welcome to NIRVANA.",
            "success"
        )

    except Exception as e:

        print("DATABASE ERROR:", e)

        flash(
            "Registration failed. Please try again.",
            "error"
        )

    # Return to registration page
    return redirect(url_for("form"))


# =====================================================
# START SERVER
# =====================================================

if __name__ == "__main__":

    init_db()

    app.run(debug=True)