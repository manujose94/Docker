const seasons = {
    ERROR_CLIENT: "client-timeout",
    ERROR_HOST: "spring",
    ERROR: "autumn"
  };
  
  
  
  if (!season) {
    throw new Error("Season is not defined");
  }
  
  function getMessageOutput(){
    switch (season) {
        
        case seasons.ERROR_HOST:
            return "Imposible conectar con el destino";
        //Do something for winter
        case seasons.ERROR_CLIENT:
            return "Imposible conectar con el destino";
        //Do something for spring
        case seasons.ERROR:
            return "Imposible conectar con el destino";
        //Do something for autumn
        }
  }