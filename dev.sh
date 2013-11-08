# Variables set up by this script:
# SERVER_PORT            Port exposed by this component.
# JENKINS_WS_PROTOCOL    Protocol used for communicating with perspective-jenkins instance
# JENKINS_URL            Url to perspective-jenkins instance
# JENKINS_WS_HREF        Websocket-url to perspective-jenkins instance
# TASKS_URL              URL to perspective-tasks instance

SERVER_PORT=8000 JENKINS_URL="http://localhost:8888" JENKINS_WS_HREF="ws://localhost:8888" JENKINS_WS_PROTOCOL="perspective-protocol" TASKS_URL="http://localhost:8889" nodemon index.js
#NODE_ENV="production" SERVER_PORT=8000 JENKINS_URL="http://localhost:8888" JENKINS_WS_HREF="ws://localhost:8888" JENKINS_WS_PROTOCOL="perspective-protocol" TASKS_URL="http://localhost:8889" nodemon index.js
