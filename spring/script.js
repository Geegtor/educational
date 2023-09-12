function MainMech(canvas, slider_m, text_m, slider_Cx, text_Cx, slider_Cy, text_Cy, slider_B, text_B, check) {
 
    // *** Задание физических параметров ***
 
    var m = 1;                     // масса
    var Cx = 1;                     // жесткость X
    var Cy = 1;                     // жесткость Y
    var B = 0;                    // вязкость
 
    // *** Задание вычислительных параметров ***
 
    const fps = 24;             // frames per second - число кадров в секунду (качечтво отображения)
//    const fps = 4 * 29;               // frames per second - число кадров в секунду (качечтво отображения)
    const spf = 10;             // steps per frame   - число шагов интегрирования между кадрами (edtkbxbdftn скорость расчета)
    const dt  = 0.1  / fps;        // шаг интегрирования (качество расчета)
    var steps = 0;                      // количество шагов интегрирования
 
    // Установка слайдеров значений
 

	
    // функции, запускающиеся при перемещении слайдера
    this.setSlider_m = function(new_m){m = new_m;};           // new_m - значение на слайдере
    this.setSlider_Cx = function(new_Cx){Cx = new_Cx;};
    this.setSlider_Cy = function(new_Cy){Cy = new_Cy;};
    this.setSlider_B = function(new_B){B = new_B ;};
 
    slider_m.min = 1;               slider_m.max = 10;
    slider_m.step = 0.10;
    slider_m.value = m;          // начальное значение ползунка должно задаваться после min и max
    text_m.value = m.toFixed(2);
    slider_Cx.min = 1.00;               slider_Cx.max = 10.00;
    slider_Cx.step = 0.10;
    slider_Cx.value = Cx;                // начальное значение ползунка должно задаваться после min и max
    text_Cx.value = Cx.toFixed(2);
	 slider_Cy.min = 1.00;               slider_Cy.max = 10.00;
    slider_Cy.step = 0.10;
    slider_Cy.value = Cy;          // начальное значение ползунка должно задаваться после min и max
    text_Cy.value = Cy.toFixed(2);
    slider_B.min = 0.00;               slider_B.max = 10.00;
    slider_B.step = 0.10;
    slider_B.value = B;                // начальное значение ползунка должно задаваться после min и max
    text_B.value = B.toFixed(2);
 
    var count = true;       // проводить ли расчет системы
    var vx = 0;              // скорость тела X
    var vy = 0;              // скорость тела Y
 
    // создаем объект, связанный с элементом canvas на html странице
    var ocanvas = oCanvas.create({
        canvas: "#canvasMech",          // canvasMech - id объекта canvas на html странице
        fps: fps                        // сколько кадров в секунду
    });
 
    var rw = canvas.width / 30;     var rh = canvas.height / 30;
    var x0 = 15 * rw ;      var y0 = 15 * rh ;
	
	var R0 = y0; 
 
    // создаем пружину
    const coil = 15;        // количество витков
    
    const startX1 = 0;       // закрепление пружины
    const startY1 = y0;       // закрепление пружины
    const startX2 = canvas.width;       // закрепление пружины
    const startY2 = y0;       // закрепление пружины
    const startX3 = x0;       // закрепление пружины
    const startY3 = 0;       // закрепление пружины
    const startX4 = x0;       // закрепление пружины
    const startY4 = canvas.height;       // закрепление пружины
    this.clearCanvas = function()
	{
	};
    
    var lines1 = [];         // этот массив будет содержать ссылки на линии 1й пружины
    var lines2 = [];         // этот массив будет содержать ссылки на линии 2й пружины
    var lines3 = [];         // этот массив будет содержать ссылки на линии 3й пружины
    var lines4 = [];         // этот массив будет содержать ссылки на линии 4й пружины
    for (var i = 0; i < coil; i++ ) {
        lines1[i] = ocanvas.display.line({
            start: { x: 0, y:0 },
            end: { x: 0, y: 0 },
            stroke: "1px #000000"
        }).add();
        lines2[i] = ocanvas.display.line({
            start: { x: 0, y:0 },
            end: { x: 0, y: 0 },
            stroke: "1px #000000"
        }).add();
        lines3[i] = ocanvas.display.line({
            start: { x: 0, y:0 },
            end: { x: 0, y: 0 },
            stroke: "1px #000000"
        }).add();
        lines4[i] = ocanvas.display.line({
            start: { x: 0, y:0 },
            end: { x: 0, y: 0 },
            stroke: "1px #000000"
        }).add();
    }
    
    // создаем прямоугольник
    var ellipse = ocanvas.display.ellipse({x: x0, y: y0, radius: 5 * m, fill: "rgba(255, 0, 0, 1)"}).add();
 
    // захват прямоугольника мышью
    ellipse.dragAndDrop({
        changeZindex: true,             // если много объектов - захваченный будет нарисован спереди
        start: function ()  { count = false; trajectory = [];    this.fill = "rgba(255, 0, 0, 0.5)"; },  // отключаем расчет и делаем объект полупрозрачным
        move:  function ()  {  vx = 0;  vy = 0;      drawSpring();},             // перемещение 
        end: function ()    { count = true;      this.fill = "rgba(255, 0, 0, 1)"; }     // включаем расчет и убираем полупрозрачность
    });
 
    ocanvas.bind("mousedown", function () {count = false;});    // заморозить фигуру при клике на поле 
 
    var trajectory = [];
	
	this.clearTrajectory = function()
	{
		trajectory = [];
	};
	
	    function getF(C , x0, y0 , x, y  )
    {
    	var R = Math.sqrt( (x-x0)*(x-x0)+(y-y0)*(y-y0) ); 
    	var dx = (1 - R0/R) * (x0-x); 
    	var dy = (1 - R0/R) * (y0-y); 
    	
    	return {x: C*dx, y:C*dy};
    }
            
    function dynamics(){                                    // интегрирование по времени
        if (!count) return;
		if(check.checked){
			ellipse.fill = "rgba(0, 0, 255, 1)"
		for (var s=1; s<=spf; s++) {
        	
				var f1 = getF(Cx, 0, y0, ellipse.x, ellipse.y);
				var f2 = getF(Cx, ocanvas.width, y0, ellipse.x, ellipse.y);
        	
				var f3 = getF(Cy, x0, 0, ellipse.x, ellipse.y);
				var f4 = getF(Cy, x0, ocanvas.height, ellipse.x, ellipse.y);
        	
				var fx =  f1.x + f2.x + f3.x + f4.x - B * vx;
				var fy =  f1.y + f2.y + f3.y + f4.y - B * vy;
            
				vx += fx / m * dt;
				vy += fy / m * dt;
            
				ellipse.x += vx * dt;
				ellipse.y += vy * dt;
				ellipse.radius = 5 * m;

				steps++;
              
				if (steps % 10 == 0) 
				{
					trajectory.push([ellipse.x - x0, y0 - ellipse.y]);
					$.plot($('#vGraph'), [trajectory], {});
				} 
            
				drawSpring();
				}
		}
		else {
			ellipse.fill = "rgba(255, 0, 0, 1)"
			for (var s=1; s<=spf; s++) {
		
				var fx =  - 2 * Cx * (ellipse.x - x0) - B * vx;
				var fy =  - 2 * Cy * (ellipse.y - y0) - B * vy;
				vx += fx / m * dt;
				vy += fy / m * dt;
            
				ellipse.x += vx * dt;
				ellipse.y += vy * dt;
				ellipse.radius = 5 * m;
 
				steps++;
              // подать данные на график
				if (steps % 10 == 0) 
				{
					trajectory.push([ellipse.x-x0, y0-ellipse.y]);
					$.plot($('#vGraph'), [trajectory], {});
				} 
            
				drawSpring();
			}
        }
	}
 
    // Рисуем пружины
function drawSpring() {
        for (var i = 0; i < coil; i++ ) {
        	
            lines1[i].start.x =  startX1 + ((ellipse.x-startX1) )/coil*i;
            lines1[i].end.x =    startX1 + ((ellipse.x-startX1))/coil*(i+1);            
            lines1[i].start.y =  y0 + ((i%2==0)?1:-1)*7 + (ellipse.y-startY1)/coil*i;
            lines1[i].end.y =    y0 + ((i%2==0)?-1:1)*7 + (ellipse.y-startY1)/coil*(i+1);            
            if (i==0) lines1[i].start.y =  y0;
            if (i==(coil-1)) lines1[i].end.y =  ellipse.y;
            
            
            lines2[i].start.x =  startX2 + ((ellipse.x-startX2) )/coil*i;
            lines2[i].end.x =    startX2 + ((ellipse.x-startX2) )/coil*(i+1);
            lines2[i].start.y =  y0 + ((i%2==0)?-1:1)*7 + (ellipse.y-startY1)/coil*i;
            lines2[i].end.y =    y0 + ((i%2==0)?1:-1)*7  + (ellipse.y-startY1)/coil*(i+1);
            if (i==0) lines2[i].start.y =  y0;
            if (i==(coil-1)) lines2[i].end.y =  ellipse.y;
            
            
            lines3[i].start.y =  startY3 + ((ellipse.y-startY3) )/coil*i;
            lines3[i].end.y =    startY3 + ((ellipse.y-startY3))/coil*(i+1);    
                    
            lines3[i].start.x =  x0 + ((i%2==0)?-1:1)*7 + (ellipse.x-startX3)/coil*i;
            lines3[i].end.x =    x0 + ((i%2==0)?1:-1)*7 + (ellipse.x-startX3)/coil*(i+1);            
            if (i==0) lines3[i].start.x =  x0;
            if (i==(coil-1)) lines3[i].end.x =  ellipse.x;
            
    
            lines4[i].start.y =  startY4 + ((ellipse.y-startY4) )/coil*i;
            lines4[i].end.y =    startY4 + ((ellipse.y-startY4) )/coil*(i+1);
            lines4[i].start.x =  x0 + ((i%2==0)?1:-1)*7 + (ellipse.x-startX4)/coil*i;
            lines4[i].end.x =    x0 + ((i%2==0)?-1:1)*7  + (ellipse.x-startX4)/coil*(i+1);
            if (i==0) lines4[i].start.x =  x0;
            if (i==(coil-1)) lines4[i].end.x =  ellipse.x; 
        }
    }
 
    ocanvas.setLoop(dynamics).start();             // функция, выполняющаяся на каждом шаге
}