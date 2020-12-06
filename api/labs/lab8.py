from .tools import binaries, conversions

def Task8(data):
  try:
    permutation = [int(x) for x in data['permutation'].split(',')]
  except KeyError:
    return { 'Error': "No 'permutation' property"}
  except ValueError:
    return { 'Error': "'permutation' conversion failed"}

  try:
    binary, size = conversions.str_to_bin(data['binary'])
  except ValueError:
    return { 'Error': "'binary' is not a number"}

  permutation = binaries.permute(binary, permutation)

  result = conversions.bin_to_str(permutation, size)

  return { 'result': result }

