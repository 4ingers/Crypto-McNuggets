from .tools import binaries, conversions

def Task5(data):
  try:
    binary, _ = conversions.str_to_bin(data['binary'])
  except ValueError:
    return { 'Error': "'binary' is not a number"}

  result = binaries.next_power_of_2(binary)

  return { 'result': result }
