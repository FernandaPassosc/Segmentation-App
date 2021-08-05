
// let canvas = document.getElementById("canvas");
// canvas.width = window.innerWidth - 60;
// canvas.height = window.innerHeight * 0.6;
// let context = canvas.getContext("2d");
// context.fillStyle = "white";
// context.fillRect(0, 0, canvas.width, canvas.height);


// const alertBox = document.getElementById('alert-box')
// const imgBox = document.getElementById('img-box')
// const form = document.getElementById('p-form')



// const image = document.getElementById('id_image')

// var img = document.createElement("img");
// img.src = "media/dog-static.jpg";

// var src = document.getElementById("x");

// imgBox.innerHTML = `<img src="media/dog-static.jpg" width ="500" height="500">`
// src.innerHTML = `<img src="media/dog-static.jpg" width ="500" height="500">`

// const btnBox = document.getElementById('btn-box')
// const btns = [...btnBox.children]

// console.log(btnBox.children)
// const url = ""

// const csrf = document.getElementsByName('csrfmiddlewaretoken') 
// console.log(csrf)


// const handleAlerts = (type, text) =>{
//   alertBox.innerHTML = `<div class="alert alert-${type}" role="alert">
//                           ${text}
//                       </div>`
// }


// image.addEventListener('change', ()=>{
//     const img_data = image.files[0]
//     const url = URL.createObjectURL(img_data)
//     console.log(url)

//     imgBox.innerHTML = `<img src="${url}" width ="500" height="500">`
//     src.innerHTML = `<img src="${url}" width ="500" height="500">`

// })

// let filter = null

// btns.forEach(btn=>btn.addEventListener('click', ()=>{
//   filter = btn.getAttribute('data-filter')
//   console.log(filter)

// }))

// // saving the image
// let id = null

// form.addEventListener('submit', e=>{

//   e.preventDefault() // para não atualizar a página

//     const fd = new FormData()
//     //const fd2 = new FormData()
//     fd.append('csrfmiddlewaretoken', csrf[0].value)
//     fd.append('image', image.files[0])
//     fd.append('action', filter)
//     fd.append('id', id)

//     $.ajax({
//         type: 'POST',

//         url: url,
//         enctype: 'multipart/form-data',
//         data: fd, 

//         success: function(response){
//             const data = JSON.parse(response.data)
//             console.log(data)
//             console.log("taaa")
//         },

//         cache: false,
//         contentType: false,
//         processData: false,
//    });
// })
// console.log(form)



let img = document.getElementById('inp');
let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

let canvas2 = document.getElementById("canvas2");
let context2 = canvas2.getContext("2d");


canvas.width = 700;
canvas.height = 600;
canvas.offsetLeft = -15;

canvas2.width = canvas.width;
canvas2.height = canvas.height;



context.fillStyle = "white";
context.fillRect(0, 0, canvas.width, canvas.height);
let restore_array = [];
let start_index = -1;
let stroke_color = 'green';
let stroke_width = "20";
let is_drawing = false;


canvas.addEventListener("touchstart", start, false);
canvas.addEventListener("touchmove", draw, false);
canvas.addEventListener("touchend", stop, false);
canvas.addEventListener("mousedown", start, false);
canvas.addEventListener("mousemove", draw, false);
canvas.addEventListener("mouseup", stop, false);
canvas.addEventListener("mouseout", stop, false);


var base_image = new Image();
make_base();


function make_base(){
  base_image.src = 'media/dog-static.jpg';

  base_image.onload = function(){
    context.drawImage(base_image, 0, 0);
    context2.drawImage(base_image, 0, 0);
  }
}

document.getElementById('inp').onchange = function inp (e) {
  console.log("imagem", e);
  

  base_image.src = URL.createObjectURL(this.files[0]);
  console.log(base_image);
  console.log(base_image.width);
  console.log(base_image);


  base_image.onload = function(){
    var width = base_image.width;
    var height = base_image.height;
    context.drawImage(base_image, 0, 0, width, height, 0, 0, 700, 600 );
    context2.drawImage(base_image, 0, 0, width, height, 0, 0, 700, 600 );
  }
  
}



// document.getElementById('inp').onchange = function inp (e) {
//   console.log("imagem", e);

//   base_image.src = URL.createObjectURL(this.files[0]);
  
//   canvas = resize2Canvas(base_image, 700, 600);
//   var data = resize(canvas, 700, 600, 'png');

//   var new_img = new Image();
//   new_img.src = data;

//   context.drawImage(new_img, 0, 0);
 
  
// }


function change_color(element) {
  stroke_color = element.style.background;
}

function change_width(element) {
  stroke_width = element.innerHTML
}

function start(event) {
  is_drawing = true;
  context.beginPath();
  context.moveTo(getX(event), getY(event));

  context2.beginPath();
  context2.moveTo(getX(event), getY(event));
  event.preventDefault();
}


function draw(event) {
  if (is_drawing) {
    context.lineTo(getX(event), getY(event));
    context.strokeStyle = stroke_color;
    context.lineWidth = stroke_width;
    context.lineCap = "round";
    context.lineJoin = "round";
    context.stroke();

  
    context2.lineTo(getX(event), getY(event));
    context2.strokeStyle = stroke_color;
    context2.lineWidth = stroke_width;
    context2.lineCap = "round";
    context2.lineJoin = "round";
    context2.stroke();

  }
  event.preventDefault();
}

function stop(event) {
  if (is_drawing) {
    context.stroke();
    context.closePath();
    is_drawing = false;
  }
  event.preventDefault();
  restore_array.push(context.getImageData(0, 0, canvas.width, canvas.height));
  start_index += 1;
}


function getX(event) {
  if (event.pageX == undefined) {return event.targetTouches[0].pageX - canvas.offsetLeft}
  else {return event.pageX - canvas.offsetLeft}
  }


function getY(event) {
  if (event.pageY == undefined) {return event.targetTouches[0].pageY - canvas.offsetTop}
  else {return event.pageY - canvas.offsetTop}
}

function Restore() {
  if (start_index <= 0) {
    Clear()
  } else {
    start_index += -1;
    restore_array.pop();
    if ( event.type != 'mouseout' ) {
      context.putImageData(restore_array[start_index], 0, 0);
      context2.putImageData(restore_array[start_index], 0, 0);
    }
  }
}

function Clear() {

    make_base()

}
