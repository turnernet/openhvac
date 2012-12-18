// Load the http module to create an http server.
var http = require('http');

// Configure our HTTP server to respond with Hello World to all requests.

var Client = require("owfs").Client;
                

var server = http.createServer(function (request, response) {

  var con = new Client("127.0.0.1","4304");
  var outstandingRequests=0

  response.writeHead(200, {"Content-Type": "text/plain"});      


/*
  outstandingRequests++;

  
  con.read("/uncached/10.A33654020800/temperature",function(result){
            console.log(result);
            response.write("\nBasement Temperature: " + result);                                                
            outstandingRequests--;
            if(outstandingRequests<=0){
              response.end("");
              }
  });
  */
  outstandingRequests++;  
  
  con.read("/uncached/28.7E9A2B040000/temperature",function(result){
            
            text="\nKitchen Temperature: " + result;
            response.write(text);
            console.log(text);
            outstandingRequests--;
            if(outstandingRequests<=0){
              response.end("");
              }
  });
  
  outstandingRequests++; 
  con.read("/uncached/12.574C7D000000/sensed.A",function(result){
            if(result == "1"){
                garageState= "Open";
            }
            else{
                garageState= "Closed"
            }
                                        
            text="\nGarage Door: " + garageState;
            console.log(text);
            response.write(text);
            
            outstandingRequests--;
            if(outstandingRequests<=0){
              response.end("");
             }

   });
  
});

// Listen on port 8000, IP defaults to 127.0.0.1
server.listen(8000);

// Put a friendly message on the terminal
console.log("Server running at http://127.0.0.1:8000/");
