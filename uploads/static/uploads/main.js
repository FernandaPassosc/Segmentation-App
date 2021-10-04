
let img = document.getElementById('inp');
let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

let canvas2 = document.getElementById("canvas2");
let context2 = canvas2.getContext("2d");

const form = document.getElementById('p-form')

const csrf = document.getElementsByName('csrfmiddlewaretoken')


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
var image_upload = new Image();
make_base();


function make_base(){
  base_image.src = 'media/dog-static.jpg';
  
  base_image.onload = function(){
    context.drawImage(base_image, 0, 0);
    context2.drawImage(base_image, 0, 0);
  }

}

let id =null

document.getElementById('inp').onchange = function inp (e) {

  base_image.src = URL.createObjectURL(this.files[0]);

  base_image.onload = function(){
    var width = base_image.width;
    var height = base_image.height;
    context.drawImage(base_image, 0, 0, width, height, 0, 0, 700, 600 );
    context2.drawImage(base_image, 0, 0, width, height, 0, 0, 700, 600 );
  }


    
};

const url =""

form.addEventListener('submit', e=>{
  e.preventDefault()

  const fd = new FormData()
  fd.append('csrfmiddlewaretoken', csrf[0].value)
  //fd.append('name', name.value)
  //fd.append('description', description.value)
  fd.append('image', img.files[0])

  $.ajax({
      type: 'POST',
      url: url,
      enctype: 'multipart/form-data',
      data: fd,
      success: function(response){
          console.log(response)
          const sText = `successfully saved ${response.name}`
          // handleAlerts('success', sText)
          // setTimeout(()=>{
          //     alertBox.innerHTML = ""
          //     imgBox.innerHTML = ""
          //     name.value = ""
          //     description.value = ""
          //     image.value = ""
          // }, 3000)
      },
      error: function(error){
          console.log(error)
          //handleAlerts('danger', 'ups..something went wrong')
      },
      cache: false,
      contentType: false,
      processData: false,
  })
})

  
  // $(function() {
  //     $('form').submit(upload);
  // });

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


// // saving the image
// let id = null

// form.addEventListener('submit', e=>{
//   e.preventDefault()
//   const fd = new FormData()
//   fd.append('csrfmiddlewaretoken', csrf[0].value)
//   fd.append('action', ACTION_CHOICES)
//   fd.append('id',id)
//   fd.append('inp', inp.files[0])
  
//   $.ajax({
//       type: 'POST',
//       url: url,
//       enctype: 'multipart/form-data',
//       data: fd,
//       success: function(response){
//           console.log(response)
//           console.log("rolou")
//           const sText = `successfully saved ${response.name}`
//           handleAlerts('success', sText)
//       },
//       error: function(error){
//           console.log(error)
//           handleAlerts('danger', 'ups..something went wrong')
//       },
//       cache: false,
//       contentType: false,
//       processData: false,
//   })
// })

function Clear() {
    make_base();
}


