#!/bin/bash
set -e

# setup ros environment
# Source ROS distro environment and local catwin workspace
source "/opt/ros/$ROS_DISTRO/setup.bash" && source "$CATKIN_WS/devel/setup.bash"

# setup workspace if it exists
if [ -n "$WORKSPACE_NAME" ]; then
    if [ ! -e "/root/$WORKSPACE_NAME/devel/setup.sh" ]; then
        previousDirectory=$(pwd)
        cd /root/$WORKSPACE_NAME
        catkin_make
        cd $previousDirectory
    fi
    source "/root/$WORKSPACE_NAME/devel/setup.sh"
    echo "/root/$WORKSPACE_NAME"

fi
if [ -e "/root/$WORKSPACE_NAME/src/web-test/server.py" ]; then
    python3 /root/$WORKSPACE_NAME/src/web-test/server.py &>/dev/null &
    pid=$! #Running a Python SimpleHTTPServer in the background
    # Stop server: kill "${pid}"
fi
# to launch example project roslibjs > roslaunch web-test websocket.launch
exec "$@"

