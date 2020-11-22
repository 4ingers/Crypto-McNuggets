from flask import Flask, request
app = Flask(__name__)

help_list = {
  '1': 'Help for the first lab',
  '2': 'Help for the second lab',
}

@app.route('/')
@app.route('/home')
def home():
  return 'Chicken McNuggets stuff is available on other pages...'

@app.route('/labs')
def help():
  return help_list

@app.route('/labs/<string:id>', methods=['POST'])
def execute(id):
  content = request.json
  # return {"id": id}
  return content
