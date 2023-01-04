async function ExtractionDats() {

    // let url = ('https://www.local.ch/en/q/Ticino%20(Canton)/avvocato?rid=HHwo&slot=tel');
    const browser = await puppeteer.launch({headless:false});
    const page = await browser.newPage();
    const maxPaginationNumber = 20
    // await page.waitForTimeout(5000)
    // console.log('click cookies')
    for (let i = 1 ; i < maxPaginationNumber; i++ ) {
        
        let url = (`https://www.local.ch/en/q/Ticino%20(Canton)/avvocato?page=${i}&rid=HHwo&slot=tel%3D3l`);
        // await page.click('#onetrust-accept-btn-handler')


    console.log("abro pagina");
    await page.goto(url);
    console.log(`URL: ${url}`)

    console.count("\n\n\n\n ######paginas  #####")
    const enlaces = await page.evaluate(() => {

        const elements = document.querySelectorAll('.entry-card-info-element.entry-card-info-element-first a')
        const links = [];
        for(let element of elements){
            links.push(element.href)
    }
    return links;
    });

for (let enlace of enlaces){

          await page.goto(enlace);
         console.count("\nProducts")
         console.log(`enlaces: ${enlace}`)
         // console.log("line 15 ")

         await page.waitForTimeout(3000)



         const datos = await page.evaluate(()=>{
          let dats = []

          let title = document.querySelector('[itemprop="name"]').innerText
          title = title ? title = document.querySelector('[itemprop="name"]').innerText :'NO DISPONIBLE'
          let ubi = document.querySelector('.title-card-subtitle')
          ubi = ubi ? ubi = document.querySelector('.title-card-subtitle').innerText :'NO DISPONIBLE'

   dats.push({title,ubi})

   return dats
   })
   console.log(`datos: ${JSON.stringify(datos,null,2) }`)
await page.waitForTimeout('2000')
}
    }
     }

ExtractionDats()
