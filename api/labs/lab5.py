from . import tools

def Task5(data):
  try:
    binary, _ = tools.str_to_bin(data['binary'])
  except ValueError:
    return { 'Error': "'binary' is not a number"}

  result = tools.next_power_of_2(binary)

  return { 'result': result }
