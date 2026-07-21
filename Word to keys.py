word = "Satan"

with open("file2.txt") as f:
    content = f.read()

Content_New = content.replace(word , "#" * len(word))

with open("file2.txt" , "w") as f:
    f.write(Content_New)