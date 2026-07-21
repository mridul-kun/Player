# To generate tables from 0 to 20 #

def generatetable(n):
    table = ""
    for i in range(1,11):
        table += f"{n} X {i} = {n*i}\n "
    with open(f"Tables/table_{n}" , "w") as f:
        f.write(table)

for i in range(0,21):
    generatetable(i)