import puppeteer from 'puppeteer'
import { writeFile } from 'fs';

const printPdfServices = async () => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    await page.goto('http://localhost:3500/api/printHtml', {
        waitUntil: 'networkidle0'
    })

    const pdf = await page.pdf({
        printBackground: true,
        format: 'Letter'
    })

    await browser.close()

    let path = "./report/report.pdf"
    writeFile(path, pdf, {}, (err) => {
        if (err) {
            return console.error('error')
        }
        console.log('success!')
    })

}

export {
    printPdfServices
}