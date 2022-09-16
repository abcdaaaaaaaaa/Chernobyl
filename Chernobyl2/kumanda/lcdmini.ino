
#include <WiFi.h>
#include "ESPAsyncWebServer.h"
#include <HTTPClient.h>

const char* ssid = "Chernobyl";
const char* password = NULL;

//Your IP address or domain name with URL path
const char* serverNameaverage = "http://192.168.1.1:85/averagecpm";
const char* serverNamesd = "http://192.168.1.1:85/sdcpm";
const char* serverNamearray = "http://192.168.1.1:85/cpmarray";

AsyncWebServer server(80);

#include <Wire.h>
#include "LiquidCrystal_I2C.h"
LiquidCrystal_I2C LCD_I2C_0x27(0x27, 16, 2);

int x;
int y;

String averageCPM;
String sdCPM;
String CPMArray;

unsigned long previousMillis = 0;
const long interval = 100; 
IPAddress local_IP(192, 168, 1, 3);

void setup() {
  Serial.begin(115200);

  
  WiFi.begin(ssid, password);
  Serial.println("Connecting");
  while(WiFi.status() != WL_CONNECTED) { 
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Connected to WiFi network with IP Address: ");
  Serial.println(WiFi.localIP());
    LCD_I2C_0x27.init();
  LCD_I2C_0x27.backlight();
  LCD_I2C_0x27.clear();
    server.on("/xxx", HTTP_GET, [](AsyncWebServerRequest *request){
    request->send_P(200, "text/plain", String(x).c_str());
  });
  server.on("/yyy", HTTP_GET, [](AsyncWebServerRequest *request){
    request->send_P(200, "text/plain", String(y).c_str());
  });
  server.begin();
}

void loop() {
   x = analogRead(A0);
   y = analogRead(A1);
  unsigned long currentMillis = millis();
  
  if(currentMillis - previousMillis >= interval) {
     // Check WiFi connection status
    if(WiFi.status()== WL_CONNECTED ){ 
      averageCPM = httpGETRequest(serverNameaverage);
      sdCPM = httpGETRequest(serverNamesd);
      CPMArray = httpGETRequest(serverNamearray);
    LCD_I2C_0x27.setCursor(1 - 1, 1 - 1);
    LCD_I2C_0x27.print("Avg:");
    LCD_I2C_0x27.print(averageCPM);
    LCD_I2C_0x27.setCursor(1 - 1, 2 - 1);
    LCD_I2C_0x27.print("Arrayval:");
    LCD_I2C_0x27.print(sdCPM);
    LCD_I2C_0x27.setCursor(10 - 1, 1 - 1);
    LCD_I2C_0x27.print("+/-"); 
    LCD_I2C_0x27.print(CPMArray);
     
      
      // save the last HTTP GET Request
      previousMillis = currentMillis;
    }
    else {
      Serial.println("WiFi Disconnected");
    }
  }
}

String httpGETRequest(const char* serverName) {
  WiFiClient client;
  HTTPClient http;
    
  // Your Domain name with URL path or IP address with path
  http.begin(client, serverName);
  
  // Send HTTP POST request
  int httpResponseCode = http.GET();
  
  String payload = "--"; 
  
  if (httpResponseCode>0) {
    payload = http.getString();
  }

  // Free resources
  http.end();

  return payload;
}
