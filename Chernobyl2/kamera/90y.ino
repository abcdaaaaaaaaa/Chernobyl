#include <WiFi.h>
const char* ssid      = "Chernobyl";          
const char* password  = NULL;          
IPAddress local_IP(192, 168, 1, 2);
void setup() {
  Serial.begin(115200); 
  Serial.setDebugOutput(true);                
  Serial.println();

  cameraInit();                              

  WiFi.begin(ssid, password);                 

  while (WiFi.status() != WL_CONNECTED)      
  {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("Coneccted ");
  startCameraServer();                       
  Serial.print(WiFi.localIP());
  }

void loop() {
}
