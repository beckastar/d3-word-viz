from flask import Flask, render_template, flash, redirect, json, url_for, request, make_response
from app import app
import tablib
import os
import csv
from .forms import LoginForm
from json import dumps



@app.route('/')
@app.route('/index')
def index(): 
    return render_template('index.html',
                           title='Home',
                          )

@app.route('/viz')
def viz():
    return render_template("viz.html", 
                          title="Bubbles",
                          )


# wordlist = tablib.Dataset()
# with open(os.path.join(os.path.dirname(__file__), "./word_data/4000words.csv")) as f:
# 	wordlist.csv = f.read()

@app.route('/words')
def words(): 
	with app.open_resource("static/words.json") as f:
		data = json.load(f)









# @app.route('/wordsjson')
# def wordsjson
	 	# return render_template("words.html", 
   #                        title="Bubbles",
   #                        )
