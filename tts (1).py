import sys
from TTS.api import TTS

tts = TTS(model_name="tts_models/en/ljspeech/tacotron2-DDC")

text = sys.argv[1]
file_path = "output.wav"
tts.tts_to_file(text=text, file_path=file_path)

print(file_path)