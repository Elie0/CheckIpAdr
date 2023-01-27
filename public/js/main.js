const socket = io()

const $ipForm = document.querySelector('#ip-form')
const $ipFormInput = $ipForm.querySelector('input')
const $ipFormButton = $ipForm.querySelector('button')



const resultsTemplate = document.querySelector('#results-template').innerHTML
const classTemplate = document.querySelector('#Class').innerHTML
const binaryTemplate = document.querySelector('#bin').innerHTML
const $display = document.querySelector('#display')

$ipForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    ip = $ipFormInput.value
    socket.emit('checkip',ip)
    document.querySelector("#display").innerHTML = ''  // this replaces what already exist, so every time I rerun, I delete previous data

})



socket.on('result',(result)=>{
    const html = Mustache.render(resultsTemplate,{
        validation:result
    })
    $display.insertAdjacentHTML('beforeend',html)

})
socket.on('classInfo',(result)=>{
    console.log(result[2])
    const html = Mustache.render(classTemplate,{
        Class:result[0],
        netmask:result[1],
        defaultsubnet:result[2],
    })
    $display.insertAdjacentHTML('beforeend',html)

})
socket.on('toBinary',(result)=>{
    const html = Mustache.render(binaryTemplate,{
        binary:result
    })
    $display.insertAdjacentHTML('beforeend',html)
})



