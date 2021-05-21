import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'calendario';
  private dataSelecionada = new Date();  
  public calendario = [];
  private isMobile = screen.width < 500;

  ngOnInit(){
    // const hoje = new Date().toLocaleDateString().split('/');
    const hoje =this.dataSelecionada.toLocaleDateString().split('/');
    this.montarCalendario(hoje[0], hoje[1], hoje[2]);
    window.addEventListener('resize', ()=> {
      this.isMobile = screen.width < 500
    })
  }

  montarCalendario(dia, mes, ano): void {
    const primeiroDiaSemana = new Date(ano, mes -1, 1).getDay();
    this.preencherDiasMesAnterior(primeiroDiaSemana, mes, ano);
    const ultimoDia = new Date (ano, mes, 0).getDate();
    for(let i=1; i<=ultimoDia; i++) {
      this.calendario.push(i);
    }
    const ultimoDiaSemana = new Date(ano, mes -1, ultimoDia).getDay();
    this.preencherDiasProximoMes(ultimoDiaSemana, mes, ano);
  }

  preencherDiasMesAnterior(dia, mes, ano): void {
    for (let i = dia -1 ; i >= 0; i--) {
      const ultimoDia = new Date (ano, mes - 1 , 0).getDate();
      this.calendario.push(ultimoDia - i);
    }
  }

  preencherDiasProximoMes(dia, mes, ano): void {
    for (let i = 0; i < 6 - dia; i++) {
      const ultimoDia = new Date (ano, mes, 1).getDate();
      this.calendario.push(ultimoDia + i);
    }
  }

  get diasDaSemana(): string[] {
    return this.isMobile ? ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'] : 
    ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
  }

  get titleCalendario(): string {
    return this.dataSelecionada.toLocaleDateString('pt-BR', 
    { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  }

}
