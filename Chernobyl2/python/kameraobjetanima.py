import cv2
import pyautogui
from time import sleep

x = input("write your png name:")+'.png'
sleep(5)
img = pyautogui.screenshot()
img.save(x)
print("successfully downloaded")
image = cv2.imread(x)
image = cv2.resize(image, (1500, 1000))
h = image.shape[0]
w = image.shape[1]

weights = "ssd_mobilenet/frozen_inference_graph.pb"
model = "ssd_mobilenet/ssd_mobilenet_v3_large_coco_2020_01_14.pbtxt"
net = cv2.dnn.readNetFromTensorflow(weights, model)

class_names = []
with open("ssd_mobilenet/coco_names.txt", "r") as f:
    class_names = f.read().strip().split("\n")

blob = cv2.dnn.blobFromImage(
    image, 1.0/127.5, (320, 320), [127.5, 127.5, 127.5])
net.setInput(blob)
output = net.forward()  

for detection in output[0, 0, :, :]:  
    probability = detection[2]

   
    if probability < 0.5:
        continue
   
    box = [int(a * b) for a, b in zip(detection[3:7], [w, h, w, h])]
    box = tuple(box)
    cv2.rectangle(image, box[:2], box[2:], (0, 255, 0), thickness=2)

    class_id = int(detection[1])
    label = f"{class_names[class_id - 1].upper()} {probability * 100:.2f}%"
    cv2.putText(image, label, (box[0], box[1] + 15),
                cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)

cv2.imshow('Image', image)
cv2.waitKey()
