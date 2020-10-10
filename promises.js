let p = new Promise((resolve, reject) => {
    let a = 45 + 45;
    if (a === 90){
        resolve("Success");
    } else {
        reject("failed");
    }
})