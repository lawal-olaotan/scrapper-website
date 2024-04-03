document.addEventListener('DOMContentLoaded', function(){


    const formElement = document.querySelector('#scrappeForm')
    const name = document.querySelector('#name')
    const isSubscription = document.querySelector("#type")

    formElement.addEventListener('submit', async(event)=> {

        event.preventDefault()
        let urlName = name.value
        const webpage =  await getPageContent(urlName)
        const data = JSON.stringify({webpage, name:name.value,isSubscription:isSubscription.value})
      
        const backendURI = "https://test.joineconome.com/" 
        const response = await fetch(backendURI+'save',{
            method: 'POST',
            body:data,  
            headers:{"Content-Type": "application/json" },
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
        name.value = ''
    }


})