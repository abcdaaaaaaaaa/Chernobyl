import pyautogui
from time import sleep

x = input("write your png name:")+'.png'
sleep(5)
img = pyautogui.screenshot()
img.save(x)
print("successfully downloaded")
