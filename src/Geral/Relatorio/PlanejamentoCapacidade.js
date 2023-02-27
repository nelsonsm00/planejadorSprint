import ComponenteEnum from "../Enum/ComponenteEnum";

class PlanejamentoCapacidade {
    static imprime(nomeSprint, colunasCapacidade, dadosCapacidade, colunasDemanda, dadosDemanda) {
        var titulo = "<h1>Sprint " + nomeSprint + "</h1>";

        var tabelaCapacidade = PlanejamentoCapacidade.getTabela(colunasCapacidade, dadosCapacidade);
        var tabelaDemandas = PlanejamentoCapacidade.getTabela(colunasDemanda, dadosDemanda);


        var win = window.open('', '', 'height=700,width=700');
        win.document.write('<html><head>');
        win.document.write('<title>Relatório Planejamento Sprint</title>');
        win.document.write(PlanejamentoCapacidade.getStyle());
        win.document.write('</head>');
        win.document.write('<body>');
        win.document.write(titulo);
        win.document.write("<h3>Horas alocadas</h3>");
        win.document.write(tabelaCapacidade);   
        win.document.write("<h3>Demandas</h3>");
        win.document.write(tabelaDemandas);                   
        win.document.write('</body></html>');
        win.document.close(); 	                                         
        win.print(); 
    }

    static getTabela(colunas, dados) {
        var tabela = "<table class=\"\"><thead><tr>";
        colunas.map((c) => (tabela += ( c.componente == ComponenteEnum.Button ||
                                        c.componente == ComponenteEnum.ButtonAddDelete ||
                                        c.componente == ComponenteEnum.ButtonCRUD ||
                                        c.componente == ComponenteEnum.ButtonEditDelete
                                        ? "" : "<th width=" + c.largura + "%>" + c.texto + "</th>")));
        tabela += "</tr></thead><tbody>";
        for(var i = 0; i < dados.length; i++) {
            var d = dados[i];
            tabela += "<tr>";
            for(var j = 0; j < colunas.length; j++) {
                var c = colunas[j];
                var colunaBotao =   c.componente == ComponenteEnum.Button ||
                                    c.componente  == ComponenteEnum.ButtonAddDelete ||
                                    c.componente == ComponenteEnum.ButtonCRUD ||
                                    c.componente == ComponenteEnum.ButtonEditDelete;
                if (!colunaBotao) {
                    if (c.subDados.length > 0 && c.subChave != "") {
                        for(var k = 0; k < c.subDados.length; k++) {
                            var subDados = c.subDados[k];
                            var chaves = c.subChave.split(";");
                            if (subDados[chaves[0]] == d[c.chave]) {
                                tabela += "<td>" + subDados[chaves[1]] + "</td>";
                                break;
                            }
                        }
                    }
                    else {
                        tabela += "<td>" + d[c.chave] + "</td>";
                    }
                }
            }
            tabela += "</tr>";
        }
        tabela += "</tbody></table>";
        return tabela;
    }

    static getStyle() {
        var style = "<style>";
        style = style + "table {width: 100%;font: 20px Calibri;}";
        style = style + "table, th, td {border: solid 1px #DDD; border-collapse: collapse;";
        style = style + "padding: 2px 3px;text-align: center;}";
        style = style + "</style>";
        style = style + "<style type=\"text/css\" media=\"print\">@page { size: landscape; }</style>";
        return style;
    }
}

export default PlanejamentoCapacidade;