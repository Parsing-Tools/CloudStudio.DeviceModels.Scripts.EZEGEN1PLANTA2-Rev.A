function parseUplink(device, payload)
{
    // Obtener payload como JSON
    const jsonPayload = payload.asJsonObject();
    Object.keys(jsonPayload).forEach(function(key){
        env.log(key,jsonPayload[key])
    })

    // No se puede deserializar el payload como json, salir.
    if (!jsonPayload) { return; }

    // Procesar JSON de EZE GEN1 (hasta 200 registros por sensor por call)
    
    if (jsonPayload.data !== null) {
        var camaraB = device.endpoints.byAddress(1);
        var envasado = device.endpoints.byAddress(2);
        var puertaC = device.endpoints.byAddress(3);
        var terminados = device.endpoints.byAddress(4);
        var puertaB = device.endpoints.byAddress(5);
        var puertaCext = device.endpoints.byAddress(6);
        var camaraC = device.endpoints.byAddress(12);
        var produccion = device.endpoints.byAddress(7);
        var producDiaria = device.endpoints.byAddress(8);
        


        
        // Sentencia para Payload de Camara de  frio B Input 1
        if (jsonPayload.inp == "Camara de Frio B")
        {
            const data = jsonPayload.data;
            var ultimo = "";
                for (let i = 0; i < data.length; i++) {
                    const item = data[i];
                    env.log("FECHA --> ",item.time);
                    env.log("TEMP --> ",item.val);
                    camaraB.updateTemperatureSensorStatus(item.val,item.time);
                    // DDM: agrego este "if" por si los datos vinieran desordenados
                    if (item.time > ultimo)
                    ultimo = item.time;
                    }
                env.log("Ultimo --> ", ultimo);

        // Resultado del método HTTP. Devolvemos un json con un campo "result", que
        // contiene el "time" más alto recibido, como se indica en la documentación.
        var httpResponse = new HttpResponse();
        httpResponse.statusCode = 200;
        httpResponse.contentType = "application/json";
        httpResponse.content.setAsJson({ result: ultimo });
        return httpResponse;
        }




        // Sentencia para Payload de Sala de Envasado A input 2
        if (jsonPayload.inp == "Sala de Envasado")
        {
            const data = jsonPayload.data;
            var ultimo = "";
                for (let i = 0; i < data.length; i++) {
                    const item = data[i];
                    env.log("FECHA --> ",item.time);
                    env.log("TEMP --> ",item.val);
                    envasado.updateTemperatureSensorStatus(item.val,item.time);
                    // DDM: agrego este "if" por si los datos vinieran desordenados
                    if (item.time > ultimo)
                    ultimo = item.time;
                    }
                env.log("Ultimo --> ", ultimo);

        // Resultado del método HTTP. Devolvemos un json con un campo "result", que
        // contiene el "time" más alto recibido, como se indica en la documentación.
        var httpResponse = new HttpResponse();
        httpResponse.statusCode = 200;
        httpResponse.contentType = "application/json";
        httpResponse.content.setAsJson({ result: ultimo });
        return httpResponse;
        }



        // Sentencia para Payload Puerta cámara de frio C input 3
        /*
        20:CERRADA -----> 1
        100:ABIERTA ----> 2      
        */

        if (jsonPayload.inp == "Puerta Camara de Frio C int")
        {
            const data = jsonPayload.data;
            var ultimo = "";
                for (let i = 0; i < data.length; i++) {
                    const item = data[i];
                    env.log("FECHA --> ",item.time);
                    env.log("Puerta --> ",item.val);

                    if(item.val == 20)
                    puertaC.updateIASSensorStatus(1,item.time);
                    if(item.val > 20 && item.val <=100 )
                    puertaC.updateIASSensorStatus(2,item.time);
                    if(item.val < 20 || item.val >100 )
                    puertaC.updateIASSensorStatus(7,item.time);

                    // DDM: agrego este "if" por si los datos vinieran desordenados
                    if (item.time > ultimo)
                    ultimo = item.time;
                    }
                env.log("Ultimo --> ", ultimo);

        // Resultado del método HTTP. Devolvemos un json con un campo "result", que
        // contiene el "time" más alto recibido, como se indica en la documentación.
        var httpResponse = new HttpResponse();
        httpResponse.statusCode = 200;
        httpResponse.contentType = "application/json";
        httpResponse.content.setAsJson({ result: ultimo });
        return httpResponse;
        }

        

        // Sentencia para Payload de Sala Productos Terminados input 4
        if (jsonPayload.inp == "Sala Productos Terminados")
        {
            const data = jsonPayload.data;
            var ultimo = "";
                for (let i = 0; i < data.length; i++) {
                    const item = data[i];
                    env.log("FECHA --> ",item.time);
                    env.log("TEMP --> ",item.val);
                    terminados.updateTemperatureSensorStatus(item.val,item.time);
                    // DDM: agrego este "if" por si los datos vinieran desordenados
                    if (item.time > ultimo)
                    ultimo = item.time;
                    }
                env.log("Ultimo --> ", ultimo);

        // Resultado del método HTTP. Devolvemos un json con un campo "result", que
        // contiene el "time" más alto recibido, como se indica en la documentación.
        var httpResponse = new HttpResponse();
        httpResponse.statusCode = 200;
        httpResponse.contentType = "application/json";
        httpResponse.content.setAsJson({ result: ultimo });
        return httpResponse;
        }



        // Sentencia para Payload Puerta Camara de Frio B input 5
        /*
        4:CERRADA -----> 1
        5:ABIERTA ----> 2      
        */

        if (jsonPayload.inp == "Puerta Camara de Frio B")
        {
            const data = jsonPayload.data;
            var ultimo = "";
                for (let i = 0; i < data.length; i++) {
                    const item = data[i];
                    env.log("FECHA --> ",item.time);
                    env.log("Puerta --> ",item.val);

                    if(item.val == 4)
                    puertaB.updateIASSensorStatus(1,item.time);
                    if(item.val > 4 && item.val <=5 )
                    puertaB.updateIASSensorStatus(2,item.time);
                    if(item.val < 4 || item.val >5 )
                    puertaB.updateIASSensorStatus(7,item.time);

                    // DDM: agrego este "if" por si los datos vinieran desordenados
                    if (item.time > ultimo)
                    ultimo = item.time;
                    }
                env.log("Ultimo --> ", ultimo);

        // Resultado del método HTTP. Devolvemos un json con un campo "result", que
        // contiene el "time" más alto recibido, como se indica en la documentación.
        var httpResponse = new HttpResponse();
        httpResponse.statusCode = 200;
        httpResponse.contentType = "application/json";
        httpResponse.content.setAsJson({ result: ultimo });
        return httpResponse;
        }

        


        // Sentencia para Payload Puerta cámara de frío C exterior input 6
        /*
        6:  AMBAS CERRADAS -----> 1
        7:  EXTERIOR ABIERTA ---> 2
        */

        if (jsonPayload.inp == "Puerta Camara de Frio C ext")
        {
            const data = jsonPayload.data;
            var ultimo = "";
                for (let i = 0; i < data.length; i++) {
                    const item = data[i];
                    env.log("FECHA --> ",item.time);
                    env.log("Puerta --> ",item.val);

                    if(item.val == 1)
                    puertaCext.updateIASSensorStatus(1,item.time);
                    if(item.val > 1 && item.val <=2 )
                    puertaCext.updateIASSensorStatus(2,item.time);
                    if(item.val < 1 || item.val >2 )
                    puertaCext.updateIASSensorStatus(7,item.time);

                    // DDM: agrego este "if" por si los datos vinieran desordenados
                    if (item.time > ultimo)
                    ultimo = item.time;
                    }
                env.log("Ultimo --> ", ultimo);

        // Resultado del método HTTP. Devolvemos un json con un campo "result", que
        // contiene el "time" más alto recibido, como se indica en la documentación.
        var httpResponse = new HttpResponse();
        httpResponse.statusCode = 200;
        httpResponse.contentType = "application/json";
        httpResponse.content.setAsJson({ result: ultimo });
        return httpResponse;
        }


        // Sentencia para Payload de Camara de  frio C Input 12
        if (jsonPayload.inp == "Camara de Frio C")
        {
            const data = jsonPayload.data;
            var ultimo = "";
                for (let i = 0; i < data.length; i++) {
                    const item = data[i];
                    env.log("FECHA --> ",item.time);
                    env.log("TEMP --> ",item.val);
                    camaraC.updateTemperatureSensorStatus(item.val,item.time);
                    // DDM: agrego este "if" por si los datos vinieran desordenados
                    if (item.time > ultimo)
                    ultimo = item.time;
                    }
                env.log("Ultimo --> ", ultimo);

        // Resultado del método HTTP. Devolvemos un json con un campo "result", que
        // contiene el "time" más alto recibido, como se indica en la documentación.
        var httpResponse = new HttpResponse();
        httpResponse.statusCode = 200;
        httpResponse.contentType = "application/json";
        httpResponse.content.setAsJson({ result: ultimo });
        return httpResponse;
        }




        // Sentencia para Payload Sensor de produccion Input 7
        if (jsonPayload.inp == "RAW Sensor produccion dia")
        {
            const data = jsonPayload.data;
            var ultimo = "";
                for (let i = 0; i < data.length; i++) {
                    const item = data[i];
                    env.log("FECHA --> ",item.time);
                    env.log("POTES --> ",item.val);
                    produccion.updateGenericSensorStatus(item.val,item.time);
                    // DDM: agrego este "if" por si los datos vinieran desordenados
                    if (item.time > ultimo)
                    ultimo = item.time;
                    }
                env.log("Ultimo --> ", ultimo);

        // Resultado del método HTTP. Devolvemos un json con un campo "result", que
        // contiene el "time" más alto recibido, como se indica en la documentación.
        var httpResponse = new HttpResponse();
        httpResponse.statusCode = 200;
        httpResponse.contentType = "application/json";
        httpResponse.content.setAsJson({ result: ultimo });
        return httpResponse;
        }


           


    }
    if (jsonPayload.pid != undefined && jsonPayload.pid != null) {
        var pid2 = jsonPayload.pid;
        if (pid2 == "SALA ENVASADO"){
            env.log("pid OK --> ",pid2);
        }
        else{
            env.log("pid FALSE --> ",pid2);
        }


    }



    // Importante: si el script llega a este punto es que no se pudo parsear el json.
    // Como no estamos devolviendo nada, el motor de scripting devolverá el valor por
    // defecto, que consiste en:
    // - Status code 200
    // - Content type "text/plain"
    // - Body vacío (sin contenido)
}