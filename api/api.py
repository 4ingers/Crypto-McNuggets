from flask import Flask, request, send_from_directory
from labs import tasks, courses

app = Flask(__name__)

app.config["PROCESSED_DIR"] = "data"
app.config["PROCESSED_FILE"] = "last_processed"


@app.route('/')
@app.route('/home')
def home():
    return 'Chicken McNuggets stuff is available on other pages...'


@app.route('/labs/<id>', methods=['POST'])
def execute_lab(id):
    result = tasks[id](request.json)
    return result


@app.route('/course/<id>', methods=['POST'])
def execute_course(id):
    elapsed = courses[id](request.form, request.files['file'])
    return elapsed


@app.route('/course/<id>', methods=['GET'])
def download_executed_course(id):
    return send_from_directory(app.config["PROCESSED_DIR"],
                               app.config["PROCESSED_FILE"],
                               as_attachment=True)

@app.route('/course/get_file_size')
def get_file_size():
    import os
    return f"{os.path.getsize('data/last_processed')}"