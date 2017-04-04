import csv

n = open('csv/nyc.csv', 'r')
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

#p = racepercent(nyc, 1900)
#print p
# WHAT IS THIS ERROR WHY IS IT BEING LIKE THIS TypeError: '_csv.reader' object has no attribute '__getitem__'

def doe_genderpercent(borough, year):
    genders = {}
    for row in doe[1:]:
        print row
        if (row[0] == borough and row[1] == year):
            total = row[2] * 1.0
            female = row[3] / total
            male = row[4] / population
            genders = {"total": total, "female": female, "male": male}
    return genders

def doe_racepercent(borough, year):
    races = {}
    for row in doe[1:]:
        print row
        if (row[0] == borough and row[1] == year):
            total = row[2] * 1.0
            asian = row[3] / total
            black = row[4] / total
            hispanic = row[5] / total
            other = row[6] / total
            white = row[7] / total
            races = {"total": total, "asian": asian, "black": black, "hispanic": hispanic, "other": other, "white": white}
    return races

def hs_genderpercent(borough, year):
    genders = {}
    for row in hs[1:]:
        print row
        if (row[0] == borough and row[1] == year):
            total = row[2] * 1.0
            female = row[3] / total
            male = row[4] / population
            genders = {"total": total, "female": female, "male": male}
    return genders

def hs_racepercent(borough, year):
    races = {}
    for row in hs[1:]:
        print row
        if (row[0] == borough and row[1] == year):
            total = row[2] * 1.0
            asian = row[3] / total
            black = row[4] / total
            hispanic = row[5] / total
            other = row[6] / total
            white = row[7] / total
            races = {"total": total, "asian": asian, "black": black, "hispanic": hispanic, "other": other, "white": white}
    return races

