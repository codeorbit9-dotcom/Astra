import sys
import joblib

model = joblib.load("models/classifier.joblib")
vectorizer = joblib.load("models/vectorizer.joblib")

text = sys.argv[1]
vec = vectorizer.transform([text])
prediction = model.predict(vec)[0]

print(prediction)