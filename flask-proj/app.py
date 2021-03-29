import sys
from flask import Flask, render_template, request, jsonify  # , url_for


app = Flask(__name__)
app.config["TEMPLATES_AUTO_RELOAD"] = True
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0


@app.route("/")
def hello():
    return render_template("test.html")


# @app.route("/config")
# def config():
#     return url_for("config.json")


@app.route("/test-action", methods=["POST", "GET"])
def test_btn_handle():
    data = request.get_json()
    print(data)
    data *= 10
    return jsonify(data)


# No caching at all for API endpoints.
@app.after_request
def add_header(response):
    # response.cache_control.no_store = True
    response.headers['Cache-Control'] = 'no-store, no-cache, must-revalidate, post-check=0, pre-check=0, max-age=0'
    response.headers['Pragma'] = 'no-cache'
    response.headers['Expires'] = '-1'
    return response


if __name__ == "__main__":
    # app.run(ssl_context='adhoc')
    # app.run(host='0.0.0.0')

    if (len(sys.argv) > 1):
        host = sys.argv[1]
        port = sys.argv[2]
        print(host, port)
        app.run(host=host, port=port, debug=True)
    else:
        app.run(host='0.0.0.0', debug=True)
