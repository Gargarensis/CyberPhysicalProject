# CyberPhysicalProject
Server routes:
`GET <address>:3001/alarm` -> return true or false based on if the alarm is active<br>
`POST <address>:3001/alarm/on` -> sets the alarm on<br>
`POST <address>:3001/alarm/off` -> sets the alarm off<br>
`POST <address>:3001/alarm/disable` -> disable the alarm<br>
`GET <address>:3001/alarm/sounds` -> return list of available sounds<br>
`POST <address>:3001/alarm/sound` -> change sound to one available on the list. Requires Content-Type: application/json with body of format { "fileName":"name-from-the-list" }<br>