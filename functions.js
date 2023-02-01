
const dec2bin =(dec)=>{            // I additionaly added this fct in order to convert the input ip adress to binary form. This fct
                               // will be calledd in getBinary fct later

    let ans = (dec >>> 0).toString(2);
    while(ans.length < 8) {
        ans = "0" + ans
    }

    return ans
}


const checkIpAdress = (ip) =>{        // mainly this is the core fct of the code

const separated = ip.split('.') // here, I get the ip written like 192.168.0.1 and split it by the . it returns an array [192,168,0,1]

if(separated.length !==4) // if length is not 4, then the ip is of course not valid like for example we can't have 192.168 
{
    return ('ip Adress is not valid!')
}

for(let i=0;i<separated.length;i++) { // here I loop and access all the parts in the array[192,68,0,1]

    if( !(Number.isInteger(Number(separated[i]))===true))  // this is used to ensure that no string is written like 19a.b25
        {
           return('The input should only be integer')
        }
    if(separated[i].length>1 && separated[i][0]===0) // this is used to ensure that we cannot start like 091.292.04.3
        {
            return('cannot start numbers with leading 0')
        }
    if(!(separated[i]>=0 && separated[i]<=255))  // this to ensure that the max range resides between 0-255
    {
        return('ip adress is outside of range!!')
    }
}

return true

}

const getClass = (ip)=>{   // this fct is used to determine the ip class
    const classIndicator = ip.split('.')  // same as before
    if(classIndicator[0] >=192 && classIndicator[0] <=223)   // class C
    {
         const send = 'Class C'
         const networkMask = classIndicator[0]+'.'+classIndicator[1]+'.'+classIndicator[2]+'.0'
         return [send,`Network Mask: ${networkMask}`,'Default Subnet: 255.255.255.0']  // this array is being used to display data as I want on the frontend        
         
    }
    else if(classIndicator[0] >=128 && classIndicator[0] <=191)  // same logic 
    {
        const send = 'Class B'
         const networkMask = classIndicator[0]+'.'+classIndicator[1]+'.0'+'.0'
         return [send,`Network Mask: ${networkMask}`,'Default Subnet: 255.255.0.0']   
    }
    else
    {
        const send = 'Class A'    // same logic
        const networkMask = classIndicator[0]+'.0'+'.0'+'.0'
        return [send,`Network Mask: ${networkMask}`,'Default Subnet: 255.0.0.0'] 
    }
   
}

const getBinary =(ip)=>{            // finally this fct transforms the ip inpput into binary
    const IP = ip.split('.') // getting the Ip array
    let binIp =''
    let count=0
    IP.forEach(element => {
        count++
        const bin =dec2bin(Number(element)) // I used my fct defined before
        if(count===4)
        {
            binIp= binIp.concat(bin) 
        }
        else
        binIp= binIp.concat(bin).concat('.') // while count is not 4, I concatenate the '.'
    });
     return ('BinaryForm:'+binIp)
}


module.exports = {
    checkIpAdress,
    getClass,
    getBinary,
}