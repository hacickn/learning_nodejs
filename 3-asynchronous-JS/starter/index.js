const fs = require('fs');
const superagent = require('superagent');
const readFilePro = file => {
    return new Promise((resolve,reject) => {
        fs.readFile(file,(err,data)=>{
            if(err) reject('I could not find that file')
            resolve(data);
        })
    })
}

const writeFilePro = (file,data) =>{
    return new Promise((resolve,reject)=>{
        fs.writeFile(file,data,err=>{
            if(err) reject("Could not write");
            resolve('success')
        })
    })
}

fs.readFile(`${__dirname}/dog.txt`, (err,data) => {
    console.log(`Breed ${data}`)
    superagent.get(`https://dog.ceo/api/breed/${data}/images/random`).then( result =>{
        console.log(result.body.message);
        fs.writeFile('dog-img.txt', result.body.message, err=>{
            if(err) return console.log(err.message);
            console.log('random dog')
        
        })
    }).catch(err => {if(err) return console.log(err.message);
    });
    /*
    end((err,res)=>{
        if(err) return console.log(err.message);
        console.log(res.body.message);
        fs.writeFile('dog-img.txt', res.body.message, err=>{
            console.log('random dog')
        })
    });
    */
});

const getDocPic = async()=>{
    try{
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`Breed ${data} 2`)
    const res1Pro =  superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
    const res2Pro =  superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
    const res3Pro =  superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);

    const all = await Promise.all([res1Pro,res2Pro,res3Pro]);
    const imgs = all.map(el => el.body.message)
    console.log(imgs);
    console.log(all[0].body.message)

    await writeFilePro('dog-img.txt', imgs.join('\n'));
    console.log('write pro worked')
    } catch(error){
        console.log(console.error())
        throw error;
    }
    return 'asdasd'
}
//promise version
/*
getDocPic()
.then(x=>console.log(x))
.catch(err=>{console.log('errorrr')});
*/

//async version
(async()=>{
    try {
      const x = await getDocPic();
      console.log(x)
    } catch (error) {
        console.log('errorrr')
    }
})();

/*
readFilePro(`${__dirname}/dog.txt`)
    .then(data=>{
    console.log(`Breed ${data} 2`)
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
    })
    .then( result =>{
        console.log(result.body.message + 2);
        return writeFilePro('dog-img.txt', result.body.message)
    })
    .then((val)=>{
            console.log('write pro worked' + val)
    })
    .catch(err => {
        if(err) return console.log(err.message)
    });
        /*
        fs.writeFile('dog-img.txt', result.body.message, err=>{
            if(err) return console.log(err.message);
            console.log('random dog')
            
        })
        */
