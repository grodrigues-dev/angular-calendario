import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'calendario';
  public dataSelecionada = new Date();  
  public calendario = [];
  private isMobile = screen.width < 500;
  public novaData: string;

  ngOnInit(){
    const hoje =this.dataSelecionada.toLocaleDateString().split('/');
    this.montarCalendario(hoje[0], hoje[1], hoje[2]);
    window.addEventListener('resize', ()=> {
      this.isMobile = screen.width < 500;
    });
  }

    montarCalendario(dia, mes, ano): void {
    this.calendario = [];
    const primeiroDiaSemana = new Date(ano, mes -1, 1).getDay();
    this.preencherDiasMesAnterior(primeiroDiaSemana, mes, ano);
    const ultimoDia = new Date (ano, mes, 0).getDate();
    for(let i=1; i<=ultimoDia; i++) {
      this.calendario.push({
        mesAtual: true,
        data: i,
        hoje: i == dia
      });
    }
    const ultimoDiaSemana = new Date(ano, mes -1, ultimoDia).getDay();
    this.preencherDiasProximoMes(ultimoDiaSemana, mes, ano);
  }

  preencherDiasMesAnterior(dia, mes, ano): void {
    for (let i = dia -1 ; i >= 0; i--) {
      const ultimoDia = new Date (ano, mes - 1 , 0).getDate();
      this.calendario.push({
        mesAtual: false,
        data: ultimoDia - i,
      });
    }
  }

  preencherDiasProximoMes(dia, mes, ano): void {
    for (let i = 0; i < 6 - dia; i++) {
      const ultimoDia = new Date (ano, mes, 1).getDate();
      this.calendario.push({
        mesAtual: false,
        data:ultimoDia + i
      });
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

  buscar(): void {
    console.log(this.novaData)
    const novaData = this.novaData.split('-');
    this.dataSelecionada = new Date(Number(novaData[0]), Number(novaData[1]) -1, Number(novaData[2]))
    this.montarCalendario(novaData[2], novaData[1], novaData[0]);
  }

}
