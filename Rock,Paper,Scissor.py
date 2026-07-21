import random
'''
1 for rock(r)
-1 for paper(p)
0 for scissor(s)
You have to chose between r,p and s
'''
computer = random.choice([-1,0,1]) # It is a module which help in giving a random values
youstr = input("Enter your choice:")
youDict = {"r" : 1,"p" : -1,"s" : 0}
reverseDict = {1 :"Rock",-1 : "Paper",0 : "Scissor"}
you = youDict[youstr] # It means that (youDict) variable assigned values will be get into your choice

print(f"You chose {reverseDict[you]}\nComputer chose {reverseDict[computer]}") # It will show what value you and computer chose

if (computer == you):
    print("Its a draw!")

else:
    if (computer == -1 and you == 1):
        print("You lose,Try again")

    elif (computer == -1 and you == 0):
        print("Congrulations, you win!")
    
    elif (computer == 1 and you == -1):
        print("Congrulations, you win!")

    elif (computer == 1 and you == 0):
        print("You lose,Try again")

    elif (computer == 0 and you == 1):
        print("Congrulations, you win!")

    elif (computer == 0 and you == -1):
        print("You lose,Try again")

    else:
        print("Something went wrong!")

### Alternat Method ###
'''
if ((computer - you) == -1 or (computer - you) == 2):
    print("You lose!")
else:
    print("You win!") 
'''