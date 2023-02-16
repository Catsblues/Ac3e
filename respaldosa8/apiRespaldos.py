from flask import Flask, request

app = Flask(__name__)

@app.route('/', methods=['GET'])
def index():
    response = {"message": "Hello World"}
    return response,200



if __name__ == '__main__':
    app.run(debug=True, port=80)