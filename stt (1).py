import sys
import wave
from vosk import Model, KaldiRecognizer
import json

model = Model("models/vosk-model-small-en-us-0.15")

wf = wave.open(sys.argv[1], "rb")
rec = KaldiRecognizer(model, wf.getframerate())

while True:
    data = wf.readframes(4000)
    if len(data) == 0:
        break
    rec.AcceptWaveform(data)

result = json.loads(rec.FinalResult())
print(result.get("text", ""))