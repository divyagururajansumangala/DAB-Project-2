from flask import Flask, render_template, redirect,jsonify,render_template
app = Flask(__name__)

from sqlalchemy import create_engine
import pandas as pd

# for pandas reqd_sql
engine = create_engine(f"postgresql://postgres:asd@localhost:5432/DAB-Project-2")
connection = engine.connect()

@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html')

@app.route('/view_one')
def view1():
    return render_template('view_one.html')
@app.route('/view_two')
def view2():
    return render_template('view_two.html')
@app.route('/view_three')
def view3():
    return render_template('view_three.html')
    

@app.route("/data")
def data():
    
    df = pd.read_sql("SELECT * FROM finalcrash_data ",connection)
    records = df.to_json(orient='records')
    return records
    
@app.route("/landingsites")
def data2():

    df = pd.read_sql("SELECT * FROM finalcrash_data ", connection)
    df = df.groupby(['country']).sum().reset_index()
    df=df.sort_values(['fatalities'],ascending=False)
    
    records = df.to_json(orient='records')
    return records

@app.route("/fatalitiesyear")
def data5():

    df = pd.read_sql("SELECT * FROM finalcrash_data ", connection)
    df = df.groupby(['year']).sum().reset_index()
    df=df.sort_values(['fatalities'],ascending=False)
    
    records = df.to_json(orient='records')
    return records


@app.route("/operators")
def data3():

    df = pd.read_sql("SELECT * FROM finalcrash_data ", connection)
    df = df.groupby(['operator']).count().reset_index().sort_values(['fatalities'],ascending=False)
    records = df.to_json(orient='records')
    return records

@app.route("/year")
def data4():

    df = pd.read_sql("SELECT * FROM finalcrash_data ", connection)
    df = df.groupby(['year']).count().reset_index().sort_values(['fatalities'],ascending=False)
    records = df.to_json(orient='records')
    return records

@app.route("/aircraft_type")
def data6():

    df = pd.read_sql("SELECT * FROM finalcrash_data ", connection)
    df = df.groupby(['ac_type']).count().reset_index().sort_values(['fatalities'],ascending=False)
    records = df.to_json(orient='records')
    return records

@app.route("/data0")
def data0():

    df = pd.read_sql("SELECT * FROM finalcrash_data ", connection)
    df = df.groupby(['ac_type','operator'])['fatalities'].sum().reset_index()
    records = df.to_json(orient='records')
    return records

@app.route("/wc_origins")    
def wc_origins():
    df = pd.read_sql("SELECT * FROM finalcrash_data ", connection)
    df = df.groupby(['origin']).size().reset_index(name='counts')
    df.rename(columns={'origin':'word', 'counts':'size'}, inplace=True)
    records = df.to_json(orient='records')
    return records    


if __name__ == "__main__":
    app.run(debug=True)