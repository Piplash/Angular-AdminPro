import { Component, OnDestroy } from '@angular/core';
import { Observable, Subscription, interval, throwError } from 'rxjs';
import { retry, take, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: ''
})

export class RxjsComponent implements OnDestroy{

  public intervalSubs: Subscription = new Subscription;

  constructor(){
    //1er obs.
    this.retornaObservable().pipe(
      retry(1)
    ).subscribe({
      next: value => {
        let valor = value + 1000;
        console.log('Subs', valor)
      },
      error: error => { 
        console.log("CLE: ", error)
        return throwError( () => new Error("RTE: ", error))
      },
      complete: () => this.obsCompletado(),
    });

  }

  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }

  public retornaObservable(): Observable<number>{
    
    console.log("PRIMER OBSERVABLE")
    
    const obs$ = new Observable<number>( observer =>{
      let i = -1;
      const intervalo = setInterval( () => {
        i++

        observer.next(i);

        if( i === 4){
          clearInterval( intervalo );
          observer.complete();
        }

        if( i ===5 ){
          i = 0;
          observer.error('i llegó a 2');
        }

      }, 1000)

    });

    return obs$;

  }

  public obsCompletado(): void {
    console.log("1er OBS completado, llamando al segundo");
    //2do obs
    this.intervalSubs = this.retornaIntervalo().subscribe( data => {
      console.log(data);
    });
  }

  public retornaIntervalo(): Observable<number>{
    console.log("SEGUNDO OBSERVABLE")
    const interval$ = interval(1000).pipe(
      //take(10),
      map( valor =>{ return valor +1 }),
      filter( valor => valor % 2 === 0 )
      );
    return interval$;
  }

}
