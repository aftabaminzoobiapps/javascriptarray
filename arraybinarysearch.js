const compareandmarge  = async (arr1, arr2) => {
           
            var bar = new Promise((resolve, reject) => {
                let finalarray2 = [];
                arr1.forEach( async element => {
                if(element.mobile_number.charAt(0) == "+"){
                    try{
                        let rawnumber = phoneUtil.parseAndKeepRawInput(element.mobile_number);
                        let num = phoneUtil.format(rawnumber, PNF.NATIONAL).replace(" ","").replace(/-|\s/g,"").substring(1);
                        let data = await binarySearch(arr2, num, 0 , arr2.length-1);
                       
                        finalarray2.push(Object.assign({},element, data))
                    }catch(err){
                        console.log(err,"error 1")
                    }
                }else{
                    try{
                        let number = phoneUtil.parseAndKeepRawInput(element.mobile_number, usermobiledata.code);
                        if(phoneUtil.isValidNumberForRegion(number, usermobiledata.code)){
                            let localnum = phoneUtil.format(number, PNF.NATIONAL).replace(" ","").replace(/-|\s/g,"").substring(1);
                            let data = await binarySearch(arr2, localnum, 0 , arr2.length-1);
                           
                            finalarray2.push(Object.assign({},element, data))
                        }
                    }catch(err){
                        console.log(err,"error")
                    } 
                } 
            })
            resolve(finalarray2);
            })
        bar.then((data) => {
            console.log("all Done", data)
          
        })
        }


      const binarySearch = async (d, t, s, e) => {
          
            const m = Math.floor((s + e)/2);
            if (t == d[m].mobile_number) return d[m];
            if (e - 1 === s) return(d[s].mobile_number - t) >(d[e].mobile_number - t) ? d[e] : d[s]; 
            if (t > d[m].mobile_number) return binarySearch(d,t,m,e);
            if (t < d[m].mobile_number) return binarySearch(d,t,s,m);
        }
