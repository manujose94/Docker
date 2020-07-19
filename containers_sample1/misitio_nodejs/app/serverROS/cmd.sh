#!/bin/sh 

 PID=$(lsb_release -a);
echo "$PID"
 PID2=$(uname -a);
echo "$PID2"
 PID3=$(rosversion -d);
echo "$PID3"
