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

class Grid {
  /** @constructor */
  constructor(
    private margin: number,
    private readonly canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement,
    private context: CanvasRenderingContext2D = canvas.getContext('2d') as CanvasRenderingContext2D,
    private readonly WIDTH: number = canvas.width,
    private readonly HEIGHT: number = canvas.height,
  ) {}

  /**
   * @desc Draws a grid on to the Canvas
   */
  public draw(): void {
    const LINE_WIDTH: number = 0.5;
    const CENTER_LINE_WIDTH: number = 2;
    const COLOR: string = 'grey';
    const CENTER_COLOR: string = 'black';

    for (let i: number = this.margin; i <= this.WIDTH - this.margin; i += this.margin) { // Vertical lines
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

    for (let i: number = this.margin; i <= this.HEIGHT - this.margin; i += this.margin) { // Horizontal lines
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
   * @desc Moves the center of the Canvas to the middle
   */
  public adjustCenter(): void {
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
  }
}