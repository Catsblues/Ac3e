from flask import Flask, request
import os
import base64
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app)

@app.route('/file/send_file', methods=['POST'])
def send_file():

    print(request.form["file"])
    
    content = request.form["file"]
    filename = request.form["filename"]
    print("filename: ")
    print(filename)


    pdf_decoded = base64.b64decode(content.split(",")[1])

    file = open(filename, 'wb')
    file.write(content)
    file.close()

    return {"message" : 'File saved'}, 200

@app.route('/file/get_file', methods=['GET'])
def get_file():

    file_name = request.json["file"]
    print("file_name: ")
    print(file_name)
    file = open(file_name, 'rb')

    content = file.read()
    file.close()

    return {"content" : content}, 200

@app.route('/file/delete_file', methods=['DELETE'])
def delete_file():

    file_name = request.json["file"]
    os.remove(file_name)
    return {"message" : 'File deleted'}, 200


if __name__ == '__main__':
    app.run(debug=True, port=4000)
