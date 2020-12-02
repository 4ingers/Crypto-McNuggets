from flask import Flask, request
app = Flask(__name__)

def Lab1(data):
  if not 'k' in data or not 'binary' in data:
    return {}

  k = data['k']
  if not k.isnumeric():
    return {}
  k = int(k)

  binary = data['binary'].replace(' ', '')

  if k < 1 or k > len(binary):
    return {}

  return {
    'result': binary[k - 1]
  }

labs = {
  '1.1': Lab1
}

@app.route('/') # Not working :(
@app.route('/home')
def home():
  return 'Chicken McNuggets stuff is available on other pages...'

@app.route('/labs/<string:id>', methods=['POST'])
def execute(id):
  data = request.json
  print(id)
  result = labs[id](data)
  return result
