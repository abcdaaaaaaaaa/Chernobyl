import cvlib as cv
from cvlib.object_detection import draw_bbox
import pyautogui
from time import sleep
from imageai.Detection import ObjectDetection
import os
while True:

    print("After giving the png name, it is recommended to switch to the page for which a screenshot is requested within 5 seconds.")
    y=input("If you want to take photo you can write 'yes' if you want to quityou can write 'no':")
    if (y=='no'):
        break 
    if (y == 'yes'):
        x = input("write your png name:")+'.png'
        sleep(5)
        img = pyautogui.screenshot()
        img.save(x)
        print("successfully downloaded")
        continue
