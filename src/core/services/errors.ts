import { toast } from "vue3-toastify";

export class ErrorWrapper {

  constructor(
    public error: any,
    public status?: number,
    public message?: string,
    public json?: Record<string, any>
  ) {

    console.error('ErrorWrapper', this);

    const errorMessage = this.json?.message ?? this.message ?? 'Error';

    // possibilité de lancer un event pour ouvrir un toast par exemple

    toast.error(errorMessage, {
      transition: "none",
      autoClose: 4000
    });
  }
}