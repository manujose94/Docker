#! /usr/bin/env python

import json
import sys
import time

    
USAGE = "Usage: python {sys.argv[0]} [--help] | [-u <user> ] [-h <host> ] [-p <password> ] [-c '<command>,<command>']"
MESSAGE = {}


def parse(args):
    options, arguments = getopt.getopt(
        args,                              # Arguments
        'j:',                            # Short option definitions
        ["json="]) # Long option definitions
    commands= None
    json=None
    all_params=0
    for o, a in options:
        if o in ("-j", "--json"):
            json = a
            all_params+=1 
       
           
    if all_params == 0:
            print("Arguments are not used rigth now") # Argument example -c 'cat' halo.txt, so arguemnts lenght is 1 
            return json.dumps({'message': 'Missing arguments at launch', 'succes': 'false'})
    try:
        output_command=launch(commands,user,host,password)
        MESSAGE=json.dumps({'message': output_command, 'succes': 'true'})
    except:
        MESSAGE=json.dumps({'message': 'Error on python file', 'succes': 'false'})
    return MESSAGE

def main(topics):
    #global tiempo
    #rospy.Subscriber('clock',Clock ,tiempo)
    print(topics)
    global vel_mon
    vel_mon=0
    vel = Twist()
    vel.angular.z=0.2
    rospy.init_node(robot+'_velocity_check')
    pub = rospy.Publisher('/'+robot+'/robotnik_base_control/cmd_vel', Twist, queue_size=10)
    rospy.Subscriber('/'+robot+'/robotnik_base_control/odom',Odometry, callback)
    if (diff < 0.10):
        respuesta_json = {
            "message": diff,
            "succes": True
        }
    else:
        respuesta_json = {
            "message": diff,
            "succes": False
        }
    
    respuesta_json = json.dumps(respuesta_json)
    print(respuesta_json)

if __name__ == '__main__':
    try:
        if len(sys.argv) == 2:
            main(sys.argv[1])       
        else:
            print("You must only define robot name as argument. Usage: Angular_Velocity_Check.py robot_name") 

    except rospy.ROSInterruptException:
        pass

    except:
        respuesta_json = {
            "message": "Exception: " + str(sys.exc_info()[1]),
            "succes": False
        }
        respuesta_json = json.dumps(respuesta_json)
        print(respuesta_json)
