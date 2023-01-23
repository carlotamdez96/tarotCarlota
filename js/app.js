

var model = {
    respuesta: "",
    respuestaAlternativa: false,
    needsReset: false,
    textoPeticion: "Carlota por favor responde esta pregunta importante"

};

var controlador = {

    init: () => {
        ver.init();
    },

    keyDown: (e) => {
        let len = ver.getPeticionLenght();
        if(e.key === "."){ //Donde comenzara la respuesta secreta
            model.respuestaAlternativa = !model.respuestaAlternativa;
            document.getElementById("peticion").value += model.textoPeticion[len];
            return false;
        }else if(e.key.length === 1 && model.respuestaAlternativa){
            model.respuesta += e.key;
            document.getElementById("peticion").value += model.textoPeticion[len];
            console.log(model.respuesta);
            return false;
        }else if(e.key === "Backspace" && model.respuestaAlternativa){
            model.respuesta = model.respuesta.slice(0,-1);
        }
    },

    getResetStatus : () => {
        return model.needsReset;
    },
    // getPeticionChar: () => {
    //     return model.textoPeticion[ver.getPeticionLenght()-1];
    // },
    getAnswer: () => {
        const respuestaInvalida = [
            "No es manera de preguntar a Carlota",
            "Estas malgastando toda mi sabiduria con tus preguntas tontas",
            "Mucha pereza me das",
            "Petición invalida, prueba otra vez",
            "No estas preguntando correctamente",
            "¿Por qué deberia contestar a eso?",
            "Por favor prueba de nuevo mañana, o nunca..",
            "Estoy cansada, prueba luego",
            "Ahora no, estoy ocupada, a lo mejor despues",
            "Piensa lo que dices por favor",
        ];
        const preguntaInvalida="Por favor haz a Carlota una pregunta valida";
        model.needsReset=true;
        
        if(!ver.getQuestion()){ //pregunta invalida
            return preguntaInvalida;
        }else if(model.respuesta){ //Pregunta valida, da respuesta
            return "Carlota dice:  "+model.respuesta;
        }else { // Respuesta invalida
            let randomNum = Math.floor(Math.random()*respuestaInvalida.length);
            return respuestaInvalida[randomNum];
        }
    },

    reset: () => {
        model.respuesta = "";
        model.respuestaAlternativa = false;
        model.needsReset = false;
        ver.resetUi();
    }


};

var ver = {
    init: () => {
        document.querySelector(".parrafoPregunta__boton").addEventListener("click", function(){
            ver.renderAnswer();
        });

        document.querySelector(".cuerpo__botonReset").addEventListener("click", _ => {
            location.reload();
});
      
        document.getElementById("peticion").onkeydown = (event) => {
            if(document.getElementById("peticion").value == ""){
                controlador.reset;
            }
            return controlador.keyDown(event)
        };
        document.getElementById("pregunta").addEventListener("keydown",function(event){
            switch(event.key){
                case "?":
                    ver.renderAnswer();
                break;
                case "Enter":
                    if(!document.getElementById("pregunta").value.includes("?")){
                        document.getElementById("pregunta").value+="?";
                    }
                    ver.renderAnswer();
                    break;
            }
        });
        document.getElementById("peticion").onfocus = () =>{
            if(controlador.getResetStatus()){
                controlador.reset();
            }
        };
    },

    getInputText: () => {
        return document.getElementById("peticion").value;
    },
    getPeticionLenght: () => {
        return document.getElementById("peticion").value.length;
    },
    getQuestion: () => {
        return document.getElementById("pregunta").value;
    },
    renderAnswer: () => {
        document.querySelector(".encabezado__parrafo").innerHTML=controlador.getAnswer();
        ver.disableQuestion();
        ver.limpiarPeticion;
    },
    verRespuesta: () => {
        document.querySelector(".encabezado__parrafo").getElementsByClassName.display="block"
    },
    respuestaHide : () => {
        document.querySelector(".encabezado__parrafo").style.display= "none";
    },
    resetUi: () => {
        ver.limpiarPeticion();
        ver.limpiarPregunta();
        ver.limpiarRespuesta();
        ver.enableQuestion();
        ver.respuestaHide();
    },

    limpiarPeticion: () => {
        document.getElementById("peticion").value="";
    },
    limpiarPregunta: () => {
        document.getElementById("pregunta").value="";
    },
    limpiarRespuesta: () => {
        document.querySelector(".encabezado__parrafo").disabled = true;
    },
    disableQuestion: () => {
        document.getElementById("pregunta").disabled = true;
    },
    enableQuestion: () => {
        document.getElementById("pregunta").disabled = false;
    }


}
controlador.init();