export class ErrorWrapper {

  constructor(
    public error: any,
    public status?: number,
    public message?: string,
  ) {

    console.error(this.error);

    // possibilité de lancer un event pour ouvrir un toast par exemple
  }
}