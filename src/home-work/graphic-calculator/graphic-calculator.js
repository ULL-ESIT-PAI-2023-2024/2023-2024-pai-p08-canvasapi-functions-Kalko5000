var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Thomas Edward Bradley
 * @since Mar 11, 2024
 * @description File containing a Point type to represent a point in a 2D space
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
 * @description Contains Grid Class to draw and manage a grid on a Canvas
 * @see {@link https://developer.mozilla.org/es/docs/Web/API/Canvas_API/Tutorial}
 */
/** @class */
var Grid = /** @class */ (function () {
    /** @constructor */
    function Grid(scale, // Scale === Margin, so that each cell is 1x1 in size
    canvas, context, WIDTH, HEIGHT) {
        if (canvas === void 0) { canvas = document.getElementById('canvas'); }
        if (context === void 0) { context = canvas.getContext('2d'); }
        if (WIDTH === void 0) { WIDTH = canvas.width; }
        if (HEIGHT === void 0) { HEIGHT = canvas.height; }
        this.scale = scale;
        this.canvas = canvas;
        this.context = context;
        this.WIDTH = WIDTH;
        this.HEIGHT = HEIGHT;
    }
    /**
     * @desc Draws the lines of a grid to the canvas, using the stored scale
     */
    Grid.prototype.drawLines = function () {
        var LINE_WIDTH = 0.5;
        var CENTER_LINE_WIDTH = 2;
        var COLOR = 'grey';
        var CENTER_COLOR = 'black';
        for (var i = this.scale; i <= this.WIDTH - this.scale; i += this.scale) { // Vertical lines
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
        for (var i = this.scale; i <= this.HEIGHT - this.scale; i += this.scale) { // Horizontal lines
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
     * @desc Moves the center of the Canvas to the middle position of itself and flips the Y axis to behave
     *       how one would expect
     */
    Grid.prototype.alignCenter = function () {
        this.context.translate(this.WIDTH / 2, this.HEIGHT / 2);
        this.context.scale(this.scale, -this.scale); // Flip the Y-axis, so it's positive going above center
    };
    /**
     * @desc Draws the numbers associated to the Grid (to scale)
     */
    Grid.prototype.drawNumbers = function () {
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
 * @description Contains an abstract class Func used to evaluate and draw function values to a canvas
 * @see {@link https://developer.mozilla.org/es/docs/Web/API/Canvas_API/Tutorial}
 */
/** @class */
var Func = /** @class */ (function () {
    /** @constructor */
    function Func(color, scale, lineWidth, canvas, context, WIDTH) {
        if (lineWidth === void 0) { lineWidth = 2; }
        if (canvas === void 0) { canvas = document.getElementById('canvas'); }
        if (context === void 0) { context = canvas.getContext('2d'); }
        if (WIDTH === void 0) { WIDTH = canvas.width; }
        this.color = color;
        this.scale = scale;
        this.lineWidth = lineWidth;
        this.canvas = canvas;
        this.context = context;
        this.WIDTH = WIDTH;
    }
    /**
     * @desc Evaluates itself for the entirity of the Canvas' width
     */
    Func.prototype.evaluate = function () {
        var INCREMENTS = 0.2;
        // We divide by (2 * scale) in order to have half the value of WIDTH on either side while adjusting to scale
        var previous = { coordX: -this.WIDTH / 2, coordY: 0 };
        for (var i = -this.WIDTH / (2 * this.scale); i < this.WIDTH / (2 * this.scale); i += INCREMENTS) {
            previous = this.drawMethod(previous, i);
        }
    };
    /**
     * @desc Template Method for drawing a step in a functions evaluation, going from the last value to be
     *       evaluated to the next
     * @param {Point} previousCoords The origin point of the new edge we are going to form
     * @param {number} value Value to pass to function to yield new Point values
     * @returns {Point} Coordinates of where the new Point has been drawn (after evaluating the function instance)
     */
    Func.prototype.drawMethod = function (previousCoords, value) {
        if (this.checkOnlyPositive() && value < 0)
            return { coordX: value, coordY: 0 };
        var NEW_VALUE = this.getCoordY(value);
        this.context.strokeStyle = this.color;
        this.context.lineWidth = this.lineWidth / this.scale;
        this.context.beginPath();
        this.context.moveTo(previousCoords.coordX, previousCoords.coordY);
        this.context.lineTo(value, NEW_VALUE);
        this.context.closePath();
        this.context.stroke();
        return { coordX: value, coordY: NEW_VALUE };
    };
    return Func;
}());
/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Thomas Edward Bradley
 * @since Mar 19, 2024
 * @description Contains class Exp, an extension of the abstract class Func. Used to draw exponencial values.
 * @see {@link https://developer.mozilla.org/es/docs/Web/API/Canvas_API/Tutorial}
 */
/** @class */
var Exp = /** @class */ (function (_super) {
    __extends(Exp, _super);
    function Exp() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @desc Abstract method implementation that checks if the function can be evaluated with negative numbers
     * @returns {boolean} Returns true if can only be used with positive numbers
     */
    Exp.prototype.checkOnlyPositive = function () {
        return false;
    };
    /**
     * @desc Abstract method implementation that evaluates a function for a given value (returning Y in the process)
     * @param {number} value Value to evaluate the function at
     * @returns {number} Value of Y after evaluating our function
     */
    Exp.prototype.getCoordY = function (value) {
        return Math.exp(value);
    };
    return Exp;
}(Func));
/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Thomas Edward Bradley
 * @since Mar 19, 2024
 * @description Contains class Sin, an extension of the abstract class Func. Used to draw exponencial values.
 * @see {@link https://developer.mozilla.org/es/docs/Web/API/Canvas_API/Tutorial}
 */
/** @class */
var Sin = /** @class */ (function (_super) {
    __extends(Sin, _super);
    function Sin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @desc Abstract method implementation that checks if the function can be evaluated with negative numbers
     * @returns {boolean} Returns true if can only be used with positive numbers
     */
    Sin.prototype.checkOnlyPositive = function () {
        return false;
    };
    /**
     * @desc Abstract method implementation that evaluates a function for a given value (returning Y in the process)
     * @param {number} value Value to evaluate the function at
     * @returns {number} Value of Y after evaluating our function
     */
    Sin.prototype.getCoordY = function (value) {
        return Math.sin(value);
    };
    return Sin;
}(Func));
/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Thomas Edward Bradley
 * @since Mar 19, 2024
 * @description Contains class Cos, an extension of the abstract class Func. Used to draw exponencial values.
 * @see {@link https://developer.mozilla.org/es/docs/Web/API/Canvas_API/Tutorial}
 */
/** @class */
var Cos = /** @class */ (function (_super) {
    __extends(Cos, _super);
    function Cos() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @desc Abstract method implementation that checks if the function can be evaluated with negative numbers
     * @returns {boolean} Returns true if can only be used with positive numbers
     */
    Cos.prototype.checkOnlyPositive = function () {
        return false;
    };
    /**
     * @desc Abstract method implementation that evaluates a function for a given value (returning Y in the process)
     * @param {number} value Value to evaluate the function at
     * @returns {number} Value of Y after evaluating our function
     */
    Cos.prototype.getCoordY = function (value) {
        return Math.cos(value);
    };
    return Cos;
}(Func));
/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Thomas Edward Bradley
 * @since Mar 19, 2024
 * @description Contains class Sqrt, an extension of the abstract class Func. Used to draw exponencial values.
 * @see {@link https://developer.mozilla.org/es/docs/Web/API/Canvas_API/Tutorial}
 */
/** @class */
var Sqrt = /** @class */ (function (_super) {
    __extends(Sqrt, _super);
    function Sqrt() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @desc Abstract method implementation that checks if the function can be evaluated with negative numbers
     * @returns {boolean} Returns true if can only be used with positive numbers
     */
    Sqrt.prototype.checkOnlyPositive = function () {
        return true;
    };
    /**
     * @desc Abstract method implementation that evaluates a function for a given value (returning Y in the process)
     * @param {number} value Value to evaluate the function at
     * @returns {number} Value of Y after evaluating our function
     */
    Sqrt.prototype.getCoordY = function (value) {
        return Math.sqrt(value);
    };
    return Sqrt;
}(Func));
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
///<reference path='point.ts'/>
///<reference path='grid.ts'/>
///<reference path='func.ts'/>
///<reference path='exp.ts'/>
///<reference path='sin.ts'/>
///<reference path='cos.ts'/>
///<reference path='sqrt.ts'/>
var main = function () {
    var SCALE = 40; // Margin of Grid === Scale, so each cell is 1x1 in size. Works well with 20, 40 & 80
    var grid = new Grid(SCALE);
    grid.drawLines();
    grid.alignCenter();
    var exp = new Exp('red', SCALE);
    exp.evaluate();
    var sin = new Sin('blue', SCALE);
    sin.evaluate();
    var cos = new Cos('yellow', SCALE);
    cos.evaluate();
    var sqrt = new Sqrt('green', SCALE);
    sqrt.evaluate();
    grid.drawNumbers(); // Done after functions so that grid numbers are displayed above these
};
main();
