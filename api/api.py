from flask import Flask, request
from labs import *

app = Flask(__name__)


tasks = {
  '1.1': Task1dot1,
  '1.2': Task1dot2,
  '1.3': Task1dot3,
  '1.4': Task1dot4,

  '2': Task2,
  '3': Task3,
  '4': Task4,
  '5': Task5,
  '6': Task6,
  '7': Task7,
}

@app.route('/') # Not working :(
@app.route('/home')
def home():
  return 'Chicken McNuggets stuff is available on other pages...'

@app.route('/labs/<string:id>', methods=['POST'])
def execute(id):
  data = request.json
  result = tasks[id](data)
  return result
