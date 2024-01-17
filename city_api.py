from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import mysql.connector as msql 

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True,
)

@app.get("/city")
async def root():
    conn = msql.connect(host='sql12.freesqldatabase.com',user='sql12674993',password='sJC8eWAa6B', database='sql12674993',port='3306')
    cursor = conn.cursor()
    q = "select distinct city from Tathya;"
    cursor.execute(q)
    result = cursor.fetchall()
    cities = []
    for i in result:
        for j in i:
            cities.append(j)

    conn.close()

    return {"cities": cities}

@app.get("/location")
async def root(city):
    
    conn = msql.connect(host='sql12.freesqldatabase.com',user='sql12674993',password='sJC8eWAa6B', database='sql12674993',port='3306')
    
    cursor = conn.cursor()
    a = city.capitalize()
    q = f'select distinct locality from Tathya where city ="{a}";'
    cursor.execute(q)
    result = cursor.fetchall()
    locations = []
    for i in result:
        for j in i:
            locations.append(j)

    conn.close()
    return {"city": city, "locations": locations}

@app.get("/result")
async def root(city,location):
    conn = msql.connect(host='sql12.freesqldatabase.com',user='sql12674993',password='sJC8eWAa6B', database='sql12674993',port='3306')
    
    cursor = conn.cursor()
    q = 'select furnish_type, floor(avg(price_per_area)) from sql12674993.Tathya where city="%s" and locality="%s" Group by furnish_type;'%(city.capitalize(),location)
    cursor.execute(q)
    result = cursor.fetchall()
    mydict = dict(result)
    conn.close()
    b = {x: float(y) for x,y in mydict.items()}
    # print(mydict.map(lambda x: mydict[x])
    # print(b)
    return b

