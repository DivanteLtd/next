const fs = require('fs')
const path = require('path')

const extractedSlots = {}

function extractSlot (slot) {
  fs.readFile(path.join(__dirname, '../../commercetools/api-client.md'), 'utf8', (err, data) => {
    const start = "<!-- @partial-" + slot + " -->"
    const end = "<!-- @partial-" + slot + "-end -->"
    extractedSlots[slot] = data.substring(
      data.lastIndexOf(start) + start.length + 2, 
      data.lastIndexOf(end)
    );
    console.log(extractedSlots)
  });
}

async function getSlots() {
  fs.readFile(path.join(__dirname, '../../commercetools/api-client.md'), 'utf8', (err, data) => {
    let slots =  data.match(/@partial-(.*)-end -->/g).map(el => el.replace('@partial-', '').replace('-end -->',''));
    
    console.log(slots)
    extractSlot(slots[1])
    console.log(extractedSlots)
  });
}



getSlots()