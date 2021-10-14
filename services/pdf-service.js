const PDFDocument = require("pdfkit")

const buildPDF = (dataCallback, endCallback, data) => {
  const today = new Date()
  console.log(data)
  const doc = new PDFDocument()
  doc.on("data", dataCallback)
  doc.on("end", endCallback)
  
  // pdf header
  doc.fontSize(10).text(`Date: ${today.getFullYear()}/${today.getMonth()}/${today.getDate()}`, {
    align: 'right'
  })
  doc.image('./config/assets/ludotech_rubik.png', {
    fit: [200,60],
    align: 'left',
    valign: 'center'
  })

  // doc.fontSize(28).text(`Ludotech`, {
  //   align: 'left',
  //   lineBreak: true,
  // })
  doc.fillColor('lightgray').fontSize(17).text('_________________________________________________', { lineBreak: true })
  // doc.save().lineTo(100,300)
  // pdf body
  
  doc.fillColor('black').fontSize(25).text(`Purchase Summary`, 50, 175), {
    align: 'left'
  }
  // // va una linea aca
  doc.fillColor('lightgray').fontSize(17).text('_________________________________________________', { lineBreak: true })
  data.articles.map(article => {
    doc.fillColor('black').fontSize(15).text(`${article.name}  x ${article.quantity}U`, { align: 'justify' })
    doc.fillColor('black').fontSize(15).text(`${article.hasDiscount ? `$ ${article.price}` : ''} $ ${article.hasDiscount ? article.discountPrice : article.price}`, { align: 'right' })  
 
  })
  // va una linea delgada
  doc.fillColor('lightgray').fontSize(17).text('_________________________________________________', { lineBreak: true })
  doc.fillColor('black').fontSize(15).text(`Total: $ ${data.total}`, {
    align: 'right'
  })
  // va una linea 
  doc.fillColor('lightgray').fontSize(17).text('_________________________________________________', { lineBreak: true })
  doc.fillColor('black').fontSize(25).text(`Send to:`, { 
    align: 'left'
  })
  doc.fontSize(12).text(`Address: ${data.direction.street} ${data.direction.number} ${data.direction.department}`, { 
    align: 'left'
  })
  doc.fontSize(12).text(`City: ${data.direction.city}  State: ${data.direction.state} Zip code: ${data.direction.zipCode}`, { 
    align: 'left'
  })
  doc.fontSize(12).text(`Reciver: ${data.direction.receiver}`, { 
    align: 'left'
  })
  // va una linea 
  doc.fillColor('lightgray').fontSize(17).text('_________________________________________________', { lineBreak: true })
  doc.fillColor('black').fontSize(15).text(`Status: ${data.status}`, { 
    align: 'left'
  })
  // va una linea
  doc.fillColor('lightgray').fontSize(17).text('_________________________________________________', { lineBreak: true })
  doc.fillColor('black').fontSize(12).text(`Selected payment method: ${data.paymentDetails.method}`, { 
    align: 'left'
  })
  // va codigo de barras
  doc.fontSize(12).text(`${data._id}`, { 
    align: 'left'
  })







  doc.end()
}

module.exports = { buildPDF }
