import time

def Task9(data):
  try:
    key = data['key']
  except KeyError:
    return { 'Error': "No 'key' property"}

  try:
    filename = data['filename']
  except KeyError:
    return { 'Error': "No 'filename' property"}

  output_filename = "__vernam__" + filename

  input_path = filename
  output_path = output_filename


  # Try to open
  with open(input_path, "rb") as input_f, open(output_path, "wb") as output_f:
    bin_key = bytes(key, 'utf-8')
    b_key_size = len(bin_key)


    start = time.perf_counter()
    i = 0
    
    while (wrapped_f_byte := input_f.read(1024)):
      f_byte = wrapped_f_byte[0]
      xor = f_byte ^ bin_key[i]
      output_f.write(bytes([xor]))
      i = (i + 1) % b_key_size

    end = time.perf_counter()
    print(f"Time: {end - start:0.2f}s")    

  return { 'result': 'true' }

