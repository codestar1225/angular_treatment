// Angular
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
// RxJS
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

/**
 * More information there => https://medium.com/@MetonymyQT/angular-http-interceptors-what-are-they-and-how-to-use-them-52e060321088
 */
@Injectable()
export class InterceptService implements HttpInterceptor {
	// intercept request and add token
	intercept(
		request: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		// tslint:disable-next-line:no-debugger
		// modify request

		const accessToken  = localStorage.getItem('accessToken');
		if (accessToken) {
			request = request.clone({
				setHeaders: {
					Authorization: `Bearer ${accessToken}`
				}
			});
		}

		return next.handle(request).pipe(
			tap(
				event => {
					 if (event instanceof HttpResponse) {
						// console.log('all looks good');
						// http response status code
						// console.log(event.status);
					}
				},
				error => {
					// http response status code
					// console.log('----response----');
					// console.error('status code:');
					// tslint:disable-next-line:no-debugger
					console.error(error.status);
					console.error(error.message);
					// console.log('--- end of response---');
				}
			)
		);
	}
}
