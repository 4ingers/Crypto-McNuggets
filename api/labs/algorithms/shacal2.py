# Based on SHA-256
import multiprocessing
import struct
import io


def _rot_r(n, b):
    return ((n >> b) | (n << (32 - b))) & 0xffffffff


class Shacal2(object):
    def __init__(self):
        self.digest_size = 32
        self.key_block_size = 64
        self._m = (
            0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5,
            0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
            0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3,
            0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
            0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc,
            0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
            0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7,
            0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
            0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13,
            0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
            0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3,
            0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
            0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5,
            0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
            0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208,
            0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
        )

    def execute(self, input: io.BufferedReader, output: io.BufferedWriter,
                key: bytes, decrypt: bool, mode: str, init_vector: bytes = None,
                processes=None, blocks_per_process=None):
        self.update_key(key)

        if mode == "ecb" and processes != None and blocks_per_process != None:
            operate = self._decrypt_ecb if decrypt else self._encrypt_ecb
            operate(input, output, processes, blocks_per_process)
        elif mode in {"cbc", "cfb", "ofb"}:
            if init_vector != None:
                if mode == "cbc":
                    operate = self._decrypt_cbc if decrypt else self._encrypt_cbc
                elif mode == "cfb":
                    operate = self._decrypt_cfb if decrypt else self._encrypt_cfb
                elif mode == "ofb":
                    operate = self._decrypt_ofb if decrypt else self._encrypt_ofb
                operate(input, output, init_vector)
            else:
                raise ValueError("init vector not ginit_vectoren")
        else:
            raise ValueError("invalid mode")

    def update_key(self, key):
        key = key[:self.key_block_size]
        self._k = self._extend_key(key)

    def _extend_key(self, key):
        zeroized_key = key.ljust(self.key_block_size, b'\x00')
        k = [0] * self.key_block_size
        k[:16] = struct.unpack(b'>16I', zeroized_key)

        for i in range(16, 64):
            s0 = _rot_r(k[i - 15], 7) ^ _rot_r(k[i - 15],
                                               18) ^ (k[i - 15] >> 3)
            s1 = _rot_r(k[i - 2], 17) ^ _rot_r(k[i - 2], 19) ^ (k[i - 2] >> 10)
            k[i] = (k[i - 16] + s0 + k[i - 7] + s1) & 0xffffffff
        return k

    def _encrypt_ecb(self, input, output, processes, blocks_per_process):
        pool = multiprocessing.Pool(processes)
        span_size = processes * blocks_per_process * self.digest_size

        while len(data := input.read(span_size)) == span_size:
            blocks = self._split_equally(data, self.digest_size)
            for block in pool.imap(self._encrypt_block, blocks,
                                   blocks_per_process):
                output.write(block)

        padded = self._pad_end(data)
        blocks = self._split_equally(padded, self.digest_size)
        for block in pool.imap(self._encrypt_block, blocks,
                               blocks_per_process):
            output.write(block)

    def _decrypt_ecb(self, input, output, processes, blocks_per_process):
        pool = multiprocessing.Pool(processes)
        span_size = processes * blocks_per_process * self.digest_size

        decrypted_blocks = []
        while len(data := input.read(span_size)):
            for decrypted_block in decrypted_blocks:
                output.write(decrypted_block)
            decrypted_blocks = []

            blocks = self._split_equally(data, self.digest_size)
            for block in pool.imap(self._decrypt_block, blocks,
                                   blocks_per_process):
                decrypted_blocks.append(block)

        decrypted_blocks[-1] = self._remove_padding(decrypted_blocks[-1])
        for decrypted_block in decrypted_blocks:
            output.write(decrypted_block)

    def _encrypt_cbc(self, input, output, init_vector: bytes):
        encrypted_block = init_vector.ljust(self.digest_size, b'\x00')

        while len(data := input.read(self.digest_size)) == self.digest_size:
            xored = self._bytes_xor(data, encrypted_block)
            encrypted_block = self._encrypt_block(xored)
            output.write(encrypted_block)

        padded = self._pad_end(data)
        xored = self._bytes_xor(encrypted_block, padded)
        encrypted_block = self._encrypt_block(xored)
        output.write(encrypted_block)

    def _decrypt_cbc(self, input, output, init_vector):
        decrypted_block = b""
        prev_block = init_vector.ljust(self.digest_size, b'\x00')

        while len(data := input.read(self.digest_size)):
            output.write(decrypted_block)
            decrypted_block = self._bytes_xor(
                prev_block, self._decrypt_block(data))
            prev_block = data

        trimmed_block = self._remove_padding(decrypted_block)
        output.write(trimmed_block)

    def _encrypt_cfb(self, input, output, init_vector):
        encrypted_block = init_vector.ljust(self.digest_size, b'\x00')

        while len(data := input.read(self.digest_size)) == self.digest_size:
            encrypted_block = self._bytes_xor(
                data, self._encrypt_block(encrypted_block))
            output.write(encrypted_block)

        padded = self._pad_end(data)
        encrypted_block = self._bytes_xor(
            padded, self._encrypt_block(encrypted_block))
        output.write(encrypted_block)

    def _decrypt_cfb(self, input, output, init_vector):
        xored = b""
        prev_block = init_vector.ljust(self.digest_size, b'\x00')

        while len(data := input.read(self.digest_size)):
            output.write(xored)
            decrypted_block = self._encrypt_block(prev_block)
            xored = self._bytes_xor(data, decrypted_block)
            prev_block = data

        trimmed_block = self._remove_padding(xored)
        output.write(trimmed_block)

    def _encrypt_ofb(self, input, output, init_vector):
        encrypted_block = init_vector.ljust(self.digest_size, b'\x00')

        while len(data := input.read(self.digest_size)) == self.digest_size:
            encrypted_block = self._encrypt_block(encrypted_block)
            xored = self._bytes_xor(data, encrypted_block)
            output.write(xored)

        padded = self._pad_end(data)
        encrypted_block = self._bytes_xor(
            padded, self._encrypt_block(encrypted_block))
        output.write(encrypted_block)

    def _decrypt_ofb(self, input, output, init_vector):
        xored = b""
        prev_block = init_vector.ljust(self.digest_size, b'\x00')

        while len(data := input.read(self.digest_size)):
            output.write(xored)
            prev_block = self._encrypt_block(prev_block)
            xored = self._bytes_xor(data, prev_block)

        trimmed_block = self._remove_padding(xored)
        output.write(trimmed_block)

    def _encrypt_block(self, block):
        a, b, c, d, e, f, g, h = self._decode_block(block)

        for i in range(64):
            Maj = (a & b) ^ (a & c) ^ (b & c)
            Ch = (e & f) ^ ((~e) & g)
            S0 = _rot_r(a, 2) ^ _rot_r(a, 13) ^ _rot_r(a, 22)
            S1 = _rot_r(e, 6) ^ _rot_r(e, 11) ^ _rot_r(e, 25)
            T = (h + S1 + Ch + self._k[i] + self._m[i]) & 0xffffffff
            h = g
            g = f
            f = e
            e = (d + T) & 0xffffffff
            d = c
            c = b
            b = a
            a = (T + S0 + Maj) & 0xffffffff

        return self._encode_block((a, b, c, d, e, f, g, h))

    def _decrypt_block(self, block):
        a, b, c, d, e, f, g, h = self._decode_block(block)

        for i in range(63, -1, -1):
            T0 = a
            T1 = e
            a = b
            b = c
            c = d
            e = f
            f = g
            g = h
            Maj = (a & b) ^ (a & c) ^ (b & c)
            Ch = (e & f) ^ ((~e) & g)
            S0 = _rot_r(a, 2) ^ _rot_r(a, 13) ^ _rot_r(a, 22)
            S1 = _rot_r(e, 6) ^ _rot_r(e, 11) ^ _rot_r(e, 25)
            T2 = (S1 + Ch + self._k[i] + self._m[i]) & 0xffffffff
            T3 = (S0 + Maj) & 0xffffffff
            h = (T0 - (T2 + T3)) & 0xffffffff
            d = (T1 - (h + T2)) & 0xffffffff

        return self._encode_block((a, b, c, d, e, f, g, h))

    def _encode_block(self, block):
        return struct.pack(b'>8I', *block)

    def _decode_block(self, block):
        return struct.unpack(b'>8I', block)

    def _split_equally(self, data, length):
        return (data[i: length + i] for i in range(0, len(data), length))

    def _pad_end(self, data):
        zeros = self.digest_size - (len(data) % self.digest_size) - 1
        return data + b'\x80' + (b'\x00' * zeros)

    def _remove_padding(self, block):
        signal = block.rindex(b'\x80')
        return block[:signal]

    def _bytes_xor(self, ba1, ba2):
        return bytes([_a ^ _b for _a, _b in zip(ba1, ba2)])
