import requests
import time
import vlc
serverAddress = "http://localhost:3001"

p = None

while True:
    time.sleep(5);
    response = requests.get(url=serverAddress + "/alarm").text
    sound = requests.get(url=serverAddress + "/alarm/sound").text
    if (response == "true"):
        if (p == None):
            p = vlc.MediaPlayer(serverAddress + "/sounds/" + sound)
        p.play()
    else:
        if (p != None):
            p.stop()
            p = None
    
