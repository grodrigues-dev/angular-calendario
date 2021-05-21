import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'calendario';
  public hoje = new Date(2021, 3 ,1).toLocaleDateString();  
  public calendario = [];

  ngOnInit(){
    // const hoje = new Date().toLocaleDateString().split('/');
    const hoje = new Date(2021, 3 ,1).toLocaleDateString().split('/');
    this.montarCalendario(hoje[0], hoje[1], hoje[2]);
  }

  montarCalendario(dia, mes, ano) {
    const primeiroDiaSemana = new Date(ano, mes -1, 1).getDay();
    this.preencherDiasMesAnterior(primeiroDiaSemana, mes, ano);
    const ultimoDia = new Date (ano, mes, 0).getDate();
    for(let i=1; i<=ultimoDia; i++){
      this.calendario.push(i);
    }
    const ultimoDiaSemana = new Date(ano, mes -1, ultimoDia).getDay();
    this.preencherDiasProximoMes(ultimoDiaSemana, mes, ano);
  }

  preencherDiasMesAnterior(dia, mes, ano) {
    for (let i = dia -1 ; i >= 0; i--) {
      const ultimoDia = new Date (ano, mes - 1 , 0).getDate();
      this.calendario.push(ultimoDia - i);
    }
  }

  preencherDiasProximoMes(dia, mes, ano) {
    for (let i = 0; i < 6 - dia; i++) {
      const ultimoDia = new Date (ano, mes, 1).getDate();
      this.calendario.push(ultimoDia + i);
    }
  }

}
