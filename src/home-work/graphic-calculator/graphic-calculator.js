/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Thomas Edward Bradley
 * @since Mar 19, 2024
 * @description Contains Grid Class to draw and manage a grid on a Canvas
 * @see {@link https://developer.mozilla.org/es/docs/Web/API/Canvas_API/Tutorial}
 */
var Grid = /** @class */ (function () {
    /** @constructor */
    function Grid(margin, canvas, context, WIDTH, HEIGHT) {
        if (canvas === void 0) { canvas = document.getElementById('canvas'); }
        if (context === void 0) { context = canvas.getContext('2d'); }
        if (WIDTH === void 0) { WIDTH = canvas.width; }
        if (HEIGHT === void 0) { HEIGHT = canvas.height; }
        this.margin = margin;
        this.canvas = canvas;
        this.context = context;
        this.WIDTH = WIDTH;
        this.HEIGHT = HEIGHT;
    }
    /**
     * @desc Draws a grid on to the Canvas
     */
    Grid.prototype.draw = function () {
        var LINE_WIDTH = 0.5;
        var CENTER_LINE_WIDTH = 2;
        var COLOR = 'grey';
        var CENTER_COLOR = 'black';
        for (var i = this.margin; i <= this.WIDTH - this.margin; i += this.margin) { // Vertical lines
            this.context.strokeStyle = COLOR;
            this.context.lineWidth = LINE_WIDTH;
            if (i === this.WIDTH / 2) { // Center Line
                this.context.strokeStyle = CENTER_COLOR;
                this.context.lineWidth = CENTER_LINE_WIDTH;
            }
            this.context.beginPath();
            this.context.moveTo(i, 0);
            this.context.lineTo(i, this.HEIGHT);
            this.context.closePath();
            this.context.stroke();
        }
        for (var i = this.margin; i <= this.HEIGHT - this.margin; i += this.margin) { // Horizontal lines
            this.context.strokeStyle = COLOR;
            this.context.lineWidth = LINE_WIDTH;
            if (i === this.HEIGHT / 2) { // Center Line
                this.context.strokeStyle = CENTER_COLOR;
                this.context.lineWidth = CENTER_LINE_WIDTH;
            }
            this.context.beginPath();
            this.context.moveTo(0, i);
            this.context.lineTo(this.WIDTH, i);
            this.context.closePath();
            this.context.stroke();
        }
    };
    /**
     * @desc Moves the center of the Canvas to the middle
     */
    Grid.prototype.adjustCenter = function () {
        this.context.translate(this.WIDTH / 2, this.HEIGHT / 2);
        this.context.scale(1, -1); // Flip the Y-axis, so it's positive goign above center
        /*
        this.context.strokeStyle = 'black';
        this.context.lineWidth = 4;
        this.context.beginPath();
        this.context.moveTo(0, 0);
        this.context.lineTo(-300, -300);
        this.context.closePath();
        this.context.stroke();
        */
    };
    return Grid;
}());
/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Thomas Edward Bradley
 * @since Mar 19, 2024
 * @description Contains a template class Function used to evaluate and draw function values to a canvas
 * @see {@link https://developer.mozilla.org/es/docs/Web/API/Canvas_API/Tutorial}
 */ 
/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Thomas Edward Bradley
 * @since Mar 19, 2024
 * @description Client program to help make use of Grid and Function to display functions on a Canvas
 * @see {@link https://github.com/ULL-ESIT-PAI-2023-2024/2023-2024_P08_CanvasAPI-2/blob/main/p08_Canvas-GraphingCalculator.md}
 * @example tsc --outFile graphic-calculator.js client.ts
 */
///<reference path='grid.ts'/>
///<reference path='function.ts'/>
var main = function () {
    var grid = new Grid(40);
    grid.draw();
    grid.adjustCenter();
};
main();
