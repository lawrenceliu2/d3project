import csv

n = open('csv/nyc.csv')
nyc = csv.reader(n)

d = open('csv/nycdoe.csv')
doe = csv.reader(d)

h = open('csv/specializedhs.csv')
hs = csv.reader(h)

def racepercent(borough, year):
    races = {}
    for row in nyc[1:]:
        print row
        if (row[0] == borough and row[1] == year):
            population = row[2] * 1.0
            white = row[3] / population
            black = row[5] / population #do not be alarmed! I KNOW HOW TO COUNT!
            asian = row[6] / population
            other = row[7] / population
            hispanic = row[8] / population
            foreign = row[9] / population
            races = {"population": population, "white": white, "black": black, "asian": asian, "other": other, "hispanic": hispanic, "foreign": foreign}
    return races

p = racepercent(nyc, 1900)
print p        
#def genderpercent(borough, year):
#    for row in ny

#function that takes borough and year
#percent gender
#percent race

#same thing excpet doesnt take gender
#percent race

#same thing except takes school and year
#percent race

