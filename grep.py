import os

dir_path = os.path.abspath(os.getcwd())


def fileMode(submode):

    inpath = input("Enter the file path: ")

    if submode == "1":

        findThat = input("Enter what you want to find: ")

        try:

            with open(inpath, "r") as thefile:

                filedata = thefile.read()

        except:

            exit()

        if filedata.find(findThat) > -1:

            print("We have found your query in this file")

        else:

            print("We have not found your query in this file")

    if submode == "2":

        findThat = input("Enter what you want to find: ")
        replaceIt = input("Enter what you want to replace it with: ")

        try:

            with open(inpath, "r") as thefile:

                filedata = thefile.read()

        except:

            exit()

        newfiledata = filedata.replace(findThat, replaceIt)

        with open(inpath, "w") as thefile:

            thefile.write(newfiledata)

        print("We have run the query that you have enterd")


def folderMode(submode):

    try:

        with open(".grepignore", "r") as ignorefile:

            ignorelist = ignorefile.read().split("\n")

    except FileNotFoundError:

        ignorelist = []

    files = []
    filenames = []

    for (dir_path, dir_names, file_names) in os.walk("."):

        for file in file_names:

            filepath = f"{dir_path}/{file}"

            truename = filepath[2::]

            if ignorelist.count(truename) > 0 or truename.find(".git") > -1:

                continue

            files.append(filepath)
            filenames.append({

                "path": filepath,
                "truepath": truename,
                "name": file

            })

    if submode == "1":

        filecontents = []

        for filepath in files:

            truename = filepath[2::]

            with open(truename, "r") as filecontent:

                contents = filecontent.read()

                filecontents.append({

                    "name": filepath,
                    "content": contents

                })

        findThat = input("Enter what you want to find: ")

        finds = []

        for filedata in filecontents:

            if filedata.get("content").find(findThat) > -1:

                finds.append(filedata.get("name"))

        print()

        for find in finds:

            print(find[2::])

        print()

        print("In all of the files above we have found your query")

    if submode == "2":

        filecontents = []

        for filepath in files:

            truename = filepath[2::]

            with open(truename, "r") as filecontent:

                contents = filecontent.read()

                filecontents.append({

                    "name": filepath,
                    "content": contents

                })

        findThat = input("Enter what you want to find: ")
        replaceIt = input("Enter what you want to replace it with: ")

        finds = []

        for filedata in filecontents:

            if filedata.get("content").find(findThat) > -1:

                with open(filedata.get("name"), "w") as cfile:

                    newfile = filedata.get("content").replace(
                        findThat, replaceIt)

                    cfile.write(newfile)

                finds.append(filedata.get("name"))

        print()

        for find in finds:

            print(find[2::])

        print()

        print("In all of the files above we have found your query")

    if submode == "3":

        findThat = input("Enter what you want to find in the file name: ")

        finds = []

        for file in filenames:

            if file.get("name").find(findThat) > -1:

                finds.append(file.get("truepath"))

        print()

        for find in finds:

            print(find)

        print()

        print("In all of the files above we have found your query")


print(f"Current Path: {dir_path}")
print()
print("MODES")
print("1. File")
print("2. Folder")

mode = input("Enter a mode: ")

print()
print("SUBMODES")


print("1. Find in file")
print("2. Replace in file")

if mode != "1":

    print("3. Find in file name")


submode = input("Enter a submode: ")


if mode == "1":

    fileMode(submode)


if mode == "2":

    folderMode(submode)
