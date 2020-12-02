from flask import Flask, request
app = Flask(__name__)


def Task1dot1(data):
  if not 'k' or not data['k'].isnumeric():
    return {}

  k = int(data['k'])
  binary = data['binary'].replace(' ', '')

  if k < 1 or k > len(binary):
    return {}

  return { 'result': binary[k - 1] }


def Task1dot2(data):
  if not 'k' or not data['k'].isnumeric():
    return {}
  
  k = int(data['k'])
  binary = data['binary'].replace(' ', '')

  if k < 1 or k > len(binary):
    return {}

  return { 
    'result': binary[: k - 1] + ('1' if binary[k - 1] == '0' else '0') + binary[k :]
  }
  

def Task1dot3(data):
  if not data.keys() & {'i', 'j'}:
    return {}
  if not data['i'].isnumeric() and not data['j'].isnumeric():
    return {}
  
  i = int(data['i'])
  j = int(data['j'])
  binary = data['binary'].replace(' ', '')

  if i < 1 or i > len(binary) or j < 1 or j > len(binary):
    return {}

  def swap(s, i, j):
    lst = list(s)
    lst[i], lst[j] = lst[j], lst[i]
    return ''.join(lst)

  return { 
    'result': swap(binary, i - 1, j - 1)
  }


def Task1dot4(data):
  if not 'm' or not data['m'].isnumeric():
    return {}
  
  m = int(data['m'])
  binary = data['binary'].replace(' ', '')

  if m < 1 or m > len(binary):
    return {}

  return { 
    'result': '0' * m + binary[m :]
  }


tasks = {
  '1.1': Task1dot1,
  '1.2': Task1dot2,
  '1.3': Task1dot3,
  '1.4': Task1dot4,
}

@app.route('/') # Not working :(
@app.route('/home')
def home():
  return 'Chicken McNuggets stuff is available on other pages...'

@app.route('/labs/<string:id>', methods=['POST'])
def execute(id):
  data = request.json
  print(id)
  result = tasks[id](data)
  return result
