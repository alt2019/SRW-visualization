import os
import sys
import json
from multiprocessing import Process
import webbrowser


def run(host, main_port=10000):
    # setup ports
    # main_port = 50000
    # api_port = 50001
    api_port = int(main_port) + 1
    # send ports to microservices (NotImplemented)
    app_config = {
        "host": host,
        # "main-port": 50000,
        # "api-port": 50001,
        "main-port": main_port,
        "api-port": api_port
    }
    with open('static/config.json', 'w') as outfile:
        json.dump(app_config, outfile)
    # run app
    p1 = Process(target=os.system, args=(f"python3 app.py {host} {main_port}",))
    p2 = Process(target=os.system, args=(f"python3 app-python-mcs.py {host} {api_port}",))
    p3 = Process(target=webbrowser.open, args=(f"{host}:{main_port}",))
    p1.start()
    p2.start()
    p3.start()
    p1.join()
    p2.join()
    p3.join()


if __name__ == "__main__":
    if len(sys.argv) > 1:
        run(sys.argv[1], sys.argv[2])
    else:
        run("0.0.0.0")
