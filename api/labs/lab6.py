from .tools import binaries, conversions

def Task6(data):
  try:
    binary, size = conversions.str_to_bin(data['binary'])
  except ValueError:
    return { 'Error': "'binary' is not a number"}

  result = binaries.xor_compression(binary, size)

  return { 'result': result }
