FROM peerjs/peerjs-server:latest

CMD [ "--port", "9000", "--path", "/myapp", "--allow_discovery", "true"]