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
class Grid {
  /** @constructor */
  constructor(
    private readonly scale: number, // Scale === Margin, so that each cell is 1x1 in size
    private readonly canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement,
    private context: CanvasRenderingContext2D = canvas.getContext('2d') as CanvasRenderingContext2D,
    private readonly WIDTH: number = canvas.width,
    private readonly HEIGHT: number = canvas.height,
  ) {}

  /**
   * @desc Draws the lines of a grid to the canvas, using the stored scale
   */
  public drawLines(): void {
    const LINE_WIDTH: number = 0.5;
    const CENTER_LINE_WIDTH: number = 2;
    const COLOR: string = 'grey';
    const CENTER_COLOR: string = 'black';

    for (let i: number = this.scale; i <= this.WIDTH - this.scale; i += this.scale) { // Vertical lines
      this.context.strokeStyle = COLOR;
      this.context.lineWidth = LINE_WIDTH;
      if(i === this.WIDTH / 2) { // Center Line
        this.context.strokeStyle = CENTER_COLOR;
        this.context.lineWidth = CENTER_LINE_WIDTH;
      }
      this.context.beginPath();
      this.context.moveTo(i, 0);
      this.context.lineTo(i, this.HEIGHT);
      this.context.closePath();
      this.context.stroke();
    } 

    for (let i: number = this.scale; i <= this.HEIGHT - this.scale; i += this.scale) { // Horizontal lines
      this.context.strokeStyle = COLOR;
      this.context.lineWidth = LINE_WIDTH;
      if(i === this.HEIGHT / 2) {  // Center Line
        this.context.strokeStyle = CENTER_COLOR;
        this.context.lineWidth = CENTER_LINE_WIDTH;
      }
      this.context.beginPath();
      this.context.moveTo(0, i);
      this.context.lineTo(this.WIDTH, i);
      this.context.closePath();
      this.context.stroke();
    } 
  }

  /**
   * @desc Moves the center of the Canvas to the middle position of itself and flips the Y axis to behave
   *       how one would expect
   */
  public alignCenter(): void {
    this.context.translate(this.WIDTH / 2, this.HEIGHT / 2);
    this.context.scale(this.scale, -this.scale); // Flip the Y-axis, so it's positive going above center
  }

  /**
   * @desc Draws the numbers associated to the Grid (to scale)
   */
  public drawNumbers(): void {

  }
}