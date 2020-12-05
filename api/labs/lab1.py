from .tools import *

def Task1dot1(data):
  try:
    k = int(data['k'])
  except KeyError:
    return { 'Error': "No 'k' property"}
  except ValueError:
    return { 'Error': "'k' is not a number"}

  try:
    binary, size = str_to_bin(data['binary'])
  except ValueError:
    return { 'Error': "'binary' is not a number"}

  if k < 1 or k > size:
    return { 'Error': "'k' is out of range"}

  bit = get_kth_bit(binary, k - 1)
  result = bin_to_str(bit, 1)

  return { 'result': result }


def Task1dot2(data):
  try:
    k = int(data['k'])
  except KeyError:
    return { 'Error': "No 'k' property"}
  except ValueError:
    return { 'Error': "'k' is not a number"}

  try:
    binary, size = str_to_bin(data['binary'])
  except ValueError:
    return { 'Error': "'binary' is not a number"}

  if k < 1 or k > size:
    return { 'Error': "'k' is out of range"}

  bit = set_kth_bit(binary, k - 1)
  result = bin_to_str(bit, size)

  return { 'result': result }
  

def Task1dot3(data):
  try:
    i = int(data['i'])
    j = int(data['j'])
  except KeyError:
    return { 'Error': "No 'i' or 'j' property"}
  except ValueError:
    return { 'Error': "'i' or 'j' is not a number"}
  
  try:
    binary, size = str_to_bin(data['binary'])
  except ValueError:
    return { 'Error': "'binary' is not a number"}

  if i < 1 or i > size or j < 1 or j > size:
    return { 'Error': "'i' or 'j' is out of range"}

  swapped = swap_bits(binary, i - 1, j - 1)
  result = bin_to_str(swapped, size)

  return { 'result': result }


def Task1dot4(data):
  try:
    m = int(data['m'])
  except KeyError:
    return { 'Error': "No 'm' property"}
  except ValueError:
    return { 'Error': "'m' is not a number"}

  try:
    binary, size = str_to_bin(data['binary'])
  except ValueError:
    return { 'Error': "'binary' is not a number"}

  if m < 1 or m > size:
    return { 'Error': "'k' is out of range"}

  bit = nullify_child_bits(binary, m)
  result = bin_to_str(bit, size)

  return { 'result': result }
