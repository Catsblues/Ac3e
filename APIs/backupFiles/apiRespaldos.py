from flask import Flask, request
import os

app = Flask(__name__)

@app.route('/send_file', methods=['POST'])
def send_file():

    file = request.files['file']
    file_name = file.filename

    file.save(file_name)

    return 'File saved', 200

@app.route('/get_file', methods=['GET'])
def get_file():

    file_name = request.json["file"]
    print("file_name: ")
    print(file_name)
    file = open(file_name, 'rb')

    content = file.read()
    file.close()

    return content, 200

@app.route('/delete_file', methods=['DELETE'])
def delete_file():

    file_name = request.json["file"]
    os.remove(file_name)
    return 'File deleted', 200


if __name__ == '__main__':
    app.run(debug=True, port=3000)