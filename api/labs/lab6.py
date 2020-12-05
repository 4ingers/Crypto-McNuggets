from . import tools

def Task6(data):
  try:
    binary, size = tools.str_to_bin(data['binary'])
  except ValueError:
    return { 'Error': "'binary' is not a number"}

  result = tools.xor_compression(binary, size)

  return { 'result': result }
