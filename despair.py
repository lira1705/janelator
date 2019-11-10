# raindrop sensor DO connected to GPIO18
# HIGH = no rain, LOW = rain detected
# Buzzer on GPIO13
from time import sleep
from gpiozero import Buzzer, InputDevice

no_rain = InputDevice(5)
 
def buzz_now(iterations):
    for x in range(iterations):
        print("a")
 
while True:
    if not no_rain.is_active:
        print("It's raining - get the washing in!")
        buzz_now(5)
        # insert your other code or functions here
        # e.g. tweet, SMS, email, take a photo etc.
    else:
        print("It's not raining")
        
    sleep(1)