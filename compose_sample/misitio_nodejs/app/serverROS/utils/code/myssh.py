#!/bin/python
import sys
import getopt
from pexpect import pxssh
import getpass
import json
#To create a excutable python
#https://realpython.com/pyinstaller-python/ 

#data = {"user": "student",
      #  "host": "192.168.225.130",
      #  "password": "student",
      #  "commands": " " .join(sys.argv[1:])}
USAGE = "Usage: python {sys.argv[0]} [--help] | [-u <user> ] [-h <host> ] [-p <password> ] [-c '<command>,<command>']"
MESSAGE = {}


def parse(args):
    options, arguments = getopt.getopt(
        args,                              # Arguments
        'iu:h:p:c:',                            # Short option definitions
        ["info", "user=","host=", "password=" "commands="]) # Long option definitions
    commands= None
    user=None
    host=None
    password=None
    all_params=0
    for o, a in options:
        if o in ("-i", "--help"):
            print(USAGE)
        if o in ("-u", "--user"):
            user = a
            all_params+=1  
        if o in ("-h", "--host"):
            host = a
            all_params+=1  
        if o in ("-p", "--password"):
            password = a
            all_params+=1       
        if o in ("-c", "--commands"):
            commands=a.split(",")
            all_params+=1  
           
    if all_params < 4:
            print("Arguments are not used rigth now") # Argument example -c 'cat' halo.txt, so arguemnts lenght is 1 
            return json.dumps({'message': 'Missing arguments at launch', 'succes': 'false'})
    try:
        output_command=launch(commands,user,host,password)
        MESSAGE=json.dumps({'message': output_command, 'succes': 'true'})
    except:
        MESSAGE=json.dumps({'message': 'ssh failed on login', 'succes': 'false'})
    return MESSAGE

def  launch(commands,username,hostname,password):
    if len(commands) < 1:
        return None
    _output=""
    try:
        s = pxssh.pxssh()
        s.login(hostname, username, password)
        for position in range(len(commands)):
            s.sendline(commands[position])   # run a command
            s.prompt()             # match the prompt
            _output+=s.before.decode('utf-8').split('\r\n')[1]+'\n'
        s.logout()
        return _output
    except pxssh.ExceptionPxssh as e:
        raise e
       

def main() -> None:
    args = sys.argv[1:]
    print(parse(args))

if __name__ == '__main__':
    main()
 # Example: /usr/bin/python3 /home/student/Documents/project/ssh.py -u student -h 192.168.225.130 -p student -c 'rosversion -d,rosnode list' 