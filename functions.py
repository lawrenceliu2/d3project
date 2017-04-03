import csv

n = open('csv/nyc.csv')
nyc = csv.reader(n)

d = open('csv/nycdoe.csv')
doe = csv.reader(nd)

h = open('csv/specializedhs.csv')
hs = csv.reader(h)

def racepercent(borough, year):
    races = []
    for row in nyc:
        if (row[0] == borough && row[1] == year) {
            population = row[2] * 1.0
            white = row[3] / population
            black = row[4] / population
            asian = row[5] / population
            other = row[6] / population
            hispanic = row[7] / population
            foreign = row[8] / population
            races = {"white": white, "black": black, "asian": asian, "other": other, "hispanic": hispanic, "foreign": foreign}
        }
        else
            row++
    return races
        
#def genderpercent(borough, year):
#    for row in ny

#function that takes borough and year
#percent gender
#percent race

#same thing excpet doesnt take gender
#percent race

#same thing except takes school and year
#percent race

