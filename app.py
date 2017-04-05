from flask import Flask, render_template, request
import functions
import json

app = Flask(__name__)

@app.route("/")
def root():
    return render_template("index.html", data = json.dumps(functions.data))

if (__name__ == "__main__"):
    app.debug = False
    app.run()
