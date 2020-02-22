var fs = require('fs');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const folder="t20";

const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
  path: folder+'.csv',
  header: [
    {id: 'name', title: 'Name'},  
    {id: '1970', title: '1970'},
    {id: '1971', title: '1971'},
    {id: '1972', title: '1972'},
    {id: '1973', title: '1973'},
    {id: '1974', title: '1970'},
    {id: '1975', title: '1971'},
    {id: '1976', title: '1972'},
    {id: '1977', title: '1973'},
    {id: '1978', title: '1970'},
    {id: '1979', title: '1971'},
    {id: '1980', title: '1972'},
    {id: '1981', title: '1973'},
    {id: '1982', title: '1970'},
    {id: '1983', title: '1971'},
    {id: '1984', title: '1972'},
    {id: '1985', title: '1973'},
    {id: '1986', title: '1970'},
    {id: '1987', title: '1971'},
    {id: '1988', title: '1972'},
    {id: '1989', title: '1973'},
    {id: '1990', title: '1970'},
    {id: '1991', title: '1971'},
    {id: '1992', title: '1972'},
    {id: '1993', title: '1973'},
    {id: '1994', title: '1970'},
    {id: '1995', title: '1971'},
    {id: '1996', title: '1972'},
    {id: '1997', title: '1973'},
    {id: '1998', title: '1970'},
    {id: '1999', title: '1971'},
    {id: '2000', title: '1972'},
    {id: '2001', title: '1973'},
    {id: '2002', title: '1970'},
    {id: '2003', title: '1971'},
    {id: '2004', title: '1972'},
    {id: '2005', title: '1973'},
    {id: '2006', title: '1970'},
    {id: '2007', title: '1971'},
    {id: '2008', title: '1972'},
    {id: '2009', title: '1973'},
    {id: '2010', title: '1970'},
    {id: '2011', title: '1971'},
    {id: '2012', title: '1972'},
    {id: '2013', title: '1973'},
    {id: '2014', title: '1970'},
    {id: '2015', title: '1971'},
    {id: '2016', title: '1972'},
    {id: '2017', title: '1973'},
    {id: '2018', title: '1970'},
    {id: '2019', title: '1971'}
  ]
});

function prepareData(filename){
    return new Promise((resolve, reject)=>{
        fs.readFile('./'+folder+"/"+filename, 'utf8', async function(err, html){
            const data = {};
            data.name=filename.split(".")[0];
            const dom = new JSDOM(html);
            const tables = dom.window.document.getElementsByClassName("engineTable")[3].getElementsByTagName("tbody");
            for(let tbody of tables){
                if(tbody.innerHTML.includes("year")){
                    const yearData = tbody.getElementsByTagName("tr");
                    for (let item of yearData) {
                        const tds = item.getElementsByTagName("td");
                        if(tds.length>1){
                            const year = tds[0].innerHTML.split(" ")[1].split("<")[0];
                            const runs = tds[5].innerHTML;
                            data[year]= runs;
                        }
                    }
                    console.log(data.name, 'added')
                    resolve(data)
                }
            }
        })
    })
}

function generateCSV(htmlFiles){
    const row = [];
    Promise.all(
        htmlFiles.map(async(filename, index)=>{
            prepareData(filename).then(result=>{
                row.push(result);
                if(index===htmlFiles.length-1){
                    csvWriter
                    .writeRecords(row)
                    .then(()=> console.log('csv was written successfully'))
                    .catch(err=>{
                        console.log(err)
                    });
                }
            })
        })
      )
}

let htmlFiles = [];
fs.readdirSync("./"+folder).forEach(file => {
    if(file.includes(".html")){
        htmlFiles.push(file)
    }
  });
  console.log(htmlFiles);
  console.log(htmlFiles.length+" players found in this folder");

  generateCSV(htmlFiles);