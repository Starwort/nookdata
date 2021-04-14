import json

try:
    import pyperclip
except ModuleNotFoundError:
    print("This script requires pyperclip. Install it, then run the script again")
    exit(1)

print(
    "The script will overwrite your clipboard; make a copy of it before running this"
    " script"
)
input("Press Enter to continue...")
pyperclip.copy("copy(window.localStorage.nookdata);")
print(
    "Paste and run the code snippet in your clipboard into the JavaScript console of"
    " NookData v1"
)
input("Press Enter to continue...")
data = json.loads(pyperclip.paste())
new_data = {
    "bugs": [
        {
            "obtained": data["critterpedia"][f"bug_{i:0>2}_obtained"],
            "modelled": data["critterpedia"][f"bug_{i:0>2}_modelled"],
        }
        for i in range(80)
    ],
    "fish": [
        {
            "obtained": data["critterpedia"][f"fish_{i:0>2}_obtained"],
            "modelled": data["critterpedia"][f"fish_{i:0>2}_modelled"],
        }
        for i in range(80)
    ],
}
pyperclip.copy("window.localStorage.critterpedia = '" + json.dumps(new_data) + "';")
print(
    "Paste and run the code snippet in your clipboard into the JavaScript console of"
    " NookData v2"
)
