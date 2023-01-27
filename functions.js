
const dec2bin =(dec)=>{

    let ans = (dec >>> 0).toString(2);
    while(ans.length < 8) {
        ans = "0" + ans
    }

    return ans
}


const checkIpAdress = (ip) =>{

const separated = ip.split('.')

if(separated.length !==4)
{
    return ('ip Adress is not valid!')
}

for(let i=0;i<separated.length;i++) {

    if( !(Number.isInteger(Number(separated[i]))===true))
        {
           return('The input should only be integer')
        }
    if(separated[i].length>1 && separated[i][0]===0)
        {
            return('cannot start numbers with leading 0')
        }
    if(!(separated[i]>=0 && separated[i]<=255))
    {
        return('ip adress is outside of range!!')
    }
}

return true

}

const getClass = (ip)=>{
    const classIndicator = ip.split('.')
    if(classIndicator[0] >=192 && classIndicator[0] <=223)
    {
         const send = 'Class C'
         const networkMask = classIndicator[0]+'.'+classIndicator[1]+'.'+classIndicator[2]+'.0'
         return [send,`Network Mask: ${networkMask}`,'Default Subnet: 255.255.255.0']          
         
    }
    else if(classIndicator[0] >=128 && classIndicator[0] <=191)
    {
        const send = 'Class B'
         const networkMask = classIndicator[0]+'.'+classIndicator[1]+'.0'+'.0'
         return [send,`Network Mask: ${networkMask}`,'Default Subnet: 255.255.0.0']   
    }
    else
    {
        const send = 'Class A'
        const networkMask = classIndicator[0]+'.0'+'.0'+'.0'
        return [send,`Network Mask: ${networkMask}`,'Default Subnet: 255.255.0.0'] 
    }
   
}

const getBinary =(ip)=>{
    const IP = ip.split('.')
    let binIp =''
    let count=0
    IP.forEach(element => {
        count++
        const bin =dec2bin(Number(element))
        if(count===4)
        {
            binIp= binIp.concat(bin)
        }
        else
        binIp= binIp.concat(bin).concat('.')
    });
     return ('BinaryForm:')+binIp
}

const getMask = (ip) =>{
    if (checkIpAdress(ip))
    {
        const IP = ip.split('.')
        const binary = getBinary(IP)
        const Class = getClass(ip)
        console.log(binary)
    }
   
}


module.exports = {
    checkIpAdress,
    getClass,
    getBinary,
    getMask,
}