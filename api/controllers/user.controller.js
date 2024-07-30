const test = async (req,res)=>{
    try {
        res.send("again its working !!!")
    } catch (error) {
       console.error(error); 
    }
}


export {
    test,

}