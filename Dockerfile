FROM node:8-slim

LABEL "com.github.actions.name"="PR Appreciation"
LABEL "com.github.actions.description"="Appreciate the person who created a new PR!"
LABEL "com.github.actions.icon"="thumbs-up"
LABEL "com.github.actions.color"="blue"

LABEL "repository"="https://github.com/explooosion/winnie-greet-actions"
LABEL "homepage"="https://github.com/explooosion/winnie-greet-actions"
LABEL "maintainer"="Robby <ta7382@gmail.com>"

ADD entrypoint.sh /action/entrypoint.sh
ADD package.json /action/package.json
ADD app.js /action/app.js

RUN chmod +x /action/entrypoint.sh

ENTRYPOINT ["/action/entrypoint.sh"]