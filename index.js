document.addEventListener('DOMContentLoaded', function(){


    const formElement = document.querySelector('#scrappeForm')
    const url = document.querySelector('#url')
    const name = document.querySelector("#name")

    formElement.addEventListener('submit', async(event)=> {
        event.preventDefault()
        const webpage =  await getPageContent(url.value)
        const data = JSON.stringify({webpage, name:name.value})
        const backendURI = "https://test.joineconome.com:8080/"
        const response = await fetch(backendURI+'save',{
            method: 'POST',
            body:data,  
            headers:{"Content-Type": "application/json" }
        })
        
        if(response.ok) return clearInput('success')

        if(!response.ok){
            return clearInput('already exist')
        } 
        
    })


    const getPageContent = async(url)=> {
            const response = await fetch(url)
            if(!response.ok) return 'unable to fetch';
            const textContent = await response.text(); 
            return textContent
    }

    const clearInput = (message) => {
        alert(message)
        url.value = ''
        name.value = ''
    }


})