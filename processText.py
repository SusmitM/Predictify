from flask import Flask, request, jsonify
from spellchecker import SpellChecker  

app = Flask(__name__)



# Function to perform the post processing on the predicted Text
def postProcess(text):
    spell = SpellChecker()

    # Split the text into words
    words = text.split()

    # Iterate over the words and check for spelling and grammar errors
    corrected_words = []
    for word in words:
        corrected_word = spell.correction(word)
        corrected_words.append(corrected_word)

    # Join the corrected words back into a single string
    corrected_text = ' '.join(corrected_words)
    return corrected_text

if __name__ == '__main__':
    app.run()
