def str_to_bin(str, reverse=True):
  nospaces = str.replace(' ', '')
  size = len(nospaces)
  directed = nospaces[::-1] if reverse else nospaces
  try:
    num = int(directed, 2)
  except ValueError as e:
    raise e
  return num, size

def bin_to_str(num, size, reverse=True):
  formalized = bin(num)
  trimmed = formalized[2:]
  if reverse:
    directed = trimmed[::-1]
    padded = directed#.ljust(size, '0')
  else:
    padded = trimmed#.rjust(size, '0')
  return padded
