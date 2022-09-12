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
        colunas.map((c) => (tabela += (c.colunaBotao ? "" : "<th width=" + c.largura + "%>" + c.texto + "</th>")));
        tabela += "</tr></thead><tbody>";
        for(var i = 0; i < dados.length; i++) {
            tabela += "<tr>";
            for(var j = 0; j < colunas.length; j++) {
                if (!colunas[j].colunaBotao) {
                    tabela += "<td>" + dados[i][colunas[j].chave] + "</td>";
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