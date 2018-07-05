using System;
using System.Collections.Generic;
using System.IO.Ports;
using System.Net.Http;
using Newtonsoft.Json;
using RJCP.IO.Ports;

namespace pi_client
{
    class Program
    {
        static void Main(string[] args)
        {
            SerialPortStream arduinoPort = null;
            Console.WriteLine("Hola Proyecto Final IOT");
            Console.WriteLine(Environment.Version.ToString());
            //string[] ports = GetPortNames();
            // We know that ttyACM0 is the port to read from and copied the same read config from node-red arduino config :)
            arduinoPort = new SerialPortStream("/dev/ttyACM0", 9600, 8, Parity.None, StopBits.One);
            arduinoPort.Open();
            if (!arduinoPort.IsOpen)
            {
                Console.WriteLine("Error opening serial port");
                return;
            }
            Console.WriteLine("Port open");
            arduinoPort.Handshake = Handshake.None;
            arduinoPort.ReadTimeout = 10000;
            arduinoPort.NewLine = "\r\n";

            while (!Console.KeyAvailable)
            {
                try
                {
                    string retrievedLine = arduinoPort.ReadLine();
                    
                    var lineParts = retrievedLine.Split(',');

                    var parkingId = lineParts[0];
                    var isUsed = (YesNo) Enum.Parse(typeof(YesNo) , lineParts[1]);

                    var httpClient = new HttpClient();

                    var response = httpClient.GetAsync($"https://us-central1-iot-isil.cloudfunctions.net/startService?parkingId={parkingId}&isUsed={isUsed}")
                        .Result;

                    var result = JsonConvert.DeserializeObject<ServiceResponse>(response.Content.ReadAsStringAsync().Result);

                    Console.WriteLine(retrievedLine);
                }
                catch (Exception ex)
                {
                    Console.WriteLine($" :( Error: {ex.Message}");
                }

            }
        }

        #region Plan Objects

        class ServiceResponse 
        {
            public bool Success { get; set; }
            public string Message  { get; set; }
        }

        enum YesNo {
            Yes = 1,
            No = 0
        }

        #endregion
    }
}
