#SERVER_PORT            Port exposed by this component.
#EVENTS_URL             URL to perspective-events instance
#JENKINS_URL            URL to perspective-jenkins instance
#TASKS_URL              URL to perspective-tasks instance

SERVER_PORT=8000 \
EVENTS_URL="http://localhost:8890" \
JENKINS_URL="http://localhost:8888" \
TASKS_URL="http://localhost:8889" \
nodemon index.js

#NODE_ENV="production" SERVER_PORT=8000 JENKINS_URL="http://localhost:8888" JENKINS_WS_HREF="ws://localhost:8888" JENKINS_WS_PROTOCOL="perspective-protocol" TASKS_URL="http://localhost:8889" nodemon index.js
