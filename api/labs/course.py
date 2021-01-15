from werkzeug.datastructures import FileStorage
from .algorithms.shacal2 import Shacal2
from .algorithms.blowfish import Blowfish
import time
import os


def TaskCourse_SHACAL(data: dict, file: FileStorage):
    key = str.encode(data.get("key"))
    mode = data.get("mode")
    decrypt = (data.get("operation") == "decrypt")
    input = file.stream

    if mode == "ecb":
        init_vector = None
        processes = 12
        blocks_per_process = 1024
    elif mode in {"cbc", "cfb", "ofb"}:
        init_vector = str.encode(data.get("init_vector"))
        processes = None
        blocks_per_process = None

    with open("data/last_processed", 'wb') as output:
        t0 = time.time()
        Shacal2().execute(input=input, output=output, key=key,
                          mode=mode, init_vector=init_vector, decrypt=decrypt,
                          processes=processes,
                          blocks_per_process=blocks_per_process)
        t1 = time.time()
    return f"{(t1 - t0):.2f}"


def TaskCourse_Blowfish(data: dict, file: FileStorage):
    key = str.encode(data.get("key"))
    mode = data.get("mode")
    decrypt = (data.get("operation") == "decrypt")
    input = file.stream

    if mode == "ecb":
        init_vector = None
        processes = 12
        blocks_per_process = 1024
    elif mode in {"cbc", "cfb", "ofb"}:
        init_vector = str.encode(data.get("init_vector"))
        processes = None
        blocks_per_process = None

    with open("data/last_processed", 'wb') as output:
        t0 = time.time()
        Blowfish(key).execute(input=input, output=output,
                              mode=mode, init_vector=init_vector, 
                              decrypt=decrypt, processes=processes,
                              blocks_per_process=blocks_per_process)
        t1 = time.time()
    return f"{(t1 - t0):.2f}"
