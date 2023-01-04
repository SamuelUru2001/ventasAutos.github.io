const puppeteer = require('puppeteer')
const fs = require('fs-extra')
const writeStream=  fs.createWriteStream('Tabla.csv')

async function ExtracData() {
   try {
       const URL = "https://www.sec.gov/forms"
       const browser = await puppeteer.launch({headless: true})
       const page = await browser.newPage()

       await page.goto(URL)

        let newResults = await page.evaluate(() => {
            let results = []

            let items = document.querySelectorAll(".odd, .even")
            items.forEach((item) => {
                const data = {};

                   results.push({
                       Number : item.querySelector('.release-number-content').innerText,
                       descripcion: item.querySelector('.display-title-content').innerText.replace(/\n/g,''),
                       fechas: item.querySelector('.views-field-field-date').innerText.replace(/. /g,'-'),
                       SEC: item.querySelector(".list-page-detail-content").innerText.replace(/SEC/g,""),
                       url : item.querySelector(".odd a, .even a").href,
                       Topic: item.querySelector('.views-field-term-node-tid').innerText
                })

            })
            return results
        })
        let data = [];
           data = data.concat(newResults)
        newResults.map(element => {
            console.log(element)
        })

console.log('\n\n\n EXTRACCION DE LA TABLA COMPLETAA!! \n\n\n')

       await browser.close()
   } catch (error) {
       console.error(error)
   }
}

ExtracData()
