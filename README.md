# DAB-Project-2
Group Members
•	Bimal 
•	Divya
•	Lily
•	Kelly 
•	Warren

Objective: The project’s objective was to analyse plane crashes between 1908 and 2019 in order to plot the trend of fatalities based on year, determine the most dangerous airlines, points of origin, aircraft, aircraft operators and countries to fly in. 

Pitfalls: We had issues passing the large dataset from between Python and Javascript. We also underestimated the complexity of some of the visualizations we wanted to do.  Creating the app routes to get the data from endpoints got a little tricky too. We needed some assistance with indexing but learning that parsing in orient=’records’ to the route when transforming the dataframe to_json helped a lot in creating user-friendly endpoints. The number of entries in the dataset meant that we would exceed the free API calls through Google and so we had to find a workaround using GeoPy, this ended up providing some null values for crashes located in the ocean. 

Steps:
1.	We identified a common interest in airplane crashes and a large dataset on Kaggle (https://www.kaggle.com/chadmunger/plane-crashes-1908-2019).
2.	We used a Jupyter Notebook to clean the data. We dropped unneeded columns (e.g. flight number, registration numbers) that did not contribute to the story we wanted to tell. We formatted dates, added a fatalities rate column, delete null values and duplicates, created bins for decades, etc.
3.	Then we loaded the clean data in Postgres using sqlalchemy.
4.	From the data loaded using SQL, we created and API end point in an app.py file. 
5.	At this point we split off to create a visualisation each to tell the story. 
