from flask import Flask, request, jsonify
from flask_cors import CORS
import jwt
import pymysql

app = Flask(__name__)
cors = CORS(app)

@app.route('/login/newToken', methods=['POST'])
def login():
    user = request.json['user']
    password = request.json['password']
    token = generar_token(user, password)
    if token:
        response = jsonify({'token': token})
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
    else:
        response = jsonify({'error': 'Usuario o contraseña incorrectos'})
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
    

def generar_token(user, password):

    if verificar(user, password):
        datos_token = { 'user': user, 'name': obtener_nombre(user),'rol': obtener_rol(user)}


        token = jwt.encode(datos_token, '4+rh6@re', algorithm='HS256')

        return token
    
    
def verificar(user, password):
    conexion = pymysql.connect(host='54.162.2.109',user='remoteUser', password='Admin@0301', db='reportes', port=3306)

    try:
        with conexion.cursor() as cursor:
            sql = "SELECT pass FROM investigadores WHERE mail = %s"
            cursor.execute(sql, (user,))
            resultado = cursor.fetchone()
            if resultado is not None and resultado[0] == password:
                return True
            else:
                return False
            
    finally:
        conexion.close()

def obtener_rol(user):
    conexion = pymysql.connect(host='54.162.2.109',user='remoteUser', password='Admin@0301', db='reportes', port=3306)

    try:
        with conexion.cursor() as cursor:
            sql = "SELECT line FROM investigadores WHERE mail = %s"
            cursor.execute(sql, (user))
            resultado = cursor.fetchone()[0].strip('')
            print(resultado)
            print("hola")
            if resultado == "Manager":
                print("admin")
                return "admin"
            else:
                print("user")
                return "user"
    finally:
        conexion.close()

def obtener_nombre(user):
    conexion = pymysql.connect(host='54.162.2.109',user='remoteUser', password='Admin@0301', db='reportes', port=3306)

    try:
        with conexion.cursor() as cursor:
            sql = "SELECT name FROM investigadores WHERE mail = %s"
            cursor.execute(sql, (user))
            resultado = cursor.fetchone()[0].strip('')
            return resultado
    finally:
        conexion.close()



if __name__ == '__main__':
    app.run(host= '0.0.0.0',debug=True, port=5002)