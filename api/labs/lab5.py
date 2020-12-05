from . import tools

def Task5(data):
  try:
    binary, size = tools.str_to_bin(data['binary'])
  except ValueError:
    return { 'Error': "'binary' is not a number"}

  power = tools.next_power_of_2(binary)
  result = tools.bin_to_str(power, size)

  return { 'result': result }
