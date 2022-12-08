import pyautogui
from time import sleep
from imageai.Detection import ObjectDetection
import os

x = input("write your png name:")+'.png'
sleep(5)
img = pyautogui.screenshot()
img.save(x)
print("successfully downloaded")

execution_path = os.getcwd()
detector = ObjectDetection()
detector.setModelTypeAsRetinaNet()
detector.setModelPath( os.path.join(execution_path , "resnet50_coco_best_v2.1.0.h5"))
detector.loadModel()
detections = detector.detectObjectsFromImage(input_image=os.path.join(execution_path , x), output_image_path=os.path.join(execution_path , x))

for eachObject in detections:
    print(eachObject["name"] , " : " , eachObject["percentage_probability"] )

