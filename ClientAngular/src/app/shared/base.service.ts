import { throwError } from "rxjs";

export abstract class BaseService {

  protected constructor() {}

  protected handleError(error: any) {
    let applicationError = error.headers.get('Application-Error');

    if(applicationError) return throwError((applicationError));

    let modelStateError: string = '';

    for (let key in error.error) {
      if(error.error[key]) {
        modelStateError += error.error[key].description + '\n';
      }
    }
    modelStateError = modelStateError + '' ?  null : modelStateError;
    return throwError(modelStateError || 'server error');
  }
}
