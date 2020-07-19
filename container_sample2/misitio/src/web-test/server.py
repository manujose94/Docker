import http.server
import socketserver
import os
PORT = 8005
#HOST ="158.42.163.97"

web_dir = os.path.join(os.path.dirname(__file__), './gui') #in sever : /usr/local/bin/
os.chdir(web_dir)
Handler = http.server.SimpleHTTPRequestHandler
# Python version 3.5 

#Must be alllowed reuse addres
socketserver.TCPServer.allow_reuse_address = True
httpd  = socketserver.TCPServer(("", PORT), Handler)

print("serving at port", PORT)
print("http://localhost:8005/")
try:
    httpd.serve_forever()
except KeyboardInterrupt:
    print("Caught KeyboardInterrupt, terminating http server")
    httpd.shutdown()
