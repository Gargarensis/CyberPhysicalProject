import serial
import numpy as np
import soundfile as sf
import sys
import tensorflow as tf
from scipy.io import wavfile
import pandas as pd
import os
import librosa
import time
import requests

fileName = "recognition.wav"
modelName = "converted_model5.tflite"
timeoutThresholdMs = 750
serverAddress = "http://localhost:3001"


def current_milli_time(): return int(round(time.time() * 1000))


def takeInput():
    arduino = serial.Serial('/dev/cu.usbmodem14101', 9600, timeout=.1)
    fileBuffer = []
    start = current_milli_time()

    while True:
        # if there is too much silence, we discard the buffer and start again
        if (current_milli_time() - start > timeoutThresholdMs):
            fileBuffer = []

        data = arduino.readline()[:-2]
        if data:
            fileBuffer.append(data)
            start = current_milli_time()

        if len(fileBuffer) >= 10000:
            break

    sf.write(fileName, np.array(fileBuffer).astype(np.int16), 8000)


def analyzeInput():
    # Load TFLite model and allocate tensors.
    interpreter = tf.lite.Interpreter(model_path=modelName)
    interpreter.allocate_tensors()

    # Get input and output tensors.
    input_details = interpreter.get_input_details()
    output_details = interpreter.get_output_details()

    # Test model on random input data.
    input_shape = input_details[0]['shape']

    def extract_features(file_name):

        try:
            audio, sample_rate = librosa.load(
                file_name, res_type='kaiser_best')
            mfccs = librosa.feature.mfcc(y=audio, sr=sample_rate, n_mfcc=128)
            mfccsscaled = np.mean(mfccs.T, axis=0)

        except Exception as e:
            print("Error encountered while parsing file: ", file_name)
            return None

        return mfccsscaled

    data = extract_features(fileName)
    our_data = np.reshape(data, input_shape)

    interpreter.set_tensor(input_details[0]['index'], our_data)
    interpreter.invoke()

    # The function `get_tensor()` returns a copy of the tensor data.
    # Use `tensor()` in order to get a pointer to the tensor.
    output_data = interpreter.get_tensor(output_details[0]['index'])
    return output_data


while True:
    takeInput()
    output_data = analyzeInput()
    print(output_data)
    if (output_data[0, 1] > 0.6):
        requests.post(url= serverAddress + "/alarm/on")
