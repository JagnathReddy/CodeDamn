let submit=()=>{
    const userAction = async () => {
        const response = await fetch('http://127.0.0.1:8000/', {
          method: 'POST',
          body: JSON.stringify({
            lang:"JAVA",
            code:document.getElementById("exampleFormControlTextarea1").value.replace("\"","#-#")
          }), // string or object
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const myJson = await response.json(); //extract JSON from the http response
        // do something with myJson
        console.log(myJson);
    }
    userAction();
}