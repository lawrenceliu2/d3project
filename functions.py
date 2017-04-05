import csv

#nyc data
with open('csv/nyc.csv', 'rb') as n:
    reader = csv.reader(n)
    nyc_list = list(reader)
#print nyc_list

#nyc doe data
with open('csv/nycdoe.csv', 'rb') as d:
    reader = csv.reader(d)
    doe_list = list(reader)
#print doe_list

#nyc doe specialized high school data
with open('csv/specializedhs.csv', 'rb') as hs:
    reader = csv.reader(hs)
    hs_list = list(reader)
#print hs_list

def racepercent(borough, year):
    races = dict()
    for row in nyc_list[1:]:
        for n in range(len(row)):
            if row[0].strip() == borough and int(row[1].strip()) == year:
                white = int(row[3].strip())
                black = int(row[5].strip()) #do not be alarmed! I KNOW HOW TO COUNT!
                asian = int(row[6].strip())
                other = int(row[7].strip())
                if (row[8].strip() != 'null'):
                    hispanic = int(row[8].strip())
                else:
                    hispanic = 0
                foreign = int(row[9].strip())
                total = (white + black + asian + other + hispanic + foreign) * 1.0
                races.update({'total': total, 'white': white/total, 'black': black/total, 'asian': asian/total, "other": other/total, 'hispanic': hispanic/total, 'foreign': foreign/total})
    return races
#testing
r = racepercent('manhattan', 1910)
print r['white']
print r['black']
print r['asian']
print r['other']
print r['hispanic']
print r['foreign']
print r['total']

def doe_genderpercent(borough, year):
    genders = dict()
    for row in doe_list[1:]:
        for n in range(len(row)):
            if row[0].strip() == borough and int(row[1].strip()) == year:
                total = int(row[2].strip())
                female = int(row[3].strip()) * 100.0 / total
                male = int(row[4].strip()) * 100.0 / total
                genders.update({'total': total, 'female': female, 'male': male})
    return genders
#testing
#g = doe_genderpercent('manhattan', 2011)
#print g['female']
#print g['male']

def doe_racepercent(borough, year):
    races = dict()
    for row in doe_list[1:]:
        for n in range(len(row)):
            if row[0].strip() == borough and int(row[1].strip()) == year:
                asian = int(row[3].strip())
                black = int(row[4].strip())
                hispanic = int(row[5].strip())
                other = int(row[6].strip())
                white = int(row[7].strip())
                total = (asian + black + hispanic + other + white) * 1.0
                races.update({'total': total, 'asian': asian/total, 'black': black/total, 'hispanic': hispanic/total, 'other': other/total, 'white': white/total})
#testing
r = doe_racepercent('brooklyn', 2013)
print r['asian']
print r['black']
print r['hispanic']
print r['other']
print r['white']
print r['total']

def hs_genderpercent(borough, year):
    genders = dict()
    for row in hs_list[1:]:
        for n in range(len(row)):
            if row[0].strip() == borough and int(row[1].strip()) == year:
                total = int(row[2].strip()) 
                female = int(row[3].strip()) * 100.0 / total
                male = int(row[4].strip()) * 100.0 / total
                genders.update({'total': total, 'female': female, 'male': male})
    return genders
#testing
#g = doe_genderpercent('bronx', 2015)
#print g['female']
#print g['male']

def hs_racepercent(borough, year):
    races = dict()
    for row in hs_list[1:]:
        for n in range(len(row)):
            if row[0].strip() == borough and int(row[1].strip()) == year:
                asian = int(row[3].strip())
                black = int(row[4].strip())
                hispanic = int(row[5].strip())
                other = int(row[6].strip())
                white = int(row[7].strip())
                total = (asian + black + hispanic + other + white) * 1.0
                races.update({"total": total, "asian": asian/total, "black": black/total, "hispanic": hispanic/total, "other": other/total, "white": white/total})
    return races
#testing
r = doe_racepercent('brooklyn', 2013)
print r['asian']
print r['black']
print r['hispanic']
print r['other']
print r['white']
print r['total']

